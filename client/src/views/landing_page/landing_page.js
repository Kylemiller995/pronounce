// var request = require("../../request_helpers/request_helper.js")
var renderSearchButton = require("./button_view.js")
var renderWordPage = require("../word_page/word_page.js")

var clearStartChain = function () {
  var startChain = document.getElementById("start-chain")
  while (startChain.firstChild) {
    startChain.removeChild(startChain.firstChild)
  }
}

var onSearch = function (event) {
  var chosenWord = event.target[0].value
  clearStartChain()
  renderWordPage(chosenWord)
}

var renderTitle = function () {
  var titleTag = document.createElement("h1")
  titleTag.id = "main-title"
  titleTag.innerText = "Pronounce"
  titleTag.label = "main title"
  return titleTag
}

var renderSearchBox = function () {
  var searchBox = document.createElement("input")
  searchBox.type = "search"
  searchBox.id = "search-box"
  searchBox.placeholder = "Search for a word"
  searchBox.required = true
  searchBox.autofocus = true
  searchBox.autocomplete = true
  var labelSearchBox = document.createElement("label")
  labelSearchBox.for = "search-box"
  labelSearchBox.innerText = "Search for a word"
  return searchBox
}

var renderLandingPage = function () {
  var start = document.getElementById("start-chain")
  var titleDiv = document.createElement("div")
  start.appendChild(titleDiv)
  titleDiv.appendChild(renderTitle())
  titleDiv.classList.add("landing-page")
  titleDiv.id = "title-div"

  var searchBoxDiv = document.createElement("div")
  searchBoxDiv.classList.add("landing-page")
  searchBoxDiv.id = "search-box-div"

  var comboInputButtonDiv = document.createElement("div")
  comboInputButtonDiv.id = "combo-input-button"

  var searchForm = document.createElement("form")
  searchForm.id = "search-form"

  var searchBox = renderSearchBox()
  var searchButton = renderSearchButton()

  searchForm.addEventListener("submit", onSearch)

  searchForm.appendChild(searchBox)
  searchForm.appendChild(searchButton)

  comboInputButtonDiv.appendChild(searchForm)

  searchBoxDiv.appendChild(comboInputButtonDiv)

  start.appendChild(searchBoxDiv)
}


module.exports = renderLandingPage
