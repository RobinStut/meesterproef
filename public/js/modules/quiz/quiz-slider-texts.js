export default value => {
  console.log(value)

  const wolfPackSlider = document.getElementById("16")
  console.log(wolfPackSlider.value)

  wolfPackSlider.addEventListener("input", updateValue)

  //   setInterval(() => {
  //     console.log(wolfPackSlider.value)
  //   }, 500)

  function updateValue(params) {
    console.log(params)
  }
}
