$(document).ready( function() {

    //renders the proper nav bar based on whether a user is logged in

    // compile underscore template
    var navTemplate = _.template($('#nav-template').html());

      // AJAX call to server to GET the current user
      $.get('/api/users/current', function(user) {

        // pass user through underscore template
        $navHtml = $(navTemplate({currentUser: user}));

        // append user HTML to page
        $('#nav-links').append($navHtml);
      });

});
