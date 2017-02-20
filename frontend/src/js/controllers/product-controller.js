'use strict';

function productController(
  $rootScope,
  $uibModal,
  productService
) {
  'ngInject';
  
  let vm = this;
  vm.products = [];
  vm.currentCategory = null;

  vm.editModal = function(product) {
    $uibModal.open({
      animation: true,
      templateUrl: 'editProduct.html',
      size: 'sm',
      controller: function($scope, $uibModalInstance, categoryService, $timeout) {
        $scope.title = 'Изменить продукт';
        $scope.categories = [];
        $scope.err = {};
        
        $scope.yes = function() {
          let hasErrors = false;
          if (!$scope.product.title) { $scope.err.title = true; hasErrors = true; } else { $scope.err.title = false; }
          if (!$scope.product.cost || !/\d+/.test($scope.product.cost)) { $scope.err.cost = true; hasErrors = true; } else { $scope.err.cost = false; }
          if (!$scope.product.retail_cost || !/\d+/.test($scope.product.retail_cost)) { $scope.err.retail_cost = true; hasErrors = true; } else { $scope.err.retail_cost = false; }
          if (hasErrors) {
            return;
          }
          $scope.err = {};
          
          productService.updateProduct($scope.product).then((newProduct) => {
            if (product.category == newProduct.category) {
              vm.products[vm.products.indexOf(product)] = newProduct;
            } else {
              vm.products.splice(vm.products.indexOf(product), 1);
            }
            $scope.cancel();
          });
        };

        $scope.cancel = function() {
          $uibModalInstance.dismiss();
        };

        categoryService.getCategories().then(items => {
          $timeout(() => {
            $scope.categories = items;
            $scope.product = angular.copy(product);
          });
        });
      }
    }).result.catch(() => {});
  };
  
  vm.removeModal = function(product) {
    $uibModal.open({
      animation: true,
      templateUrl: 'confirmRemove.html',
      size: 'md',
      controller: function($scope, $uibModalInstance) {
        $scope.title = 'Хотите удалить продукт?';
        $scope.message = 'Хотите удалить продукт №' + product.productId;
        
        $scope.yes = function() {
          productService.removeProduct(product.productId).then(() => {
            vm.products.splice(vm.products.indexOf(product), 1);
            $scope.no();
          });
        };
        
        $scope.no = function() {
          $uibModalInstance.dismiss();
        }
      }
    }).result.catch(() => {});
  };

  $rootScope.$on('categoryChanged', (event, categoryId) => {
    vm.currentCategory = categoryId;
    productService.getProducts(categoryId).then(items => vm.products = items || []);
  });

  $rootScope.$on('productAdded', (event, product) => {
    if (vm.currentCategory == product.category || (!vm.currentCategory && !product.category)) {
      vm.products.push(product);
    }
  });
}

module.exports = angular
  .module('app')
  .controller('productController', productController)
  .name;