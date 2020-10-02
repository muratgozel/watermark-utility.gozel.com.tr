module.exports = {
  div: {
    children: {
      'case @state.isActive': [
        {h4: {text: '4. Son Rötuşlar'}},
        {div: {class: '@props.css.input', children: [
          {label: {text: 'Filigran fotoğrafın neresinde görünmeli?'}},
          {select: {name: 'position', children: [
            {option: {value: '', text: 'Seç.'}},
            {option: {value: 'top-left', text: 'Sol üst köşe', selected: 'selected'}},
            {option: {value: 'top-center', text: 'Yukarıda ortala'}},
            {option: {value: 'top-right', text: 'Sağ üst köşe'}},
            {option: {value: 'middle-left', text: 'Solda ortala'}},
            {option: {value: 'middle-center', text: 'Tam merkez'}},
            {option: {value: 'middle-right', text: 'Sağda ortala'}},
            {option: {value: 'bottom-left', text: 'Sol alt köşe'}},
            {option: {value: 'bottom-center', text: 'Aşağıda ortala'}},
            {option: {value: 'bottom-right', text: 'Sağ alt köşe'}},
          ]}}
        ]}},
        {div: {class: '@props.css.input', children: [
          {label: {text: 'Filigranın büyüklüğü iyi mi?'}},
          {
            input: {
              type: 'range',
              name: 'size',
              min: 1,
              max: 100,
              value: 50
            }
          }
        ]}},
        {div: {class: '@props.css.input', children: [
          {label: {text: 'Filigranın şeffaflığını değiştirmek ister misiniz?'}},
          {
            input: {
              type: 'range',
              name: 'opacity',
              min: 1,
              max: 10,
              value: 5
            }
          }
        ]}},
      ],
      'otherwise': []
    }
  }
}
