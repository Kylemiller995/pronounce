var requestHelper = require("../../helpers/request_helper.js")
var getAudioPlayer = require("../../helpers/web_audio.js")
var renderTrainButton = require("./trainButton-view.js")
var renderWordInfoButton = require("./infoButton-view.js")
var renderSoundButton = require("./soundButton-view.js")
var renderInfoPane = require('./info_pane.js')
var setSelectDifficultyValue = require('../side_menu/settingButtons.js')

var renderWordPage = function (currentWord, phonetic, playAudio, renderLandingPage, infoPane) {
  var start = document.getElementById("start-chain")

  var renderWordTitleDiv = function () {
    var renderWordTitle = function (currentWord) {
      var wordTitle = document.createElement("h1")
      wordTitle.id = "word-title"
      wordTitle.innerText = currentWord
      wordTitle.label = "word title"
      return wordTitle
    }

    var renderPhoneticField = function (currentWord) {
      var phoneticField = document.createElement("p")
      phoneticField.id = "phonetic-field"
      phoneticField.innerText = currentWord
      phoneticField.label = "phonetic field"
      return phoneticField
    }

    var wordTitleDiv = document.createElement("div")
    wordTitleDiv.classList.add("word-page")
    wordTitleDiv.id = "word-title-div"

    var wordTitle = renderWordTitle(currentWord)
    wordTitleDiv.appendChild(wordTitle)

    var phoneticField = renderPhoneticField(phonetic)
    wordTitleDiv.appendChild(phoneticField)

    var wordInfoButton = renderWordInfoButton(infoPane)
    wordTitleDiv.appendChild(wordInfoButton)

    start.appendChild(wordTitleDiv)
  }

  var renderTrainingDiv = function () {
    var renderScoreVisualisation = function () {
      var scoreVisualisation = document.createElement("div")
      scoreVisualisation.id = "score-visualisation"
      scoreVisualisation.label = "score visualisation"
      return scoreVisualisation
    }

    var trainingDiv = document.createElement("div")
    trainingDiv.classList.add("word-page")
    trainingDiv.id = "training-div"

    start.appendChild(trainingDiv)

    trainingDiv.appendChild(infoPane)

    var soundButton = renderSoundButton(playAudio)
    trainingDiv.appendChild(soundButton)

    var scoreVisualisation = renderScoreVisualisation()
    trainingDiv.appendChild(scoreVisualisation)

    var trainButton = renderTrainButton(currentWord, makeDictionaryRequest, renderLandingPage)
    trainingDiv.appendChild(trainButton)
  }

  renderWordTitleDiv()
  renderTrainingDiv()

  if (currentWord.toLowerCase() === "tomato") {
    document.body.classList.add("tomato")
  }
}

var makeDictionaryRequest = function (currentWord, renderLandingPage) {
  var url = document.location.origin + "/api/oed/" + currentWord
  requestHelper.get(url, function (oedData) {
    var infoPane = renderInfoPane(oedData)

    var audioFileURL
    var phonetic

    for (var pronunciation of oedData.results[0].lexicalEntries[0].pronunciations) {
      if (audioFileURL) break
      audioFileURL = pronunciation.audioFile
      phonetic = pronunciation.phoneticSpelling
    }

    var playAudio = getAudioPlayer(audioFileURL)

    renderWordPage(currentWord, phonetic, playAudio, renderLandingPage, infoPane)
  })
}

module.exports = makeDictionaryRequest
