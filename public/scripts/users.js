// Contains logic pertaining to logs, including the AJAX call to render all logs

$(document).ready( function() {

    // compile underscore template; figure out a way to render the username, and diary entry for each
    var template = _.template($('#log-template').html());

    //search for all logs
      $.get('/api/currentlogs', function(allLogs) {

        // iterate through all logs
        _.each(allLogs, function(log, index) {

        // pass user through underscore template
        $logHtml = $(template(log));

        // append user HTML to page
        $('#log-list').append($logHtml);

        });

      });

    var nameTemplate = _.template($('#user-template').html());

      // AJAX call to server to GET the current user
      $.get('/api/users/current', function(user) {
        console.log(user);

        // pass user through underscore template
        $userName = $(nameTemplate({currentUser: user}));

        // append user HTML to page
        $('#show-user').append($userName);
      });

});
