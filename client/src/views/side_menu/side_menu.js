var requestHelper = require("../../helpers/request_helper")
var renderLandingPage = require("../landing_page/landing_page.js")
var clearStartChain = require("../../helpers/clear_start_chain.js")

var renderSideMenu = function (renderWordPage) {
  var nav = document.querySelector("nav#side-menu")
  var completedList = nav.querySelector("#completed ul")
  var newSearchButton = document.querySelector("#new-search")
  var hamburgerButton = document.querySelector(".hamburger")


  console.log(renderWordPage);

  var toggleMenu = function () {
    console.log("toggling menu");
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
    console.log(this)
    console.log(renderWordPage);
    renderWordPage(chosenWord)
  }

  var onNewSearchClick = function (event) {
    event.preventDefault()
    toggleMenu()
    clearStartChain()
    renderLandingPage()
  }

  requestHelper.get("http://localhost:3000/api/words", function (words) {
    words.forEach(function (word) {
      var savedWord = document.createElement("li")
      var savedWordLink = document.createElement("a")

      savedWordLink.innerText = word.word
      savedWordLink.href = ""
      savedWordLink.onclick = onWordClick

      savedWord.appendChild(savedWordLink)
      completedList.appendChild(savedWord)
    })
  })

  newSearchButton.onclick = onNewSearchClick

  hamburgerButton.onclick = toggleMenu
}

module.exports = renderSideMenu
