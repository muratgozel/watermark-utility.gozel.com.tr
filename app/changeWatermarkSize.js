const {Frond} = require('@frondjs/frond')
const formatSizeMap = require('./formatSizeMap.js')

module.exports = function changeWatermarkSize(size=50) {
  size = parseFloat(size)
  const wpreview = Frond.getComponent('chooseFormat').dom().querySelector('#watermark-preview')
  const format = Frond.getComponent('chooseFormat').getInput('format')
  wpreview.style.width = (formatSizeMap[format].width * (1/3) * (size/100)).toFixed(2) + 'px'
  return;
}
