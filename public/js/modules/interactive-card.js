import DraggingEvent from "./dragging-event.js"

export default class extends DraggingEvent {
  // constructor(container, onRemove = null) {
  //   super()
  //   this.container = container
  //   this.cards = container.querySelectorAll(".card")
  //   this.cardsAmount = this.cards.length
  //   this.onRemove = onRemove
  //   this.memory
  //   for (let i = 0; i < this.cards.length; i++) {
  //     super.target = this.cards[i]
  //     super.getDistance(this.slideCard.bind(this, this.cards[i]))
  //   }
  // }
  // removeCard(target, toRight) {
  //   target.style.height = `${target.offsetHeight}px`
  //   if (toRight) {
  //     target.style.transform = `translateX(${window.innerWidth}px)`
  //   } else {
  //     target.style.transform = `translateX(-${window.innerWidth}px)`
  //   }
  //   setTimeout(() => {
  //     target.style.margin = "0px"
  //     target.style.padding = "0px"
  //     target.style.border = "none"
  //     target.style.height = "0px"
  //   }, 0)
  //   setTimeout(() => {
  //     target.remove()
  //   }, 500)
  //   this.cardsAmount--
  //   this.memory = null
  //   if (this.onRemove) {
  //     this.onRemove(target, this.cardsAmount)
  //   }
  // }
  // slideCard(target, data) {
  //   if (data !== null) {
  //     this.memory = data
  //     target.classList.remove("smooth-return")
  //     target.style.transform = `translateX(${data.x}px)`
  //   } else {
  //     // Once you drag the card over the 75% of its own distance it will be removed
  //     if (Math.abs(this.memory.x) > target.offsetWidth * 0.75) {
  //       target.classList.add("smooth-return")
  //       this.removeCard(target, this.memory.x > 0)
  //     } else {
  //       target.classList.add("smooth-return")
  //       target.style.transform = `translateX(0)`
  //     }
  //   }
  // }
  // static countCards(container) {
  //   console.log(container.querySelectorAll(".card").length)
  // }
}
