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

    // Bind dragging event
    super.getDistance(this.moveCards.bind(this))
  }

  build() {
    for (let i = 0; i < this.cards.length; i++) {
      const x = i - this.centerIndex; // x-scale (-1 0 1)
      const scale = this.calcScale(x)
      const leftPos = this.calcPos(x, scale)

      this.updateCards(this.cards[i], {
        x: x,
        left: leftPos,
        scale: scale
      })
    }
  }

  updateCards(card, data) {
    if (data.hasOwnProperty("x")) {
      card.setAttribute("data-x", data.x)
    }

    if (data.hasOwnProperty("left")) {
      card.style.left = `${data.left}%`
    }

    if (data.hasOwnProperty("scale")) {
      card.style.transform = `scale(${data.scale})`
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

  checkOrdering(x, xDist) {
    const rounded = Math.round(xDist)

    let newX = x;

    if (x + rounded > x) {
      if (x + rounded > this.centerIndex) {

        newX = ((x + rounded - 1) - this.centerIndex) - rounded + -this.centerIndex
      }
    } else if (x + rounded < x) {
      if (x + rounded < -this.centerIndex) {

        newX = ((x + rounded + 1) + this.centerIndex) - rounded + this.centerIndex
      }
    }

    return newX
  }

  moveCards(data) {
    let xDist;

    if (data == null) {
      // User stopped dragging
      xDist = 0;

      this.container.classList.add("smooth-return")
    } else {
      // User is dragging

      xDist = data.x / 250;

      this.container.classList.remove("smooth-return")
    }

    for (let i = 0; i < this.cards.length; i++) {
      const x = this.checkOrdering(parseInt(this.cards[i].dataset.x), xDist)
      const scale = this.calcScale(x + xDist)
      const leftPos = this.calcPos(x + xDist, scale)

      this.updateCards(this.cards[i], {
        left: leftPos,
        scale: scale
      })
    }
  }
}

new Carousel(carouselContainer)
