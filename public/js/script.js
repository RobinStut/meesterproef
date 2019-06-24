import header from "./modules/header/header.js"
import Quiz from "./modules/quiz/quiz-setup.js"
import QuizSliderTexts from "./modules/quiz/quiz-slider-texts.js"
import CustomSlider from "./modules/custom-slider.js"
import InteractiveCards from "./modules/interactive-card.js"
import quizSliderTexts from "./modules/quiz/quiz-slider-texts.js"

const customSliders = document.getElementsByClassName("custom-slider")
const cardsContainer = document.querySelector(".interactive-cards")

for (let i = 0; i < customSliders.length; i++) {
  new CustomSlider(customSliders[i], (origin, value) => {
    origin.slider.pin.textContent = value
    // console.log(origin.slider.pin)

    quizSliderTexts(value)
  })
}

new InteractiveCards(cardsContainer, (target, amount) => {
  if (amount === 0) {
    document.getElementById("pop-up-toggle").checked = false

    cardsContainer.classList.add("empty")
  }
})
