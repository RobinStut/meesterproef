import * as header from './modules/header/header.js'
import Quiz from "./modules/quiz/quiz-setup.js";
import CustomSlider from "./modules/custom-slider.js"


(() => {
    header.headerBackgroundScroll()
    header.sidebarNav()

    const customSliders = document.getElementsByClassName("custom-slider")

    for (let i = 0; i < customSliders.length; i++) {
      new CustomSlider(customSliders[i], (origin, value) => {
        origin.slider.pin.textContent = value;
      })
    }
})()
