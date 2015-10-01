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
        controller: 'productController'
    })

    .when('/model', {
        templateUrl: 'pages/goods/model.html',
        controller: 'modelController'
    })

    .when('/model/edit', {
        templateUrl: 'pages/goods/editmodel.html',
        controller: 'modelController'
    })

    .when('/model/remove', {
        templateUrl: 'pages/goods/removemodel.html',
        controller: 'modelController'
    })

    .when('/inventory', {
        templateUrl: 'pages/inventory.html',
        controller: 'inventoryController'
    })

    .when('/substitution', {
        templateUrl: 'pages/substitute.html',
        controller: 'substituteController'
    })

    .otherwise({redirectTo : '/product'});

});
