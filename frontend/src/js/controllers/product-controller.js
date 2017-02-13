'use strict';

function productController(
  $scope,
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
      controller: function($scope, $uibModalInstance, categoryService) {
        $scope.title = 'Изменить продукт';
        $scope.product = angular.copy(product);
        $scope.categories = [];
        
        $scope.yes = function() {
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

        categoryService.getCategories().then(items => $scope.categories = items);
      }
    });
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
    });
  };
  
  $scope.$on('categoryChanged', (event, categoryId) => {
    vm.currentCategory = categoryId;
    productService.getProducts(categoryId).then(items => vm.products = items || []);
  });

  $scope.$on('productAdded', (event, product) => {
    if (vm.currentCategory == product.category || (!vm.currentCategory && !product.category)) {
      vm.products.push(product);
    }
  });
}

module.exports = angular
  .module('app')
  .controller('productController', productController)
  .name;