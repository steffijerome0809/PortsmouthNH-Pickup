/* eslint-disable linebreak-style */
/* eslint-disable no-alert */
/* eslint-disable linebreak-style */
/* eslint-disable no-use-before-define */
/* eslint-disable linebreak-style */
$(document).ready(() => {
  // Getting references to our form and inputs
  const loginForm = $('form.login');
  const emailInput = $('input#email-input');
  const passwordInput = $('input#password-input');
  const Alert = new Poperror();

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on('submit', (event) => {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
    };

    if (!userData.email || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
  });
  function loginUser(email, password) {
    // sessionStorage.setItem('test', email);
    $.post('/api/login', {
      email,
      password,
    })
      .then(() => {
        window.location.replace('/members');
        // If there's an error, log the error
      })
      .catch((err) => {
        console.log('unauth +', err);
        // eslint-disable-next-line no-alert
        Alert.render();
      });
  }

  function Poperror() {
    // eslint-disable-next-line func-names
    // eslint-disable-next-line spaced-comment
    //var WinW = window.innerWidth;
    // eslint-disable-next-line operator-linebreak
    // eslint-disable-next-line spaced-comment
    //document.getElementById('dialogbox').style.left=100px;
    //  2000 / 2 - 550 * 0.5 + 'px';
    // eslint-disable-next-line func-names
    this.render = function () {
      document.getElementById('dialogbox').style.display = 'block';
      document.getElementById('headermessage').innerHTML = 'Login Invalid ';
      // eslint-disable-next-line operator-linebreak
      document.getElementById('bodymessage').innerHTML =
        'Email and Password Does Not Exist. New Users Please Signup';
      // eslint-disable-next-line operator-linebreak
      document.getElementById('footermessage').innerHTML =
        '<button onclick="boxclose()">OK</button>';
    };
  }
  // eslint-disable-next-line no-unused-vars
});
// eslint-disable-next-line no-unused-vars
function boxclose() {
  console.log('in boxclose');
  document.getElementById('dialogbox').style.display = 'none';
}
