![Printscreen of the project](https://teilorwebdev.vercel.app/_next/image?url=%2F_next%2Fstatic%2Fimage%2Fpublic%2Fdevdotfinance.656b28ce85ccbfc044392d00f2d81619.png&w=1920&q=75)
 
## dev.finance
 
<p>This app was developed in a programming course of the Rocketseat online school, called "discover" for programing beginers.</p>
<p>This app, basicaly, store a financial history to a little context, like a family, showing the balance of incomes, expences and total.</p>
<p>Originaly made to store the data in localStorage of the web browser, so, I decided to add more features to it.</p>
<p>Now, it do login with google, store the data in a relactional data bank of firebase (if the user is logged), the real time database, and shows a graphic of the history inserted for the user with a implementation of the <a target="_blank" href="https://www.chartjs.org/">ChartJs</a>.</p>

## Some things that I learned with this app:

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
 
 
## Technology 
 
Here are the technologies used in this project.
 
* HTML
* CSS
* Javascript
* <p><a target="_blank" href="https://www.chartjs.org/">ChartJs</a>.</p>
 
 
## Services Used
 
* Github
* Firebase from Google
 
## Getting started
 
<p>You can see and use the app <a target="_blank" href="https://devdotfinance.web.app/">here</a></p>
<p>But, if you want to run this app by yourself, simply create a firebase app <a target="_blank" href="https://console.firebase.google.com">here</a></p>
<p>In next, you need to write the app credentials in the scripts.js:</p>
<pre><code>
const firebaseConfig = {
  // Your web app's Firebase configuration
}
</code></pre>

<p>In next, you need to run "yarn start" to run the local test server and to test the app locally.</p>

 
## How to use
 
You can register your financial balance adding your transactions, the app will calculate all the balance for you, the data is stored in the local storage for default, but if you want to keep the data stored in the server, you need to login with google, it is simple, fast, and free for all.
 
 
## Features
 
  - With this app, you can create a place that you can control your financial balance history and plan your expenses.
 
 
## Links
 
  - Link of deployed application: https://devdotfinance.web.app/
  - Repository: https://github.com/teilorbarcelos/dev.finance
    - In case of sensitive bugs like security vulnerabilities, please contact
      OUR EMAIL directly instead of using issue tracker. We value your effort
      to improve the security and privacy of this project!
 
 
## Versioning
 
1.0.0.0
 
 
## Authors
 
* **TEILOR SOUZA BARCELOS**: @teilorbarcelos (https://github.com/teilorbarcelos)
 
 
## Learn More

You can learn more in the <a target="_blank" href="https://app.rocketseat.com.br/">[Rocketseat programming school site]</a>.

<p>I hope it help you like it helped me too! Thanks for see it and give a repo star if you like it!</p>

# dev.finance
