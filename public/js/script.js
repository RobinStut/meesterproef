import { classToggleClick } from "./modules/helpers/class-toggle-click.js"
import header from "./modules/header/header.js"
import Quiz from "./modules/quiz/quiz-setup.js"
import CustomSlider from "./modules/custom-slider.js"

const customSliders = document.getElementsByClassName("custom-slider")

for (let i = 0; i < customSliders.length; i++) {
	new CustomSlider(customSliders[i], (origin, value) => {
		origin.slider.pin.textContent = value
	})
}

const eventsFilter = document.querySelector(".st-filter-form")
const eventsFilterButton = document.querySelector(".st-filter-form button")
const toggleElements = [
	{ element: eventsFilter, class: "st-filter-form-show" },
	{ element: eventsFilterButton, class: "st-turn-180" }
]

classToggleClick(eventsFilterButton, toggleElements)
