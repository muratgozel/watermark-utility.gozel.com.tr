const {Component, Frond} = require('@frondjs/frond')
const FileSaver = require('file-saver')
const views = require('../views')
const drawImage = require('../drawImage')
const drawWatermark = require('../drawWatermark')

module.exports = new Component({
  id: 'generate',
  view: views.generate,
  model: function() {
    return {
      props: {
        css: Frond.getWindow().Monodrom.cssmodules.app
      },
      state: {
        isActive: false
      }
    }
  },
  on: {
    '#generate-btn': {
      click: function(event, component) {
        event.preventDefault()

        Frond.getComponent('loadingbar').update({disabled: false})

        const format = Frond.getComponent('chooseFormat').getInput('format')
        const config = Frond.getComponent('configureWatermark')
        const position = config.getInput('position')
        const size = config.getInput('size')
        const opacity = config.getInput('opacity')
        drawImage(
          format,
          true,
          () => drawWatermark(
            format,
            position,
            size,
            opacity,
            true,
            function() {
              // find filename
              const choosePhoto = Frond.getComponent('choosePhoto')
              const photo = choosePhoto.getInput('photo')[0]
              const ext = photo.name.slice(photo.name.lastIndexOf('.')+1)
              const filename = photo.name.slice(0, photo.name.lastIndexOf('.')) + '-watermark.png'

              // find base64 encoded data
              const data = Frond.getDocument().getElementById('canvas-preview').toDataURL()

              // save
              FileSaver.saveAs(data, filename)

              // lower the size of the preview
              drawImage(format, false, () => drawWatermark(format, position, size, opacity, false, () => Frond.getComponent('loadingbar').update({disabled: true})))
            }
          )
        )
      }
    },
    '#clear-btn': {
      click: function(event, component) {
        Frond.getWindow().location.reload()
      }
    }
  }
})
