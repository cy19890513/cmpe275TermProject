$(init);

function init() {
  //drag
  $(".dragMe").draggable();
  $("#target")
    .resizable()
    .droppable();
  $("#target").bind("drop", highlightTarget);
  //$("#target").bind("dropout", resetTarget);

  $("div").addClass("ui-widget");
}

function highlightTarget(event, ui) {
  $("#target")
    .addClass("ui-state-highlight")
    .html("Dropped ")
    .append(ui.draggable.text());
  window.location.href = "../sign_up";
}

function resetTarget(event, ui) {
  $("#target")
    .removeClass("ui-state-highlight")
    .html("Drop on me");
}
