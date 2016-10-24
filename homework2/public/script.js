//http://jqfundamentals.com/chapter/ajax-deferreds
$(document).ready(function() {
  $( "form" ).submit(function( event ) {

    event.preventDefault();
    var form = $( this );

    //AJAX call to send data
    $.ajax({
      type: "POST",
      url: "/add",
      data: form.serialize(),
      dataType: "json",
      success: function(resp) {
          console.log( resp );
      }
    });

  });
});
