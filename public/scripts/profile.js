$(document).ready( function() {

  // contains all js logic for the user profile page

  // add a character counter to the dayly diary entry
  $(".btn").prop("disabled", true);

  $("#new-log").on("input", function() {
    $("#counter").text(60 - $(this).val().length);

    if ($(this).val().length > 0) {
      $(".btn").prop("disabled", false);
    } else {
      $(".btn").prop("disabled", true);
    }
  });

  //AJAX request to handle dayly log updates
  $(document).on('submit', '.edit-form', function() {

    console.log($(this).data("log-id"));

    var updatedSubmission = ($(this).data("log-id"));
    var formValue = $('#' + updatedSubmission).val();
    console.log(formValue);
    var logObj = {
  		diary_entry: formValue
  	};
    //
  	$.ajax({
  		type: "PUT",
  		url: "/api/logs/" + updatedSubmission,
  		data: logObj,
  		success: function() {
  			window.location.reload();
  		},
  		error: function() {
  			alert("Error!");
  		}
  	});

  });

  // gather and render all logs for the logged-in user

  // compile underscore template
  var template = _.template($('#log-template').html());

  // search for all logs from the current user
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

  //AJAX request to handle dayly log deletions
  $(document).on('click', ".glyphicon-remove", function() {

    console.log($(this).data("id"));

  	$.ajax({
  		type: "DELETE",
  		url: "/api/logs/" + $(this).data("id"),
  		success: function() {
  			window.location.reload();
  		},
  		error: function() {
  			alert("Error!");
  		}
  	});

  });


  // render an inspiring quote to the profile page
//   var quoteTemplate = _.template($('#inspiring-quote').html());
//
//   $.get(
//   'http://api.theysaidso.com/qod.json',
//   function(data) {
//     console.log(data);
//
//     $dataHtml = $(quoteTemplate(data));
//
//     $('#quote').append($dataHtml);
//
//   }
// );

}); // close $(document).ready
