
//Declare module
angular.module('myApp', ['ngRoute', 'ngResource','ngSanitize', 'ui.select', 'angularUtils.directives.dirPagination']);

angular.module('myApp').config(function(paginationTemplateProvider) {
    paginationTemplateProvider.setPath('template/dirPagination.tpl.html');
});

angular.module('myApp').controller('secondController',['$scope', '$http', '$routeParams', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', function($scope, $http, $routeParams, ProductFactory, StaffFactory, StaffProductFactory) {
    //GETALL
    ProductFactory.query(function(data) {
        $scope.products = data;
    });

    StaffFactory.query(function(data) {
        $scope.staffs = data;
    });

    StaffProductFactory.query(function(data) {
        $scope.sp = data;
    });


    /*var staffproduct = {
        'productId': 15,
        'staffId': 1
    }

    StaffProductFactory.save(staffproduct);*/

    /*$scope.test = 'b';

    //GETONE
    ProductFactory.get({serialNr: $scope.test}, function(data) {
        $scope.lonely = data;
    });*/

    //DELETE
    //ProductFactory.delete({productId:'5'});

    //INSERT
    /*var data2 = {
        'serialNr' : 'CND445B8PH',
        'productNr' : 'K7H41ES#UUW',
        'productName' : 'HP X360 310 G1',
        'warranty': '2015-09-22',
        'lifespan': '2015-09-22',
        'status' : 'STORAGE',
        'type' : 'Computer'
    }
    //ProductFactory.update({productId:data2.productId},data2);
    //ProductFactory.save(data2);

    //UPDATE
    /*var product = ProductFactory.get({serialNr:$routeParams.serialNr});
    $serialNr = product.serialNr;

    product.productNr = 'b2';

    ProductFactory.update({serialNr:$serialNr}, product);*/

    //ProductFactory.save()

    /*var staff = {
        //staffId : 2,
        name : 'Jesper',
        phone : '123123'
    }

    //StaffFactory.update({staffId: staff.staffId}, staff);
    //StaffFactory.save(staff);
    //StaffFactory.delete({staffId: 3});*/


}]);
