module.exports = {
  div: {
    class: '@props.css.form-actions',
    children: {
      'case @state.isActive': [
        {div: {
          class: '@props.css.form-actions-left',
          children: [
            {a: {href: '#', id: 'generate-btn', text: 'Oluştur'}}
          ]
        }},
        {div: {
          class: '@props.css.form-actions-right',
          children: [
            {a: {href: '#', id: 'clear-btn', text: 'Temizle'}}
          ]
        }}
      ],
      'otherwise': []
    }
  }
}
