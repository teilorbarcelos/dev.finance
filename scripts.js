const Modal = {
  open(){
    document
      .querySelector('.modal-overlay')
      .classList.add('active');
      document.getElementById('date').valueAsDate = new Date();
  },
  close(){
    document
      .querySelector('.modal-overlay')
      .classList.remove('active');
  }
}

const Storage = {
  get(){
    return JSON.parse(localStorage.getItem('dev.finance:transactions')) || []
  },
  set(transactions){
    localStorage.setItem('dev.finance:transactions', JSON.stringify(transactions))
  }
}

const Transaction = {
  all: Storage.get(),

  add(transaction) {
    Transaction.all.push(transaction)
    Storage.set(Transaction.all.sort((a, b) => new Date(a.date) - new Date(b.date)))
    App.reload()
  },
  remove(index) {
    Transaction.all.splice(index, 1)
    Storage.set(Transaction.all)
    App.reload()
  },

  incomes() {
    let income = 0;
    Transaction.all.forEach(transaction => {
      if(transaction.amount > 0)
        income += transaction.amount
    })

    return income
  },
  expenses() {
    let expense = 0;
    Transaction.all.forEach(transaction => {
      if(transaction.amount < 0)
        expense += transaction.amount
    })

    return expense
  },
  total() {
    let total = Transaction.expenses() + Transaction.incomes()

    return total
  }
}

const ChartGraph = {
  chart: '',
  graphCreate(){
    let labels = [], datasetDataIncomes = [], datasetDataExpense = [], datasetDataTotal = [], total = 0

    Transaction.all.forEach(transaction => {
      labels.push(Utils.formatDate(transaction.date))
      total += transaction.amount
      datasetDataTotal.push(total / 100)
      if(transaction.amount > 0){
        datasetDataIncomes.push(transaction.amount / 100)
        datasetDataExpense.push(0)
      }else{
        datasetDataIncomes.push(0)
        datasetDataExpense.push(transaction.amount * -1 / 100)
      }
    })
    document.getElementById('chart').innerHTML = '<canvas class="line-chart"></canvas>'
    let ctx = document.getElementsByClassName('line-chart')
    ChartGraph.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Entradas',
          data: datasetDataIncomes,
          backgroundColor: [
            'transparent'
          ],
          borderColor: [
            'rgba(159, 238, 150, 0.85)'
          ],
          borderWidth: 6
        },
        {
          label: 'Saídas',
          data: datasetDataExpense,
          backgroundColor: [
            'transparent'
          ],
          borderColor: [
            'rgba(255, 0, 0, 0.85)'
          ],
          borderWidth: 6
        },
        {
          label: 'Total',
          data: datasetDataTotal,
          backgroundColor: [
            'transparent'
          ],
          borderColor: [
            'rgba(0, 255, 9, 0.85)'
          ],
          borderWidth: 6
        }]
      }
    });
  }
}

const DOM = {
  transactionsContainer: document.querySelector('#data-table tbody'),

  addTransaction(transaction, index) {
    const tr = document.createElement('tr')
    tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
    tr.dataset.index = index
    DOM.transactionsContainer.appendChild(tr)
  },

  innerHTMLTransaction(transaction, index) {
    const html = `
      <td class="description">${transaction.description}</td>
      <td class=${transaction.amount > 0 ? 'income' : 'expense'}>R$ ${Utils.formatCurrency(transaction.amount)}</td>
      <td>${Utils.formatDate(transaction.date)}</td>
      <td>
        <img onclick="Transaction.remove(${index})" src="./assets/minus.svg" alt="Remover transação">
      </td>
    `
    return html
  },

  updateBalance(){
    document.getElementById('incomeDisplay')
    .innerHTML = Utils.formatCurrency(Transaction.incomes())
    document.getElementById('expenseDisplay')
    .innerHTML = Utils.formatCurrency(Transaction.expenses())
    document.getElementById('totalDisplay')
    .innerHTML = Utils.formatCurrency(Transaction.total())
  },

  clearTransactions(){
    DOM.transactionsContainer.innerHTML = ''
  }
}

const Utils = {
  formatCurrency(value) {
    return String((value/100).toFixed(2)).replace('.', ',')
  },

  formatAmount(data){
    formatedData =Number(data) * 100
    return formatedData
  },

  formatDate(data){
    const splitedDate = data.split('-')
    formatedData = `${splitedDate[2]}/${splitedDate[1]}/${splitedDate[0]}`
    return formatedData
  }
}

const Form = {
  description: document.querySelector('input#description'),
  amount: document.querySelector('input#amount'),
  date: document.querySelector('input#date'),

  getData(){
    return {
      description: Form.description.value,
      amount: Form.amount.value,
      date: Form.date.value
    }
  },

  validateFields(data){
    if(data.description.trim() === '' ||
      data.amount.trim() === '' ||
      data.date.trim() === ''
    ){
      throw new Error('Preencha todos os campos corretamente!')
    }
  },

  formatData(data){

    let formatedData = {
      description: data.description,
      amount: Utils.formatAmount(data.amount),
      date: data.date
    }

    return formatedData
  },

  clearFields(){
    Form.description.value = '',
    Form.amount.value = ''
  },

  submit(event) {
    event.preventDefault()

    let data = Form.getData()

    try {
      Form.validateFields(data)
      const transaction = Form.formatData(data)
      Transaction.add(transaction)
      Form.clearFields()
    } catch (error) {
      alert(error.message)
    }
  }
}

const App = {
  init() {
    Transaction.all.forEach(DOM.addTransaction)
    DOM.updateBalance()
    ChartGraph.graphCreate()
  },
  reload() {
    DOM.clearTransactions()
    App.init()
  }
}

App.init()