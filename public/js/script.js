    'use strict';

    import * as header from './modules/header.js'
    import { sidebarNav } from './modules/header-sidebar.js'
    import Quiz from "./modules/quiz-setup.js/index.js";
    import CustomSlider from "./modules/custom-slider.js"

    const customSliders = document.getElementsByClassName("custom-slider")

    header.headerBackgroundScroll()
    sidebarNav()

    (() => {
        for (let i = 0; i < customSliders.length; i++) {
            new CustomSlider(customSliders[i])
        }
    })()