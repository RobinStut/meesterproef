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

    createSlider() {}
    createScale() {}
}
