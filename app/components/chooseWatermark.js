const {Component, Frond} = require('@frondjs/frond')
const views = require('../views')
const drawImage = require('../drawImage')
const drawWatermark = require('../drawWatermark')

module.exports = new Component({
  id: 'chooseWatermark',
  view: views.chooseWatermark,
  model: function() {
    return {
      props: {
        css: Frond.getWindow().Monodrom.cssmodules.app
      },
      form: {
        name: 'chooseWatermark',
        fields: {
          photo: {value: ''},
          width: {value: ''},
          height: {value: ''}
        }
      },
      state: {
        isActive: false
      }
    }
  },
  on: {
    formUpdate: function(name, v, pv) {
      if (name == 'photo') {
        const reader = new FileReader()
        reader.readAsDataURL(v[0])
        reader.onload = function() {
          document.getElementById('photo-upload-action-box2').style.backgroundImage = 'url(' + reader.result + ')'
          document.getElementById('photo-upload-wrapper2').dataset['photoChosen'] = 'yes'

          const imgelem = new Image()
          imgelem.onload = function() {
            Frond.updateState({watermarkImageElement: this})

            // update ui
            Frond.getComponent('configureWatermark').update({isActive: true})

            const chooseFormat = Frond.getComponent('chooseFormat')
            chooseFormat.update({hasWatermark: true})

            const format = chooseFormat.getInput('format')
            drawImage(format, false, () => drawWatermark(format, 'top-left', 50))
          }
          imgelem.src = reader.result
        }
        reader.onerror = function(error) {
          document.getElementById('photo-upload-bottom-action2').innerText = error
        }
      }

    },
    'input[name="photo"]': {
      ready: function(elem, component) {
        const photo = component.getInput('photo')
        if (photo && photo.length > 0) {
          const reader = new FileReader()
          reader.readAsDataURL(photo[0])
          reader.onload = function() {
            document.getElementById('photo-upload-action-box2').style.backgroundImage = 'url(' + reader.result + ')'
            document.getElementById('photo-upload-wrapper2').dataset['photoChosen'] = 'yes'

            const imgelem = new Image()
            imgelem.onload = function() {
              Frond.updateState({watermarkImageElement: this})

              // update ui
              Frond.getComponent('configureWatermark').update({isActive: true})

              const chooseFormat = Frond.getComponent('chooseFormat')
              chooseFormat.update({hasWatermark: true})

              const format = chooseFormat.getInput('format')
              drawImage(format, false, () => drawWatermark(format, 'top-left', 50))
            }
            imgelem.src = reader.result
          }
          reader.onerror = function(error) {
            document.getElementById('photo-upload-bottom-action2').innerText = error
          }
        }
      }
    },
    '#photo-upload-bottom-action': {
      click: function(event, component) {
        event.preventDefault()

        document.getElementById('photo-upload-action-box2').style.backgroundImage = ''
        document.getElementById('photo-upload-wrapper2').dataset['photoChosen'] = 'no'

        Frond.getComponent('configureWatermark').update({isActive: false})
        Frond.getComponent('generate').update({isActive: false})
      }
    }
  }
})
