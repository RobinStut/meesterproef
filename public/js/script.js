    'use strict';

    import * as header from './modules/header.js'
    import { sidebarNav } from './modules/header-sidebar.js'
    import Quiz from "./modules/quiz-setup.js";
    import CustomSlider from "./modules/custom-slider.js"
    import Carousel from "./modules/carousel.js"

    (() => {
        header.headerBackgroundScroll()
        sidebarNav()

        const customSliders = document.getElementsByClassName("custom-slider")

        for (let i = 0; i < customSliders.length; i++) {
            new CustomSlider(customSliders[i])
        }
    })()
