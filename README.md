<h1>Welcome to my app "dev.finance"</h1>
<p>This app was developed in a programming course of the Rocketseat online school, called "discover" for programing beginers.</p>
<p>This app, basicaly, store a financial history to a little context, like a family, showing the balance of incomes, expences and total.</p>
<p>Originaly made to store the data in localStorage of the web browser, so, I decided to add more features to it.</p>
<p>Now, it do login with google, store the data in a relactional data bank of firebase (if the user is logged), the real time database, and shows a graphic of the history inserted for the user with a implementation of the <a target="_blank" href="https://www.chartjs.org/">ChartJs</a>.</p>

<h3>Some things that I learned with this app:</h3>
<p>If you want to work with login with google, all the app that change with the auth state, need to pass inside the auth check like in next:</p>

<pre><code>firebase.auth().onAuthStateChanged(user => {
  if(user){
    // user is loged
  } else {
    // user not loged
  }
})</code></pre>

<p>If you need to sort the data that come of the realtime database of firebase, you can use the code next:</p>

<pre><code>DB.ref(`users/${user.uid}/items`).orderByChild("date").on('value', item => {
  // your actions here
})</code></pre>

<p>You can see the app runing <a target="_blank" href="https://devdotfinance.web.app/">here</a></p>
<p>But, if you want to run this app by yourself, simply create a firebase app <a target="_blank" href="https://console.firebase.google.com">here</a></p>
<p>In next, you need to write the app credentials in the scripts.js:</p>
<pre><code>
const firebaseConfig = {
  // Your web app's Firebase configuration
}
</code></pre>

<p>I hope it help you like it helped me too! Thanks for see it and give a repo star if you like it!</p>
