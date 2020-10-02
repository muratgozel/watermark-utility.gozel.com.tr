const {Frond} = require('@frondjs/frond')
//const reducer = require('image-blob-reduce')()
const pica = require('pica')()
const formatSizeMap = require('./formatSizeMap')

module.exports = function drawImage(format, original=false, callback=undefined) {
  const {imageElement, cropopts} = Frond.getState()
  const {x, y, width, height} = cropopts
  const formatWidth = formatSizeMap[format].width * (original === true ? 3 : 1)
  const formatHeight = formatSizeMap[format].height * (original === true ? 3 : 1)
  const canvas = Frond.getDocument().getElementById('canvas-preview')
  canvas.width = formatWidth
  canvas.height = formatHeight

  // what should it look like? (smartcrop test)
  /*
  const sampleCanvas = document.createElement('canvas')
  sampleCanvas.width = formatSizeMap[format].width
  sampleCanvas.height = formatSizeMap[format].height
  sampleCanvas
    .getContext('2d')
    .drawImage(imageElement, x, y, width, height, 0, 0, sampleCanvas.width, sampleCanvas.height)
  document.body.appendChild(sampleCanvas)
  */

  const tmpCanvas = Frond.getDocument().createElement('canvas')
  tmpCanvas.width = width
  tmpCanvas.height = height
  tmpCanvas.getContext('2d').drawImage(imageElement, x*-1, y*-1)

  const formatPreview = Frond.getDocument().getElementById('format-preview')
  formatPreview.style.height = formatHeight + 'px'

  pica
    .resize(tmpCanvas, canvas, {
      alpha: true,
      unsharpAmount: 80,
      unsharpRadius: 0.6,
      unsharpThreshold: 2
    })
    .then(function(result) {
      if (typeof callback == 'function') callback()
    })
}
