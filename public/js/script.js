console.log('linked');

const customSliders = document.getElementsByClassName("custom-slider")

// quiz
import Quiz from "./modules/quizSetup.js";
import CustomSlider from "./modules/customSlider.js"

(() => {
    for (let i = 0; i < customSliders.length; i++) {
        new CustomSlider(customSliders[i])
    }
})()