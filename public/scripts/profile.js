$(document).ready( function() {

  console.log("Entry counter is working!");

  // add a counter to the dayly diary entry
  $(".btn").prop("disabled", true);

  $("#new-log").on("input", function() {
    $("#counter").text(60 - $(this).val().length);

    if ($(this).val().length > 0) {
      $(".btn").prop("disabled", false);
    } else {
      $(".btn").prop("disabled", true);
    }
  });

  //code to update a post here; html forms don't support put requests--good to know!
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

}); // close $(document).ready
