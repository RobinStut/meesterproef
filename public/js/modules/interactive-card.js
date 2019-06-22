import DraggingEvent from "./dragging-event.js"

export default class extends DraggingEvent {
  constructor(card) {
    super(card)

    this.card = card

    this.memory

    super.getDistance(this.slideCard.bind(this))
  }

  updateCard

  slideCard(data) {
    if (data !== null) {
      this.memory = data
      this.card.classList.remove("smooth-return")
      this.card.style.transform = `translateX(${data.x}px)`
    } else {
      if (Math.abs(this.memory.x) > 500) {
        console.log("past max")
      } else {
        this.card.classList.add("smooth-return")
        this.card.style.transform = `translateX(0)`
      }
    }
  }
}
