/* eslint-disable no-undef */
$(document).ready(function() {
  console.log("Dom is ready");

  $("textarea").on("input", function() {
    const charCount = $(this).val().length;
    const output =  $(this).parent().siblings().children();
    output.val(140 - charCount);

    if (charCount > 140) {
      output.addClass("counter-red");
    } else {
      output.removeClass("counter-red");
    }
  });

});