import Carousel from "./carousel.js"
import isMobileDevice from "../helpers/isMobileDevice.js"

const carousel = document.querySelector(".card-carousel")
const dragInputs = document.getElementsByClassName("dragInput")
const dragTagValues = document.getElementsByClassName("draggableTag")

export default (() => {
  if (!isMobileDevice() && document.getElementById("mainMotivation")) {
    document.getElementById(
      "mainMotivation"
    ).innerHTML = `   <h3>What are your 3 main motivations for sports?</h3>
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
            <div class="container">
                <p draggable="true" class="draggableTag">fun</p>
            </div>
            <div class="container">
                <p draggable="true" class="draggableTag">meet friends</p>
            </div>
            <div class="container">
                <p draggable="true" class="draggableTag">relaxation</p>
            </div>
            <div class="container">
                <p draggable="true" class="draggableTag">me time</p>
            </div>
            <div class="container">
                <p draggable="true" class="draggableTag">stress relief</p>
            </div>
            <div class="container">
                <p draggable="true" class="draggableTag">winning</p>
            </div>
            <div class="container">
                <p draggable="true" class="draggableTag">learn something</p>
            </div>
            <div class="container">
                <p draggable="true" class="draggableTag">personal achievements </p>
            </div>
        </div>`
  }

  let currentDraggedElement

  if (carousel) {
    new Carousel(carousel)
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
