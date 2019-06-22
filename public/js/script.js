import header from "./modules/header/header.js"
import Quiz from "./modules/quiz/quiz-setup.js"
import CustomSlider from "./modules/custom-slider.js"
import InteractiveCard from "./modules/interactive-card.js"

const customSliders = document.getElementsByClassName("custom-slider")
const interactiveCards = document.querySelectorAll(".interactive-cards .card")

for (let i = 0; i < customSliders.length; i++) {
  new CustomSlider(customSliders[i], (origin, value) => {
    origin.slider.pin.textContent = value
  })
}

for (let i = 0; i < interactiveCards.length; i++) {
  new InteractiveCard(interactiveCards[i], () => {
    document.getElementById("pop-up-toggle").checked = false

    document.querySelector(".interactive-cards").classList.add("empty")
  })
}
