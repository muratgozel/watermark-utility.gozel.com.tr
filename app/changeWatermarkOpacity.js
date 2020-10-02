const {Frond} = require('@frondjs/frond')

module.exports = function changeWatermarkOpacity(value) {
  value = (parseFloat(value) / 10).toFixed(2)
  const wpreview = Frond.getComponent('chooseFormat').dom().querySelector('#watermark-preview')
  wpreview.style.opacity = value
  return;
}
