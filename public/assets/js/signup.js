/* eslint-disable linebreak-style */
/* eslint-disable spaced-comment */
/* eslint-disable linebreak-style */
/* eslint-disable no-alert*/
/* eslint-disable linebreak-style */
/* eslint-disable spaced-comment */
/* eslint-disable linebreak-style */
/* eslint-disable space-infix-ops */
/* eslint-disable linebreak-style */
/* eslint-disable prefer-template */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable quotes */
/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-use-before-define */
$(document).ready(() => {
  // Getting references to our form and input
  const signUpForm = $('form.signup');
  const userNameInput = $('#username-input');
  const emailInput = $('#email-input');
  const passwordInput = $('#password-input');
  const confirmpasswordInput = $('#password-input2');
  const Alert = new Poperror();

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on('submit', (event) => {
    event.preventDefault();

    const userData = {
      username: userNameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      confirmpassword: confirmpasswordInput.val().trim(),
    };
    console.log('OVJ', userData);
    // If we have an email and password, run the signUpUser function
    if (userData.password !== userData.confirmpassword) {
      const errorstr = 'Password do not match';
      Alert.render(errorstr);
    } else {
      signUpUser(userData.username, userData.email, userData.password);
    }
    emailInput.val('');
    passwordInput.val('');
    userNameInput.val('');
    confirmpasswordInput.val('');
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(username, email, password) {
    //console.log('check 1' + username + email + password);
    $.post('/api/signup', { username, email, password })
      .then((res) => {
        //console.log('res' + res);
        window.location.replace('/members');
        // If there's an error, handle it by throwing up a bootstrap alert
      })
      .catch((err) => {
        console.log('create user error' + err);
        // eslint-disable-next-line operator-linebreak
        const errorstr =
          'Username and Email Exists, SignUp with a new Username and Email';
        Alert.render(errorstr);
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
    this.render = function (errorstro) {
      document.getElementById('dialogbox').style.display = 'block';
      document.getElementById('headermessage').innerHTML = 'Signup Invalid ';
      // eslint-disable-next-line operator-linebreak
      document.getElementById('bodymessage').innerHTML = errorstro;
      //   'Username and Email Exists, SignUp with a new Username and Email';
      // eslint-disable-next-line operator-linebreak
      document.getElementById('footermessage').innerHTML =
        '<button id="okbutton" onclick="boxclose()">OK</button>';
    };
  }
});
function boxclose() {
  console.log('in boxclose');
  document.getElementById('dialogbox').style.display = 'none';
}
