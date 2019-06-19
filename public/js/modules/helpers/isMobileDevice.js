// Source: https://coderwall.com/p/i817wa/one-line-function-to-detect-mobile-devices-with-javascript

export default function() {
  return (typeof window.orientation !== "undefined") || (navigator.userAgent.indexOf('IEMobile') !== -1);
}
