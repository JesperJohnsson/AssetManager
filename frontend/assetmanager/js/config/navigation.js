//Navigation
angular.module('myApp').config(function ($routeProvider) {

    $routeProvider

    .when('/product', {
        templateUrl: 'pages/goods/product.html',
        controller: 'productController'
    })

    .when('/product/edit', {
        templateUrl: 'pages/goods/editproduct.html',
        controller: 'editproductController'
    })

    .when('/product/remove', {
        templateUrl: 'pages/goods/removeproduct.html',
        controller: 'removeproductController'
    })

    .when('/model', {
        templateUrl: 'pages/goods/model.html',
        controller: 'modelController'
    })

    .when('/model/edit', {
        templateUrl: 'pages/goods/editmodel.html',
        controller: 'editmodelController'
    })

    .when('/model/remove', {
        templateUrl: 'pages/goods/removemodel.html',
        controller: 'removemodelController'
    })

    .when('/inventory', {
        templateUrl: 'pages/inventory.html',
        controller: 'inventoryController'
    })

    .when('/management', {
        templateUrl: 'pages/management.html',
        controller: 'managementController'
    })

    .when('/budget', {
        templateUrl: 'pages/budget.html',
        controller: 'budgetController'
    })

    .when('/stafflist', {
        templateUrl: 'pages/stafflist.html',
        controller: 'stafflistController'
    })

    .when('/stafflist/:staffId', {
        templateUrl: 'pages/stafflist/staffpage.html',
        controller: 'staffpageController'
    })

    .when('/statistics', {
        templateUrl: 'pages/statistics.html',
        controller: 'statisticsController'
    })

    .otherwise({redirectTo : '/product'});

});
