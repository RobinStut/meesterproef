import DraggingEvent from "./dragging-event.js"

export default class extends DraggingEvent {
    constructor(rangeInput) {
        // Init the DraggingEvent
        super()
        // Send the dragging target later in the code

        this.rangeInput = rangeInput
        this.slider = this.createSlider()
        this.settings = this.getSettings()

        this.sliderData = this.getSliderData()
        this.stepData = this.getStepData()

        this.init()

        super.target = this.slider.querySelector(".slider-pin");

        // Send the data to this.handler
        super.getDistance(this.sliding.bind(this))
    }

    createSlider() {
        const containerEl = document.createElement("DIV");
        containerEl.classList.add("slider-container")

        const trackEl = document.createElement("DIV");
        trackEl.classList.add("slider-track")

        const trailEl = document.createElement("DIV")
        trailEl.classList.add("slider-trail")

        const pinEl = document.createElement("DIV");
        pinEl.classList.add("slider-pin")

        trackEl.appendChild(trailEl)
        trackEl.appendChild(pinEl)
        containerEl.appendChild(trackEl)

        this.rangeInput.classList.add("visuallyhidden")

        // Insert the custom slider after the original range input
        return this.rangeInput.parentNode.insertBefore(containerEl, this.rangeInput.nextSibling)
    }

    init() {
        const pin = this.slider.querySelector(".slider-pin");
        const trail = this.slider.querySelector(".slider-trail");

        const pos = this.stepData.size * (this.settings.initValue / this.settings.step)

        pin.style.left = `${pos}%`
        trail.style.width = `${pos + this.sliderData.pinWidth / 2}%`

        this.sliderData = this.getSliderData();
        this.stepData = this.getStepData()
    }

    getSettings() {
        return {
            min: Number(this.rangeInput.min),
            max: Number(this.rangeInput.max),
            initValue: Number(this.rangeInput.value),
            step: this.rangeInput.step || 1
        }
    }

    getSliderData() {
        const pixelData = {
            pinWidth: this.slider.querySelector(".slider-pin").offsetWidth,
            pinLeft: this.slider.querySelector(".slider-pin").offsetLeft,
            trackLeft: this.slider.querySelector(".slider-track").offsetLeft,
            trackWidth: this.slider.querySelector(".slider-track").offsetWidth
        }

        // Set to percentages
        pixelData.pinLeft = pixelData.pinLeft / pixelData.trackWidth * 100;
        pixelData.pinWidth = pixelData.pinWidth / pixelData.trackWidth * 100;

        return pixelData
    }

    getStepData() {
        const stepsAmt = (Math.abs(this.settings.min) + Math.abs(this.settings.max)) / this.settings.step;
        const stepSize = (100 - this.sliderData.pinWidth) / stepsAmt;
        return {
            amt: stepsAmt,
            size: stepSize
        }
    }

    async sliding(data) {
        if (data === null) {
            this.sliderData = this.getSliderData();
            this.stepData = this.getStepData()

            return;
        }

        let newX;

        // Set to percentage
        data.x = data.x / this.sliderData.trackWidth * 100

        if (data.x + this.sliderData.pinLeft <= 0) {
            newX = 0;
        } else if (data.x + this.sliderData.pinLeft + this.sliderData.pinWidth >= 100) {
            newX = 100 - this.sliderData.pinWidth;
        } else {
            let temp = Math.round(data.x / this.stepData.size)

            newX = temp * this.stepData.size + this.sliderData.pinLeft
        }

        // Get the real value, can be passed to anything
        const realValue = Math.round(newX / this.stepData.size) * this.settings.step;

        // Update the range input
        this.rangeInput.value = realValue;

        // document.getElementById("16").getElementsByClassName("slider-pin").innerHTML = `${this.rangeInput.value}`
        this.slider.querySelector(".slider-pin").innerHTML = `${this.rangeInput.value}`
        this.slider.querySelector(".slider-pin").style.left = `${newX}%`;
        this.slider.querySelector(".slider-trail").style.width = `${newX + this.sliderData.pinWidth / 2}%`
    }
}