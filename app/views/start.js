module.exports = {
  div: {
    children: [
      '@component.header',
      '@component.burgerMenu',
      {
        div: {
          class: ['@props.css.site-section', '@props.css.form-wrapper'],
          children: [
            {h3: {text: 'Filigran Uygulayıcı'}},
            {p: {text: 'İşleme başlamadan önce filigran görselininin ve filigran uygulamak istediğiniz fotoğrafın cihazınızda hazır bulunduğuna emin olunuz.', style: {marginBottom: '1rem'}}},
            '@component.choosePhoto',
            '@component.chooseFormat',
            '@component.chooseWatermark',
            '@component.configureWatermark',
            '@component.generate'
          ]
        }
      },
      '@component.footer'
    ]
  }
}
