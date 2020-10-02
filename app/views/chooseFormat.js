module.exports = {
  div: {
    children: {
      'case @state.isActive': [
        {h4: {text: '2. Format Seçin'}},
        {div: {class: '@props.css.input', children: [
          {label: {text: 'Format'}},
          {select: {name: 'format', children: [
            {option: {value: '', text: 'Seç.'}},
            {option: {value: 'fbpost', text: 'Facebook Post'}},
            {option: {value: 'igpost', text: 'Instagram Post'}},
            {option: {value: 'igstory', text: 'Instagram Story'}},
          ]}}
        ]}},
        {div: {class: '@props.css.input', children: [
          {label: {text: 'Önizleme'}},
          {
            div: {
              id: 'format-preview',
              class: '@props.css.format-preview',
              dataset: {
                'case @form.format': {hasformat: 'yes'},
                'otherwise': {hasformat: 'no'}
              },
              children: {
                'case @form.format': [
                  {canvas: {id: 'canvas-preview'}}
                ],
                'otherwise': ['Önce format seçin.']
              }
            }
          }
        ]}},
      ],
      'otherwise': []
    }
  }
}
