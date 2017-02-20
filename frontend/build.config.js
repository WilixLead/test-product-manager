module.exports = {
  prod: [
    ['${API_URL}$', 'http://wilix.ru:5688/api'],
    ['${HTML_BASE_HREF}$', 'http://wilix.ru:5688/']
  ],
  dev: [
    ['${API_URL}$', 'http://localhost:5688/api'],
    ['${HTML_BASE_HREF}$', '/']
  ]
};