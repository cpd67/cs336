$( document ).ready(function() {
	$("#get-data").click(function( event ) {
		// Using the core $.ajax() method
		$.ajax({
			 
		    // The URL for the request
		    url: "/hello",
		    
			// Whether this is a POST or GET request
		    type: "GET",

		    // The data to send (will be converted to a query string)
		    data: {
		        name: "lab7"
			},
			
			dataType: "json", 
		})
		// Code to run if the request succeeds (is done);
		// The response is passed to the function
		.done(function( json ) {
			$("#get-data").next("div").html("<p>" + json.message + "</p>");
		})
		// Code to run if the request fails; the raw request and
		// status codes are passed to the function
		.fail(function( xhr, status, errorThrown ) {
		    alert( "Sorry, there was a problem!" );
		    console.log( "Error: " + errorThrown );
		    console.log( "Status: " + status );
		    console.dir( xhr );
		})
	    // Code to run regardless of success or failure;
	    .always(function( xhr, status ) {
		    alert( "The request is complete!" );
	  	})
   });
});
	 

