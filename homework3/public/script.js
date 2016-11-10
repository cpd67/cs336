
//This script is used in tandem with the first webpage in order to
//create a new person in our "database" from form data

//http://jqfundamentals.com/chapter/ajax-deferreds
$(document).ready(function() {
  //When the form is submitted...
  $( "form" ).submit(function( event ){

    event.preventDefault();

    //Get a handle to the form.
    var form = $( this );

    //AJAX call to send data
    $.ajax({
      type: "POST",
      url: "/people",
      //Get the form data
      data: form.serialize(),
      dataType: "json",
      success: function(resp) {
          console.log( resp );
      }
    });
  });
});
