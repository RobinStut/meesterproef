import DraggingEvent from "./dragging-event.js"

export default class extends DraggingEvent {
    constructor(rangeInput) {
      super()

      this.rangeInput = rangeInput;

      this.settings = this.createSettings()
      this.slider = this.createSlider()
      this.scale = this.createScale()
    }
}
