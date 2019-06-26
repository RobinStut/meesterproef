import DraggingEvent from "./dragging-event.js"
import checkBrowser from "./helpers/checkBrowser.js"

export default class extends DraggingEvent {
  constructor(rangeInput, callback) {
    if (checkBrowser() !== "safari") {
      super()

      this._output = callback || undefined

      this.rangeInput = rangeInput

      this.id = rangeInput.id

      this.settings = this.createSettings()
      this.slider = this.createSlider()
      this.scale = this.createScale()

      this.rangeInput.addEventListener("change", () => {
        this.settings.value = Number(this.rangeInput.value)
        this.init()
      })

      this.init()

      this.leftOffset

      super.target = this.slider.track

      super.getPosition(this.sliding.bind(this))

      window.addEventListener("resize", () => {
        this.updateLeftOffset()

        this.settings = this.createSettings()
        this.scale = this.createScale()

        this.init()
      })
    }
  }

  init() {
    const index =
      Math.abs(this.settings.min - this.settings.value) / this.settings.stepSize
    const position = this.scale[index]

    this.slider.pin.style.left = `${position}px`
    this.slider.trail.style.width = `${position +
      this.slider.pin.offsetWidth / 2}px`

    this.updateLeftOffset()

    if (this._output) this._output(this, this.rangeInput.value)
  }

  updateLeftOffset() {
    this.leftOffset = this.slider.track.getBoundingClientRect().left
  }

  createSettings() {
    const settings = {
      min: Number(this.rangeInput.min),
      max: Number(this.rangeInput.max),
      stepSize: Number(this.rangeInput.step) || 1,
      value: Number(this.rangeInput.value)
    }

    settings.total = settings.max - settings.min
    settings.steps = settings.total / settings.stepSize

    return settings
  }

  createSlider() {
    const containerEl = document.createElement("DIV")
    const trackEl = document.createElement("DIV")
    const trailEl = document.createElement("DIV")
    const pinEl = document.createElement("DIV")

    containerEl.classList.add("slider-container")
    trackEl.classList.add("slider-track")
    trailEl.classList.add("slider-trail")
    pinEl.classList.add("slider-pin")

    trackEl.appendChild(trailEl)
    trackEl.appendChild(pinEl)
    containerEl.appendChild(trackEl)

    this.rangeInput.classList.add("visuallyhidden")

    this.rangeInput.parentNode.insertBefore(
      containerEl,
      this.rangeInput.nextSibling
    )

    return {
      pin: pinEl,
      trail: trailEl,
      track: trackEl,
      container: containerEl
    }
  }

  createScale() {
    const scale = []
    const sliderWidth =
      this.slider.track.offsetWidth - this.slider.pin.offsetWidth
    const stepSize = sliderWidth / this.settings.steps

    for (let i = 0; i <= this.settings.steps; i++) {
      scale.push(i * stepSize)
    }

    return scale
  }

  findPosition(x) {
    let leftX, rightX

    this.scale.forEach(s => {
      if (x >= s) {
        leftX = s
      }
    })

    rightX = this.scale.find(s => {
      if (x <= s) {
        return s
      }
    })

    const centerX = (leftX + rightX + this.slider.pin.offsetWidth) / 2

    if (x > centerX) {
      return rightX
    } else if (x >= this.scale[this.scale.length - 1]) {
      return this.scale[this.scale.length - 1]
    }

    if (x < centerX) {
      return leftX
    } else if (x <= this.scale[0]) {
      return this.scale[0]
    }
  }

  findValue(x) {
    const index = this.scale.indexOf(x)

    return this.settings.min - -(index * this.settings.stepSize)
  }

  sliding(data) {
    if (data !== null) {
      if ("clickedX" in data) {
        this.updateLeftOffset()
      }

      const position = this.findPosition(
        data.clickedX - this.leftOffset || data.x - this.leftOffset
      )
      const value = this.findValue(position)

      this.slider.pin.style.left = `${position}px`
      this.slider.trail.style.width = `${position +
        this.slider.pin.offsetWidth / 2}px`

      this.rangeInput.value = value

      if (this._output) this._output(this, this.rangeInput.value)
    }
  }
}
