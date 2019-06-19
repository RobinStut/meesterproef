import DraggingEvent from "./dragging-event.js"

export default class extends DraggingEvent {
    constructor(rangeInput) {
      super()

      this.rangeInput = rangeInput;

      this.settings = this.createSettings()
      this.slider = this.createSlider()
      this.scale = this.createScale()
    }

    createSettings() {
      const settings = {
        min: Number(this.rangeInput.min),
        max: Number(this.rangeInput.max),
        stepSize: Number(this.rangeInput.step) || 1,
        value: Number(this.rangeInput.value)
      }

      settings.total = settings.max - settings.min;
      settings.steps = settings.total / settings.stepSize;

      return settings
    }

    createSlider() {
      const containerEl = document.createElement("DIV")
      const trackEl = document.createElement("DIV")
      const trailEl = document.createElement("DIV")
      const pinEl = document.createElement("DIV")


      containerEl.classList.add("slider-container")
      trackEl.classList.add("slider-track")
      trailEl.classList.add("slider-trail")
      pinEl.classList.add("slider-pin")

      trackEl.appendChild(trailEl)
      trackEl.appendChild(pinEl)
      containerEl.appendChild(trackEl)

      this.rangeInput.classList.add("visuallyhidden")

      this.rangeInput.parentNode.insertBefore(containerEl, this.rangeInput.nextSibling)

      return {
        pin: pinEl,
        trail: trailEl,
        track: trackEl
      }
    }

    createScale() {
      const scale = []
      const sliderWidth = this.slider.track.offsetWidth - this.slider.pin.offsetWidth
      const stepSize = sliderWidth / this.settings.steps

      for (let i = 0; i <= this.settings.steps; i++) {
        scale.push(i * stepSize)
      }

      return scale
    }

}
