const {Component, Frond} = require('@frondjs/frond')
const smartcrop = require('smartcrop')
const views = require('../views')
const formatSizeMap = require('../formatSizeMap')
const drawImage = require('../drawImage')

module.exports = new Component({
  id: 'chooseFormat',
  view: views.chooseFormat,
  model: function() {
    return {
      props: {
        css: Frond.getWindow().Monodrom.cssmodules.app
      },
      form: {
        name: 'chooseFormat',
        fields: {
          format: {value: ''}
        }
      },
      state: {
        isActive: false,
        format: '',
        hasWatermark: false
      }
    }
  },
  on: {
    update: function(currentState, prevState) {
      if (currentState.format != prevState.format) {
        const {format} = currentState
        if (format.length > 0) {
          smartcrop
            .crop(
              Frond.getState().imageElement,
              {width: formatSizeMap[format].width, height: formatSizeMap[format].height}
            )
            .then(function(crop) {
              Frond.updateState({cropopts: crop.topCrop})

              drawImage(format)

              Frond.getComponent('chooseWatermark').update({isActive: format.length > 0})
            })
        }
        else {
          Frond.getComponent('chooseWatermark').update({isActive: false})
          Frond.getComponent('configureWatermark').update({isActive: false})
          Frond.getComponent('generate').update({isActive: false})
        }
      }
    },
    'select[name="format"]': {
      ready: function(elem, component) {
        const format = component.getInput('format')
        /*if (format.length > 0) {
          drawImage(format)

          Frond.getComponent('chooseWatermark').update({isActive: format.length > 0})
        }*/

        component.update({format: format})
      },
      change: function(event, component) {
        const format = event.target.value
        component.update({format: format})
      }
    }
  }
})
