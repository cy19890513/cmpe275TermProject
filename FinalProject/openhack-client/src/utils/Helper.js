function executeAsynchronously(functions, timeout) {
  for(var i = 0; i < functions.length; i++) {
    setTimeout(functions[i], timeout);
  }
}