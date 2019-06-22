import DraggingEvent from "./dragging-event.js"

export default class extends DraggingEvent {
  constructor(container) {
    super()

    this.container = container
    this.cards = container.querySelectorAll(".card")
  }
}
