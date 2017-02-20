'use strict';

function mainController(
  $rootScope,
  $uibModal,
  categoryService,
  productService
) {
  'ngInject';
  
  let vm = this;
  vm.currentCategory = null;
  
  vm.addCategoryModal = function() {
    $uibModal.open({
      animation: true,
      templateUrl: 'addCategory.html',
      size: 'sm',
      controller: function($scope, $uibModalInstance) {
        $scope.yes = function() {
          categoryService.addCategory({
            title: $scope.title
          }).then(() => {
            $rootScope.$broadcast('updateCategoryList');
            $scope.cancel();
          });
        };

        $scope.cancel = function() {
          $uibModalInstance.dismiss();
        }
      }
    });
  };

  vm.addProductModal = function() {
    $uibModal.open({
      animation: true,
      templateUrl: 'editProduct.html',
      size: 'sm',
      controller: function($scope, $uibModalInstance, categoryService, $timeout) {
        $scope.title = 'Добавить продукт';
        $scope.product = {
          category: vm.currentCategory,
          title: '',
          cost: 0,
          retail_cost: 0
        };
        $scope.categories = [];
        $scope.err = {};

        $scope.yes = function() {
          let hasErrors = false;
          if (!$scope.product.title) { $scope.err.title = true; hasErrors = true; } else { $scope.err.title = false; }
          if (!$scope.product.cost) { $scope.err.cost = true; hasErrors = true; } else { $scope.err.cost = false; }
          if (!$scope.product.retail_cost) { $scope.err.retail_cost = true; hasErrors = true; } else { $scope.err.retail_cost = false; }
          if (hasErrors) {
            return;
          }
          $scope.err = {};
          
          productService.addProduct($scope.product).then((newProduct) => {
            $rootScope.$broadcast('productAdded', newProduct);
            $scope.cancel();
          });
        };

        $scope.cancel = function() {
          $uibModalInstance.dismiss();
        };

        categoryService.getCategories().then(items => {
          $timeout(() => {$scope.categories = items});
        });
      }
    });
  };

  $rootScope.$on('categoryChanged', (event, categoryId) => {
    vm.currentCategory = categoryId;
  });
}

module.exports = angular
  .module('app')
  .controller('mainController', mainController)
  .name;