var requestHelper = require("../../helpers/request_helper")
var clearStartChain = require("../../helpers/clear_start_chain.js")

var renderSideMenu = function (renderWordPage, renderLandingPage) {
  var nav = document.querySelector("nav#side-menu")
  var completedList = nav.querySelector("#completed ul")
  var failedList = nav.querySelector("#failed ul")
  var newSearchButton = document.querySelector("#new-search")
  var hamburgerButton = document.querySelector(".hamburger")

  var toggleMenu = function () {
    if( nav.classList.contains("open") ) {
      nav.classList.remove("open")
      hamburgerButton.classList.remove("is-active")
    } else {
      nav.classList.add("open")
      hamburgerButton.classList.add("is-active")
    }
  }

  var onWordClick = function (event) {
    event.preventDefault()
    var chosenWord = event.target.innerText
    toggleMenu()
    clearStartChain()
    renderWordPage(chosenWord, renderLandingPage)
  }

  var onNewSearchClick = function (event) {
    event.preventDefault()
    toggleMenu()
    clearStartChain()
    renderLandingPage()
  }

  requestHelper.get(document.location.origin + "/api/words", function (words) {
    words.forEach(function (word) {
      var savedWord = document.createElement("li")
      var savedWordLink = document.createElement("a")

      savedWordLink.innerText = word.word
      savedWordLink.href = ""
      savedWordLink.onclick = onWordClick
      if (word.completed === true) {
        savedWord.appendChild(savedWordLink)
        completedList.appendChild(savedWord)
      } else {
        savedWord.appendChild(savedWordLink)
        failedList.appendChild(savedWord)
      }
    })
  })

  newSearchButton.onclick = onNewSearchClick

  hamburgerButton.onclick = toggleMenu
}

module.exports = renderSideMenu
