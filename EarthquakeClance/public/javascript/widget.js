$(init);

function init() {
  $("#dialog").dialog({
    autoOpen: false
  });

  var availableTags = [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Nevada",
    "New Jersey",
    "New Hampshire",
    "New York",
    "Texas"
  ];
  $("#autocomplete").autocomplete({
    source: availableTags
  });
  $(".submit-search").on("click", function(event) {
    var search = $("#autocomplete").val();
    if (!availableTags.includes(search)) {
      alert("Invalid Input");
      event.preventDefault();
    }
  });
}

function openDialog() {
  $("#dialog").dialog("open");
}

function onSignup() {
  window.location.href = "../robot_test";
}

function onLogin() {
  window.location.href = "../login";
}

function earthquake() {
  window.location.href = "/earthquake";
}
