// Source: https://stackoverflow.com/questions/7944460/detect-safari-browser

export default function() {
  const safariRx = /safari/i
  const chromeRx = /chrome/i

  if (safariRx.test(navigator.userAgent)) {
    if (chromeRx.test(navigator.userAgent)) {
      return "chrome"
    } else {
      return "safari"
    }
  }
}
