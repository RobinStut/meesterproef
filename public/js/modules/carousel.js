import DraggingEvent from "./dragging-event.js"

const carouselContainer = document.querySelector(".card-carousel")

class Carousel extends DraggingEvent {
  constructor(container) {
    super(container)

    // Elements
    this.container = container;
    this.cards = container.querySelectorAll(".card");

    // Carousel data
    this.centerIndex = (this.cards.length - 1) / 2;
    this.cardWidth = this.cards[0].offsetWidth / this.container.offsetWidth * 100
    this.xScale = {};

    // Initalizer
    this.build()

    // Bind dragging event
    super.getDistance(this.moveCards.bind(this))
  }

  build() {
    for (let i = 0; i < this.cards.length; i++) {
      const x = i - this.centerIndex,
            sizeScale = this.calcScaleSize(x),
            positionScale = this.calcScalePosition(x),
            leftPos = this.calcPosition(x, positionScale),
            zIndex = -(Math.abs(x))

      this.xScale[x] = this.cards[i]

      this.updateCards(this.cards[i], {
        x: x,
        left: leftPos,
        scale: sizeScale,
        zIndex: zIndex
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

    if (data.hasOwnProperty("zIndex")) {
      card.style.zIndex = data.zIndex
    }
  }


  calcScaleSize(x) {
    const formula = 1 - 1 / 5 * Math.pow(x, 2)

    if (formula <= 0) {
      return 0
    }

    return formula
  }

  calcScalePosition(x) {
    if (x <= 0) {
      return 1 - -1 / 5 * x
    }

    return  1 - 1 / 5 * x
  }

  calcPosition(x, scale) {
    if (x <= 0) {
      return (scale * 100 - this.cardWidth) / 2;
    }

    return 100 - (scale * 100 + this.cardWidth) / 2
  }

  checkOrdering(card, x, xDist) {
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

    this.xScale[newX + rounded] = card;

    this.updateCards(card, {
      zIndex: -Math.abs(newX + rounded)
    })

    return newX
  }

  moveCards(data) {
    let xDist;

    if (data == null) {
      xDist = 0;

      this.container.classList.add("smooth-return")

      for (let x in this.xScale) {
        this.updateCards(this.xScale[x], {
          x: x
        })
      }
    } else {
      xDist = data.x / 250;

      this.container.classList.remove("smooth-return")
    }

    for (let i = 0; i < this.cards.length; i++) {
      const x = this.checkOrdering(this.cards[i], parseInt(this.cards[i].dataset.x), xDist),
            sizeScale = this.calcScaleSize(x + xDist),
            positionScale = this.calcScalePosition(x + xDist),
            leftPos = this.calcPosition(x + xDist, positionScale)

      this.updateCards(this.cards[i], {
        left: leftPos,
        scale: sizeScale
      })
    }
  }
}

new Carousel(carouselContainer)
