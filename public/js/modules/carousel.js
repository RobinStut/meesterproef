import DraggingEvent from "./dragging-event.js"

const carouselContainer = document.querySelector(".card-carousel")

class Carousel extends DraggingEvent {
  constructor(container) {
    super(container)

    // Elements
    this.container = container
  }
}

new Carousel(carouselContainer)
