export default class {
  constructor(target = undefined) {
    this.target = target
  }

  event(callback) {
    let handler

    this.target.style.setProperty("touch-action", "none")

    this.target.addEventListener("pointerdown", e => {
      e.preventDefault()

      handler = callback(e)

      window.addEventListener("pointermove", handler)
      window.addEventListener("pointerup", clearDraggingEvent)

      function clearDraggingEvent(e) {
        window.removeEventListener("pointermove", handler)
        window.removeEventListener("pointerup", clearDraggingEvent)

        handler(null)
      }
    })
  }

  // Get the distance that the user has dragged
  getDistance(callback) {
    function distanceInit(e1) {
      const startingX = e1.clientX
      const startingY = e1.clientY

      callback({ x: 0, y: 0 })

      return function(e2) {
        if (e2 === null) {
          return callback(null)
        } else {
          return callback({
            x: e2.clientX - startingX,
            y: e2.clientY - startingY
          })
        }
      }
    }

    this.event(distanceInit)
  }

  getPosition(callback) {
    function positionInit(e1) {
      const startingX = e1.clientX
      const startingY = e1.clientY

      callback({
        clickedX: startingX,
        clickedY: startingY
      })

      return function(e2) {
        if (e2 === null) {
          return callback(null)
        } else {
          const x = e2.clientX
          const y = e2.clientY

          return callback({
            startX: startingX,
            startY: startingY,
            x: x,
            y: y
          })
        }
      }
    }

    this.event(positionInit)
  }
}
