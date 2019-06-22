import DraggingEvent from "./dragging-event.js"

export default class extends DraggingEvent {
  constructor(card) {
    super(card)

    this.card = card

    this.memory

    super.getDistance(this.slideCard.bind(this))
  }

  removeCard(toRight) {
    this.card.style.height = `${this.card.offsetHeight}px`

    setTimeout(() => {
      this.card.style.height = "0px"
      this.card.style.margin = "0px"
      this.card.style.padding = "0px"
      this.card.style.border = "none"

      if (toRight) {
        this.card.style.transform = `translateX(${window.innerWidth}px)`
      } else {
        this.card.style.transform = `translateX(-${window.innerWidth}px)`
      }
    }, 0)

    setTimeout(() => {
      this.card.remove()
    }, 1000)
  }

  slideCard(data) {
    if (data !== null) {
      this.memory = data
      this.card.classList.remove("smooth-return")
      this.card.style.transform = `translateX(${data.x}px)`
    } else {
      // Once you drag the card over the 75% of its own distance it will be removed
      if (Math.abs(this.memory.x) > this.card.offsetWidth * 0.75) {
        this.card.classList.add("smooth-return")
        this.removeCard(this.memory.x > 0)
      } else {
        this.card.classList.add("smooth-return")
        this.card.style.transform = `translateX(0)`
      }
    }
  }
}
