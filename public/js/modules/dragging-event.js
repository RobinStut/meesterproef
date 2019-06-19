export default class {
  constructor(target = undefined) {
      this.target = target;
  }

  event(callback) {
      let handler;

      this.target.addEventListener("mousedown", e => {
          e.preventDefault()

          handler = callback(e)

          window.addEventListener("mousemove", handler)

          window.addEventListener("mouseup", clearDraggingEvent)

          document.addEventListener("mouseleave", clearDraggingEvent)

          function clearDraggingEvent() {
              window.removeEventListener("mousemove", handler)
              window.removeEventListener("mouseup", clearDraggingEvent)

              document.removeEventListener("mouseleave", clearDraggingEvent)

              handler(null)
          }
      })

      this.target.addEventListener("touchstart", e => {
          handler = callback(e)

          window.addEventListener("touchmove", handler)
          window.addEventListener("touchend", clearDraggingEvent)

          function clearDraggingEvent() {
              window.removeEventListener("touchmove", handler)
              window.removeEventListener("touchend", clearDraggingEvent)

              handler(null)
          }
      })
  }

  // Get the distance that the user has dragged
  getDistance(callback) {
      function distanceInit(e1) {
          let startingX, startingY;

          if ("touches" in e1) {
              startingX = e1.touches[0].clientX
              startingY = e1.touches[0].clientY
          } else {
              startingX = e1.clientX
              startingY = e1.clientY
          }


          return function (e2) {
              if (e2 === null) {
                  return callback(null)
              } else {

                  if ("touches" in e2) {
                      return callback({
                          x: e2.touches[0].clientX - startingX,
                          y: e2.touches[0].clientY - startingY
                      })
                  } else {
                      return callback({
                          x: e2.clientX - startingX,
                          y: e2.clientY - startingY
                      })
                  }
              }
          }
      }

      this.event(distanceInit)
  }

  getPosition(callback) {
    const l = this.leftOffset || 0;

    function positionInit(e1) {
      let startingX, startingY;

      if ("touches" in e1) {
        startingX = e1.touches[0].clientX
        startingY = e1.touches[0].clientY
      } else {
        startingX = e1.clientX
        startingY = e1.clientY
      }

      callback({
        clickedX: startingX - l,
        clickedY: startingY,
      })

      return function(e2) {
        if (e2 === null) {
          return callback(null)
        } else {
          let x, y;

          if ("touches" in e2) {
            x = e2.touches[0].clientX
            y = e2.touches[0].clientY
          } else {
            x = e2.clientX
            y = e2.clientY
          }

          return callback({
            startX: startingX - l,
            startY: startingY,
            x: x - l,
            y: y
          })
        }
      }
    }

    this.event(positionInit)
  }
}
