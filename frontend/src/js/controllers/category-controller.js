'use strict';

function categoryController(
  $rootScope,
  $uibModal,
  categoryService
) {
  'ngInject';
  
  let vm = this;
  vm.currentCategory = null;
  vm.categories = [];
  
  vm.getCategories = function() {
    categoryService.getCategories().then(items => {
      vm.categories = items;
      vm.selectCategory(null);
    });
  };
  
  vm.selectCategory = function(categoryId) {
    vm.currentCategory = categoryId;
    $rootScope.$broadcast('categoryChanged', categoryId);
  };
  
  vm.removeCategory = function(category) {
    $uibModal.open({
      animation: true,
      templateUrl: 'confirmRemove.html',
      size: 'md',
      controller: function($scope, $uibModalInstance) {
        $scope.title = 'Хотите удалить категорию?';
        $scope.message = 'Все товары в этой категории будут помечены "Без категории"';
        
        $scope.yes = function() {
          categoryService.removeCategory(category._id).then(() => {
            vm.categories.splice(vm.categories.indexOf(category), 1);
            $scope.no();
          });
        };
        
        $scope.no = function() {
          $uibModalInstance.dismiss();
        }
      }
    });
  };

  $rootScope.$on('updateCategoryList', () => {
    vm.getCategories();
  });
  
  vm.getCategories();
}

module.exports = angular
  .module('app')
  .controller('categoryController', categoryController)
  .name;