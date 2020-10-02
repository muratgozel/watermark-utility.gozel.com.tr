const {Component, Frond} = require('@frondjs/frond')
const views = require('../views')
const drawImage = require('../drawImage')
const drawWatermark = require('../drawWatermark')

module.exports = new Component({
  id: 'configureWatermark',
  view: views.configureWatermark,
  model: function() {
    return {
      props: {
        css: Frond.getWindow().Monodrom.cssmodules.app
      },
      state: {
        isActive: false
      },
      form: {
        name: 'configureWatermark',
        fields: {
          position: {value: 'top-left'},
          size: {value: '50'},
          opacity: {value: '5'}
        }
      }
    }
  },
  on: {
    'input[name="size"]': {
      change: function(event, component) {
        const format = Frond.getComponent('chooseFormat').getInput('format')
        drawImage(format, false, () => drawWatermark(format, component.getInput('position'), event.target.value, component.getInput('opacity')))
      }
    },
    'input[name="opacity"]': {
      change: function(event, component) {
        const format = Frond.getComponent('chooseFormat').getInput('format')
        drawImage(format, false, () => drawWatermark(format, component.getInput('position'), component.getInput('size'), event.target.value))
      }
    },
    'select[name="position"]': {
      ready: function(elem, component) {
        const pos = component.getInput('position')
        if (pos.length > 0) {
          const format = Frond.getComponent('chooseFormat').getInput('format')
          drawImage(format, false, () => drawWatermark(format, pos, component.getInput('size'), component.getInput('opacity')))
          Frond.getComponent('generate').update({isActive: pos.length > 0})
        }
      },
      change: function(event, component) {
        const pos = event.target.value
        const format = Frond.getComponent('chooseFormat').getInput('format')
        drawImage(format, false, () => drawWatermark(format, pos, component.getInput('size'), component.getInput('opacity')))
        Frond.getComponent('generate').update({isActive: pos.length > 0})
      }
    }
  }
})
