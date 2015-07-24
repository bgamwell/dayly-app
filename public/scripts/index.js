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

  //renders ALL logs as a stream to the Dayly homepage

  // compile underscore template
  var template = _.template($('#log-template').html());

  $.get('/api/logs', function(allLogs) {

    // iterate through all logs
    _.each(allLogs, function(log, index) {

      // pass log through underscore template
      var $logHtml = $(template(log));

      // append log HTML to page
      $('#log-list').append($logHtml);
    });
  });

});
