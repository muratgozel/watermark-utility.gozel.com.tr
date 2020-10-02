module.exports = {
  div: {
    children: [
      {h4: {text: '1. Fotoğrafınızı Seçin'}},
      {div: {class: '@props.css.input', children: [
        {
          div: {
            id: 'photo-upload-wrapper',
            class: '@props.css.photo-upload-wrapper',
            dataset: {
              photoChosen: 'no'
            },
            children: [
              {input: {type: 'file', name: 'photo'}},
              {div: {class: '@props.css.photo-upload-fake-input', id: 'photo-upload-action-box', children: [
                '@component.svg-photo'
              ]}},
              {div: {class: '@props.css.photo-upload-helper', children: [
                {p: {text: 'BİR FOTOĞRAF SEÇİN'}},
                {a: {href: '#', id: 'photo-upload-bottom-action', text: 'KALDIR'}}
              ]}}
            ]
          }
        }
      ]}},
    ]
  }
}
