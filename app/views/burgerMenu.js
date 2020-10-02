module.exports = {
  div: {
    class: ['@props.css.site-section', '@props.css.burger-menu'],
    children: [
      {
        div: {
          class: '@props.css.section',
          children: [
            {div: {class: '@props.css.heading', text: 'Menü'}},
            {a: {class: '@props.css.item', href: '@router.zero.start', text: '1. Filigran Uygulayıcı'}},
          ]
        }
      }
    ]
  }
}
