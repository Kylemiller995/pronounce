var startRecognition = require("../../helpers/web_speech.js")
var requestHelper = require("../../helpers/request_helper.js")
var clearSideMenu = require("../../helpers/clear_side_menu.js")
var renderSideMenu = require("../side_menu/side_menu.js")

var renderTrainButton = function (currentWord, renderWordPage, renderLandingPage) {
  var recognition = startRecognition()
  var diagnostic = document.getElementById('score-visualisation');

  recognition.onresult = function(event) {
    var last = event.results.length - 1;
    var recognisedWord = event.results[last][0].transcript.toLowerCase();
    currentWord = currentWord.toLowerCase();

    var wordMatch = currentWord === recognisedWord
    conf = event.results[0][0].confidence * 100;

    var difficultyValue = localStorage.getItem("difficultyValue")

    switch(difficultyValue) {
      case "1":
        diffLevel = 0;
        break;
      case "2":
        diffLevel = 75;
        break;
      case "3":
        diffLevel = 90;
    }

    var move = function() {
      var width = 0;
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= conf) {
          clearInterval(id);
        } else {
          width++;
          diagnostic.style.width = width + '%';
          diagnostic.innerHTML = "CORRECT " + width * 1  + '%';
        }
      }
    }

    if ((conf > diffLevel) && (wordMatch)) {
      diagnostic.style["background-color"] = null

      var wordToSave = {word : currentWord, completed: true}
      requestHelper.post(document.location.origin + "/api/words/" + wordToSave.word, wordToSave, function(data){
        clearSideMenu()
        renderSideMenu(renderWordPage, renderLandingPage)
      })
      move();
      } else {
      var wordToSave = {word : currentWord, completed: false}
      requestHelper.post(document.location.origin + "/api/words/" + currentWord, wordToSave, function(data){
        clearSideMenu()
        renderSideMenu(renderWordPage, renderLandingPage)
      })
      diagnostic.style.width = 100 + '%'
      diagnostic.style["background-color"] = "red"
      diagnostic.textContent = "TRY AGAIN"
    }

    console.log('Result received: ' + recognisedWord)
    console.log('Confidence: ' + event.results[0][0].confidence);
  }

  var trainButton = document.createElement("button")
  trainButton.id = "train-button"
  trainButton.type = "button"
  trainButton.innerText = "Start Training"
  trainButton.addEventListener("click", function() {
    recognition.start()
    console.log('Ready to receive a word command.')
    diagnostic.innerHTML = ''
    diagnostic.style["background-color"] = "white"
  })
  return trainButton
}


module.exports = renderTrainButton
