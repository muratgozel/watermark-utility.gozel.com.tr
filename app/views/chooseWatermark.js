module.exports = {
  div: {
    children: {
      'case @state.isActive': [
        {h4: {text: '3. Filigranınızı Seçin'}},
        {p: {text: 'Bu cihazdan yaptığınız girişlerde sistem son seçtiğiniz filigranı hatırlayacaktır.', style: {marginBottom: '1rem'}}},
        {div: {class: '@props.css.input', children: [
          {
            div: {
              id: 'photo-upload-wrapper2',
              class: '@props.css.photo-upload-wrapper',
              dataset: {
                photoChosen: 'no'
              },
              children: [
                {input: {type: 'file', name: 'photo'}},
                {div: {class: '@props.css.photo-upload-fake-input', id: 'photo-upload-action-box2', children: [
                  '@component.svg-photo'
                ]}},
                {div: {class: '@props.css.photo-upload-helper', children: [
                  {p: {text: 'BİR FOTOĞRAF SEÇİN'}},
                  {a: {href: '#', id: 'photo-upload-bottom-action2', text: 'KALDIR'}}
                ]}}
              ]
            }
          }
        ]}}
      ],
      'otherwise': []
    }
  }
}
