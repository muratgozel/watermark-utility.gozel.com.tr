module.exports = {
  fetch: {
    test: function() { return 'fetch' in window },
    assets: [
      {
        id: 'polyfill-fetch',
        url: 'https://cdn.gozel.com.tr/js/packages/whatwg-fetch/v3.0/fetch.456c02ee2a49.js',
        async: false,
        location: 'headEnd'
      }
    ]
  },
  picajs: {
    assets: [
      {
        id: 'picajs',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/pica/6.1.1/pica.min.js',
        async: true,
        location: 'headEnd'
      }
    ]
  }
  /*
  pdfmake: {
    assets: [
      {
        id: 'pdfmake',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.68/pdfmake.min.js',
        async: true,
        location: 'headEnd'
      }
    ]
  },
  pdfjs: {
    assets: [
      {
        id: 'pdfjs',
        url: 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.6.347/pdf.min.js',
        async: true,
        location: 'headEnd'
      }
    ]
  }
  */
}
