const {Frond} = require('@frondjs/frond')
const {typekit} = require('basekits')

module.exports = function configureWatermarkPosition(pos) {
  const map2 = {
    'top-left': {top: 16, left: 16},
    'top-center': {top: 16, left: '50%', transform: 'translateX(-50%)'},
    'top-right': {top: 16, right: 16},
    'middle-left': {left: 16, top: '50%', transform: 'translateY(-50%)'},
    'middle-center': {top: '50%', left: '50%', transform: 'translateY(-50%) translateX(-50%)'},
    'middle-right': {right: 16, top: '50%', transform: 'translateY(-50%)'},
    'bottom-left': {bottom: 16, left: 16},
    'bottom-center': {bottom: 16, left: '50%', transform: 'translateX(-50%)'},
    'bottom-right': {bottom: 16, right: 16},
  }
  const wpreview = Frond.getComponent('chooseFormat').dom().querySelector('#watermark-preview')

  const unsetCSSProps = ['top', 'left', 'right', 'bottom', 'transform']
  unsetCSSProps.map(p => wpreview.style[p] = 'unset')

  Object
    .keys(map2[pos])
    .map(p => wpreview.style[p] = typekit.isNumber(map2[pos][p]) ? map2[pos][p] + 'px' : map2[pos][p])
}
