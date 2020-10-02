const {Component, Frond} = require('@frondjs/frond')
const views = require('../views')

module.exports = new Component({
  id: 'choosePhoto',
  view: views.choosePhoto,
  model: function() {
    return {
      props: {
        css: Frond.getWindow().Monodrom.cssmodules.app
      },
      form: {
        name: 'choosePhoto',
        fields: {
          photo: {value: ''}
        }
      }
    }
  },
  on: {
    formUpdate: function(name, v, pv) {
      if (name == 'photo') {
        const reader = new FileReader()
        reader.readAsDataURL(v[0])
        reader.onload = function() {
          document.getElementById('photo-upload-action-box').style.backgroundImage = 'url(' + reader.result + ')'
          document.getElementById('photo-upload-wrapper').dataset['photoChosen'] = 'yes'

          // store image
          const imgelem = new Image()
          imgelem.onload = function() {
            Frond.updateState({imageElement: this})
          }
          imgelem.src = reader.result

          // update ui
          const chooseFormat = Frond.getComponent('chooseFormat')
          if (chooseFormat.getState().isActive === true) {
            chooseFormat.updateInput('format', '')
            Frond.getComponent('chooseWatermark').update({isActive: false})
            Frond.getComponent('configureWatermark').update({isActive: false})
            Frond.getComponent('configureWatermark').updateInput('position', 'top-left')
            Frond.getComponent('generate').update({isActive: false})
          }
          else {
            chooseFormat.update({isActive: true})
          }
        }
        reader.onerror = function(error) {
          document.getElementById('photo-upload-bottom-action').innerText = error
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
            document.getElementById('photo-upload-action-box').style.backgroundImage = 'url(' + reader.result + ')'
            document.getElementById('photo-upload-wrapper').dataset['photoChosen'] = 'yes'

            // store image
            const imgelem = new Image()
            imgelem.onload = function() {
              Frond.updateState({imageElement: this})
            }
            imgelem.src = reader.result

            // update ui
            const chooseFormat = Frond.getComponent('chooseFormat')
            if (chooseFormat.getState().isActive === true) {
              chooseFormat.updateInput('format', '')
              Frond.getComponent('chooseWatermark').update({isActive: false})
              Frond.getComponent('configureWatermark').update({isActive: false})
              Frond.getComponent('configureWatermark').updateInput('position', 'top-left')
              Frond.getComponent('generate').update({isActive: false})
            }
            else {
              chooseFormat.update({isActive: true})
            }
          }
          reader.onerror = function(error) {
            document.getElementById('photo-upload-bottom-action').innerText = error
          }
        }
      }
    },
    '#photo-upload-bottom-action': {
      click: function(event, component) {
        event.preventDefault()

        document.getElementById('photo-upload-action-box').style.backgroundImage = ''
        document.getElementById('photo-upload-wrapper').dataset['photoChosen'] = 'no'

        Frond.getComponent('chooseFormat').update({isActive: false})
        Frond.getComponent('chooseWatermark').update({isActive: false})
        Frond.getComponent('configureWatermark').update({isActive: false})
        Frond.getComponent('generate').update({isActive: false})
      }
    }
  }
})
