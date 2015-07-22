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


  $(document).on('click', '.edit-pencil', function(event){
    $('#edit-dayly').modal('show');
  });

  //code to update a post here; html forms don't support put requests--good to know!
  $(document).on('submit', '#edit-dayly', function() {
  	var logObj = {
  		diary_entry: $("#edit-text").val(),
  	};

  	$.ajax({
  		type: "PUT",
  		url: "/api/logs/" + $(this).data("id"),
  		data: logObj,
  		success: function() {
  			window.location.reload();
  		},
  		error: function() {
  			alert("Error!");
  		}
  	});

  });

});
