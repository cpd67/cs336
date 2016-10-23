$(document).ready(function() {
  $('form').submit(function(event) {

    event.preventDefault();
    var form = $(this);

    $.ajax({
      type: "GET",
      url: "/individual",
      data: form.serialize(),
      dataType: "json",
      success: function(resp) {
        console.log(resp);
      }
    })		// Code to run if the request succeeds (is done);
		// The response is passed to the function
		.done(function( json ) {
      //Get the data from the JSON 
			$("<p>").text("First name: " + json.firstname).appendTo("body");
      $("<p>").text("Last name: " + json.lastname).appendTo("body");
      $("<p>").text("Login ID: " + json.loginID).appendTo("body");
      $("<p>").text("Start date: " + json.startDate).appendTo("body");
		})
		// Code to run if the request fails; the raw request and
		// status codes are passed to the function
		.fail(function( xhr, status, errorThrown ) {
		    alert( "Sorry, there was a problem!" );
		    console.log( "Error: " + errorThrown );
		    console.log( "Status: " + status );
		    console.dir( xhr );
		})

  });
});
