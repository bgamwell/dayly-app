$(document).ready( function() {

  console.log("Entry counter is working!");

  $(".btn").prop("disabled", true);

  $("#new-log").on("input", function() {
    $("#counter").text(60 - $(this).val().length);

    if ($(this).val().length > 0) {
      $(".btn").prop("disabled", false);
    } else {
      $(".btn").prop("disabled", true);
    }
  });

});
