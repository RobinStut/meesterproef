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
    this.cardWidth = this.cards[0].offsetWidth / this.container.offsetWidth * 100

    // Initalizer
    this.build()
  }

  build() {
    for (let i = 0; i < this.cards.length; i++) {
      const x = i - this.centerIndex; // x-scale (-1 0 1)
      const scale = this.calcScale(x)

      const leftPos = this.calcPos(x, scale)

      console.log(leftPos)
      this.cards[i].style.left = `${leftPos}%`
    }
  }

  calcScale(x) {
    return 1 - 1 / 5 * Math.pow(x, 2)
  }

  calcPos(x, scale) {
    if (x < 0) {
      // Calculate the left position for the cards one the left side
      return (scale * 100 - this.cardWidth) / 2;
    } else {
      // Calculate the left position for the cards on the right side
      return 100 - (scale * 100 + this.cardWidth) / 2
    }
  }
}

new Carousel(carouselContainer)
