import Carousel from "./carousel.js"
import isMobileDevice from "../helpers/isMobileDevice.js"

const carousel = document.querySelector(".card-carousel")
const dragInputs = document.getElementsByClassName("dragInput")
const dragTagValues = document.getElementsByClassName("draggableTag")
const carouselController = document.querySelector(
	".card-carousel + .carousel-controller"
)
const quizResultEvents = document.querySelectorAll(
  "#quiz-results-events [data-sport]"
)

export default (() => {
	if (!isMobileDevice() && document.getElementById("mainMotivation")) {
		document.getElementById(
			"mainMotivation"
		).innerHTML = `    <h3 class="section__h3--heading">
    Welke 3 factoren motiveren jouw het meest om te sporten?
  </h3>
        <label for="13">
            <div class="container dragInput" connectTo="13"></div>
            <input type="hidden" id="13" name="genderChoice">
        </label>
        <label for="14">
            <div class="container dragInput" connectTo="14"></div>
            <input type="hidden" id="14" name="genderChoice">
        </label>
        <label for="15">
            <div class="container dragInput" connectTo="15"></div>
            <input type="hidden" id="15" name="genderChoice">
        </label>
        <div>
            <div class="container mainMotivation__dragElement--animation">
                <p draggable="true" class="draggableTag">Plezier</p>
            </div>
            <div class="container mainMotivation__dragElement--animation">
                <p draggable="true" class="draggableTag">Nieuwe vrienden ontmoeten</p>
            </div>
            <div class="container mainMotivation__dragElement--animation">
                <p draggable="true" class="draggableTag">Om te ontspannen</p>
            </div>
            <div class="container mainMotivation__dragElement--animation">
                <p draggable="true" class="draggableTag">Voor mijn gezondheid</p>
            </div>
            <div class="container mainMotivation__dragElement--animation">
                <p draggable="true" class="draggableTag">Om te winnen</p>
            </div>
            <div class="container mainMotivation__dragElement--animation">
                <p draggable="true" class="draggableTag">Om iets te leren</p>
            </div>
            <div class="container mainMotivation__dragElement--animation">
                <p draggable="true" class="draggableTag">Om persoonlijke doelen te halen</p>
            </div>
            <div class="container mainMotivation__dragElement--animation">
                <p draggable="true" class="draggableTag">personal achievements </p>
            </div>
        </div>
        <label class="quiz__navigation" for="s-2">Vorige</label>
        <label class="quiz__navigation" for="s-4">Volgende</label>`
	}

	let currentDraggedElement

  if (carousel) {
    new Carousel(carousel, updateEvents, carouselController)
  }

  function updateEvents(card) {
    const sport = card.dataset.sport.toLowerCase()

    for (let i = 0; i < quizResultEvents.length; i++) {
      if (!quizResultEvents[i].hasAttribute("data-height")) {
        quizResultEvents[i].setAttribute(
          "data-height",
          quizResultEvents[i].offsetHeight
        )

        quizResultEvents[i].style.height = quizResultEvents[i].offsetHeight
      }

      setTimeout(() => {
        if (quizResultEvents[i].dataset.sport.toLowerCase() !== sport) {
          quizResultEvents[i].classList.add("filter-out")
        } else {
          quizResultEvents[i].classList.remove("filter-out")
        }
      }, 0)
    }
  }

  if (quizResultEvents) {
    for (let i = 0; i < quizResultEvents.length; i++) {
      const h = quizResultEvents[i].offsetHeight

      quizResultEvents[i].style.height = `${h}px`
    }
  }

	for (const dragInput of dragInputs) {
		dragInput.addEventListener("dragover", dragover)
		dragInput.addEventListener("dragenter", dragenter)
		dragInput.addEventListener("drop", drop)
	}

	for (const dragValue of dragTagValues) {
		dragValue.addEventListener("dragstart", dragstart)
	}

	function dragover(e) {
		e.preventDefault()
	}

	function dragstart(e) {
		currentDraggedElement = e.target.innerText
	}

	function dragenter(e) {
		e.preventDefault()
	}

	function drop(e) {
		setTimeout(() => {
			e.path[0].value = e.target.textContent
		}, 0)
		this.innerText = currentDraggedElement
		const coresponsingInputfield = e.target.attributes[1].value
		document.getElementById(
			coresponsingInputfield
		).value = currentDraggedElement
	}
})()
