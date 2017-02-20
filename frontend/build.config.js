module.exports = {
  prod: [
    ['${API_URL}$', 'http://wilix.ru:5687/api'],
    ['${HTML_BASE_HREF}$', 'https://wilix.ru/test-project/test-product-manager']
  ],
  dev: [
    ['${API_URL}$', 'http://localhost:5687/api'],
    ['${HTML_BASE_HREF}$', '/']
  ]
};