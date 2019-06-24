import header from "./modules/header/header.js"
import Quiz from "./modules/quiz/quiz-setup.js"
import CustomSlider from "./modules/custom-slider.js"
import InteractiveCards from "./modules/interactive-card.js"

const customSliders = document.getElementsByClassName("custom-slider")
const cardsContainer = document.querySelector(".interactive-cards")

for (let i = 0; i < customSliders.length; i++) {
  new CustomSlider(customSliders[i], (origin, value) => {
    origin.slider.pin.textContent = value
  })
}

if (cardsContainer) {
  new InteractiveCards(cardsContainer, (target, amount) => {
    if (amount === 0) {
      setTimeout(() => {
        document.getElementById("pop-up-toggle").checked = false

        cardsContainer.classList.add("empty")
      }, 100)
    }
  })
}
