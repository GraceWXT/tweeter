$(document).ready(function() {

  $("#tweet-text").on("input", function() {
    // Get the input text length
    let textLength = $("#tweet-text").val().length;
    // Set the counter value to (140 - text length)
    $("output.counter").val(`${140 - textLength}`);
    // Add - delete a class "warning" when the counter is less than - not less than 0, to trigger the CSS style rule
    let counterValue = $("output.counter").val();
    if (counterValue < 0) {
      $("output.counter").addClass( "warning");
    } else {
      $("output.counter").removeClass("warning");
    }
  });

});

