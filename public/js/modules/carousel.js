import DraggingEvent from "./dragging-event.js"

const carouselContainer = document.querySelector(".card-carousel")

class Carousel extends DraggingEvent {
  constructor(container) {
    super(container)

    // Elements
    this.container = container;
    this.cards = container.querySelectorAll(".card");

    // Initalizer
    this.build()
  }

  build() {
    for (let i = 0; i < this.cards.length; i++) {
      console.log(this.cards[i].id)
    }
  }
}

new Carousel(carouselContainer)
