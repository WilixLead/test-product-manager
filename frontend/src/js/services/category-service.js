'use strict';

function categoryService(
  apiService
) {
  "ngInject";

  /**
   * Return category list
   * @return {Promise.<TResult>|*}
   */
  this.getCategories = function() {
    return apiService.callApi('GET', '/categories').then(res => res.categories);
  };

  /**
   * Add new category
   * @param params
   * @return {Promise.<TResult>|*}
   */
  this.addCategory = function(params) {
    if (!params || !params.title) {
      return Promise.reject('bad_params');
    }
    return apiService.callApi('POST', '/categories/add', params).then(res => res.category);
  };

  /**
   * Remove category by id
   * @param categoryId
   * @return {Promise.<TResult>|*}
   */
  this.removeCategory = function(categoryId) {
    if (!categoryId) {
      return Promise.reject('bad_params');
    }
    return apiService.callApi('GET', '/categories/delete/' + categoryId).then(res => res.success);
  };

  return this;
}

module.exports = angular
  .module('app')
  .service('categoryService', categoryService)
  .name;