'use strict';

function apiService(
  $http
) {
  "ngInject";
  this.apiUrl = '${API_URL}$';

  this.callApi = function(method, endpoint, data) {
    return new Promise((resolve, reject) => {
      $http({
        url: this.apiUrl + endpoint,
        method: method,
        data: data
      })
        .then(res => {
          if (res.data.success) {
            return resolve(res.data);
          }
          if (res.status <= 0) {
            return reject({type: 'connection', error: 'timeout'});
          }
          return reject({type: 'api', error: res});
        })
        .catch(err => {
          reject({type: 'connection', error: err});
          this.showCheckInternetConnection();
        });
    });
  };

  this.showCheckInternetConnection = function() {
    alert('Something wrong with connection to server. Please try again');
  };

  return this;
}

module.exports = angular
  .module('app')
  .service('apiService', apiService)
  .name;