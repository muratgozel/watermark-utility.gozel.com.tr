const {Frond} = require('@frondjs/frond')
const pica = require('pica')()
const formatSizeMap = require('./formatSizeMap')

module.exports = function drawWatermark(
  format='', pos=undefined, size=50, opacity=5, original=false, callback=undefined
) {
  const sizeFactor = original ? 1 : 1/3

  const watermarkimg = Frond.getState().watermarkImageElement

  const tmpCanvas = Frond.getDocument().createElement('canvas')
  tmpCanvas.width = watermarkimg.naturalWidth
  tmpCanvas.height = watermarkimg.naturalHeight
  tmpCanvas.getContext('2d').drawImage(watermarkimg, 0, 0)

  const dstCanvas = Frond.getDocument().createElement('canvas')
  dstCanvas.width = (formatSizeMap[format].width * sizeFactor * (size/100)).toFixed(2)
  dstCanvas.height = ((dstCanvas.width * watermarkimg.naturalHeight) / watermarkimg.naturalWidth).toFixed(2)

  pica
    .resize(tmpCanvas, dstCanvas, {
      alpha: true,
      unsharpAmount: 80,
      unsharpRadius: 0.6,
      unsharpThreshold: 2
    })
    .then(function(result) {
      const canvas = Frond.getDocument().getElementById('canvas-preview')
      const defaultMargin = 48 * sizeFactor
      const map = {
        'top-left': {
          top: defaultMargin,
          left: defaultMargin
        },
        'top-center': {
          top: defaultMargin,
          left: canvas.width/2 - dstCanvas.width/2
        },
        'top-right': {
          top: defaultMargin,
          left: canvas.width - dstCanvas.width - defaultMargin
        },
        'middle-left': {
          left: defaultMargin,
          top: canvas.height/2 - dstCanvas.height/2
        },
        'middle-center': {
          left: canvas.width/2 - dstCanvas.width/2,
          top: canvas.height/2 - dstCanvas.height/2
        },
        'middle-right': {
          left: canvas.width - dstCanvas.width - defaultMargin,
          top: canvas.height/2 - dstCanvas.height/2
        },
        'bottom-left': {
          left: defaultMargin,
          top: canvas.height - dstCanvas.height - defaultMargin
        },
        'bottom-center': {
          left: canvas.width/2 - dstCanvas.width/2,
          top: canvas.height - dstCanvas.height - defaultMargin
        },
        'bottom-right': {
          left: canvas.width - dstCanvas.width - defaultMargin,
          top: canvas.height - dstCanvas.height - defaultMargin
        },
      }
      const position = map[pos]
      const ctx = canvas.getContext('2d')
      ctx.globalAlpha = (parseFloat(opacity) / 10).toFixed(2)
      ctx.drawImage(result, position.left, position.top)
      ctx.globalAlpha = 1

      if (typeof callback == 'function') callback()
    })
}
