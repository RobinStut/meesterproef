import DraggingEvent from "./dragging-event.js"

export default class extends DraggingEvent {
  constructor(card) {
    super(card)

    this.card = card

    this.memory

    super.getDistance(this.slideCard.bind(this))
  }

  removeCard() {
    this.card.style.height = `${this.card.offsetHeight}px`

    setTimeout(() => {
      this.card.style.height = "0px"
      this.card.style.margin = "0px"
      this.card.style.padding = "0px"
      this.card.style.transform = `translateX(${window.innerWidth}px)`
    }, 0)
  }

  slideCard(data) {
    if (data !== null) {
      this.memory = data
      this.card.classList.remove("smooth-return")
      this.card.style.transform = `translateX(${data.x}px)`
    } else {
      if (Math.abs(this.memory.x > 150)) {
        this.card.classList.add("smooth-return")
        this.removeCard()
      } else {
        this.card.classList.add("smooth-return")
        this.card.style.transform = `translateX(0)`
      }
    }
  }
}
