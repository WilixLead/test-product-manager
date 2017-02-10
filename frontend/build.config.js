module.exports = {
  prod: [
    ['${API_URL}$', 'https://test.wilix.ru/api'],
    ['${HTML_BASE_HREF}$', 'https://test.wilix.ru/app/']
  ],
  dev: [
    ['${API_URL}$', 'http://localhost:5687/api'],
    ['${HTML_BASE_HREF}$', '/']
  ]
};