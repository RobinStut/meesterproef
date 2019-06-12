    'use strict';

    import * as header from './modules/header.js'
    import {
        sidebarNav
    } from './modules/header-sidebar.js'

    const customSliders = document.getElementsByClassName("custom-slider")

    header.headerBackgroundScroll()
    sidebarNav()
    import Quiz from "./modules/quizSetup.js";
    import CustomSlider from "./modules/customSlider.js"

    (() => {
        header.headerBackgroundScroll()
        sidebarNav()

        const customSliders = document.getElementsByClassName("custom-slider")

        for (let i = 0; i < customSliders.length; i++) {
            new CustomSlider(customSliders[i])
        }
    })()
