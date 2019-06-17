import DraggingEvent from "./dragging-event.js"

const carouselContainer = document.querySelector(".card-carousel")

class Carousel extends DraggingEvent {
  constructor(container) {
    super(container)

    // Elements
    this.container = container;
    this.cards = container.querySelectorAll(".card");

    // Carousel data
    this.centerIndex = (this.cards.length - 1) / 2; // center card

    // Initalizer
    this.build()
  }

  build() {
    for (let i = 0; i < this.cards.length; i++) {
      const x = i - this.centerIndex; // x-scale (-1 0 1)
      const scale = this.calcScale(x)

      console.log(scale)
    }
  }

  calcScale(x) {
    const formula = 1 - 1 / 5 * Math.pow(x, 2)

    return formula
  }
}

new Carousel(carouselContainer)
