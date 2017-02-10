'use strict';

function productService(
  apiService
) {
  "ngInject";

  /**
   * Return product list by category
   * @param category
   * @return {Promise.<TResult>|*}
   */
  this.getProducts = function(category) {
    if (!category) {
      category = '';
    } else {
      category = '?category=' + category;
    }
    return apiService.call('GET', '/products' + category).then(res => res.products);
  };

  /**
   * Add new product
   * @param params
   * @return {Promise.<TResult>|*}
   */
  this.addProduct = function(params) {
    if (!params || !params.title || typeof params.cost == 'undefined' || typeof params.retail_cost == 'undefined') {
      return Promise.reject('bad_params');
    }
    return apiService.call('POST', '/products/add', params).then(res => res.product);
  };

  /**
   * Update product by id
   * @param params
   * @return {Promise.<TResult>|*}
   */
  this.updateProduct = function(params) {
    if (!params || typeof params.productId == 'undefined') {
      return Promise.reject('bad_params');
    }
    return apiService.call('POST', '/products/update/' + params.productId, params).then(res => res.product);
  };

  /**
   * Remove product by id
   * @param productId
   * @return {Promise.<TResult>|*}
   */
  this.removeProduct = function(productId) {
    if (!productId) {
      return Promise.reject('bad_params');
    }
    return apiService.call('GET', '/products/delete/' + productId).then(res => res.success);
  };

  return this;
}

module.exports = angular
  .module('app')
  .service('productService', productService)
  .name;