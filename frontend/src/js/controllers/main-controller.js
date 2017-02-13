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
            $scope.$broadcast('updateCategoryList');
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
      controller: function($scope, $uibModalInstance, categoryService) {
        $scope.title = 'Добавить продукт';
        $scope.product = {
          category: vm.currentCategory,
          title: '',
          cost: 0,
          retail_cost: 0
        };
        $scope.categories = [];

        $scope.yes = function() {
          productService.addProduct($scope.product).then((newProduct) => {
            $rootScope.$broadcast('productAdded', newProduct);
            $scope.cancel();
          });
        };

        $scope.cancel = function() {
          $uibModalInstance.dismiss();
        };

        categoryService.getCategories().then(items => $scope.categories = items);
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