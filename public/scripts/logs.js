// Contains logic pertaining to logs, including the AJAX call to render all logs

$(document).ready( function() {

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
