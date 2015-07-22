$(document).ready( function() {

  // form error handling using jquery validate

  $('#signup-form').validate({
    rules: {
      "user[firstname]": "required",
      "user[lastname]": "required",
      "user[email]": "required",
      "user[password]": {
        required: true,
        minlength: 5
      },
      verifypassword: {
        required: true,
        equalTo: '#password'
      }
    },

    messages: {
      "user[firstname]": "Please enter your first name.",
      "user[lastname]": "Please enter your last name.",
      "user[password]": {
        required: "Please enter a password.",
        minlength: "Your password must be 5 characters or longer."
      },
      verifypassword: {
        required: "Please verify your password.",
        equalTo: "Please make sure your passwords match."
      }
    }
  });

});
