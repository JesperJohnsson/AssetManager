//Navigation
angular.module('myApp').config(function ($routeProvider) {

    $routeProvider

    .when('/product', {
        templateUrl: 'pages/goods/product.html',
        controller: 'productController'
    })

    .when('/model', {
        templateUrl: 'pages/goods/model.html',
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

    .otherwise({redirectTo : '/'});

});
