
//Angular
var myApp = angular.module('myApp', ['ngRoute', 'ngResource']);

//Navigation
myApp.config(function ($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: 'pages/main.html',
        controller: 'mainController'
    })

    .when('/second', {
        templateUrl: 'pages/second.html',
        controller: 'secondController'
    })

    .otherwise({redirectTo : '/'});

});



myApp.factory("ProductFactory", function($resource) {
    return $resource("/api/product/:productId", {}, {
        update: { method: "PUT" }
    });
});

myApp.factory("StaffFactory", function($resource) {
    return $resource("/api/staff/:staffId", {}, {
        update: { method: "PUT" }
    });
});

myApp.controller('mainController', ['$scope', '$http', 'ProductFactory', function($scope, $http, ProductFactory) {
    $scope.switchFocus = function(keyEvent) {
        if (keyEvent.which === 13) {
            keyEvent.preventDefault();
            var focused = document.activeElement.id;
            if(focused == 'inp1') {
                document.getElementById("inp2").focus();
            } else if (focused == 'inp2') {

                $scope.searchTerm2 = 'https://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + window.encodeURIComponent($scope.productNr) + '&callback=JSON_CALLBACK&rsz=8';
                $http({method: 'JSONP', url: $scope.searchTerm2}).
                    then(function(response) {
                      $scope.searchstatus = response.status;
                      $scope.searchdata = response.data;
                      $scope.productName = $scope.searchdata.responseData.results[0].titleNoFormatting;
                    }, function(response) {
                      $scope.searchdata = response.data || "Request failed";
                      $scope.searchstatus = response.status;
                  });

                  document.getElementById("last").focus();
            } else if (focused == 'last') {
                //document.getElementById("addasset").submit();
            }
        }
    };

    $scope.formatDate = function(add) {
        var currentDate = new Date();
        currentDate.setDate(currentDate.getDate() + 365 * add);
        var yyyy = currentDate.getFullYear();
        var mm = currentDate.getMonth() + 1;
        var dd = currentDate.getDate();
        var futureDateFormatted = yyyy + "-" + mm + "-" + dd;
        return futureDateFormatted;
    }

    $scope.submit = function() {
        $scope.resultOfQueryF = null;
        $scope.resultOfQueryS = null;
        if($scope.serialNr && $scope.productNr && $scope.productName) {

            //Create an array of the new record
            var product = {
                'serialNr' : $scope.serialNr,
                'productNr' : $scope.productNr,
                'productName' : $scope.productName,
                'warranty' : $scope.formatDate($scope.warranty),
                'lifespan' : $scope.formatDate($scope.lifespan),
                'status' : 'STORAGE',
                'type' : $scope.type,
            };

            //Add new record of product
            ProductFactory.save(product);

            //Set success output
            $scope.resultOfQueryS = true;
        } else {
            //Set fail output
            $scope.resultOfQueryF = true;
        }
    };

    //The different types an asset can have.
    $scope.types = ["Computer", "Screen", "Phone", "Printer", "License"];

}]);


myApp.controller('secondController',['$scope', '$routeParams', 'ProductFactory', 'StaffFactory', function($scope, $routeParams, ProductFactory, StaffFactory) {
    //GETALL
    ProductFactory.query(function(data) {
        $scope.products = data;
    });

    StaffFactory.query(function(data) {
        $scope.staffs = data;
    });

    /*$scope.test = 'b';

    //GETONE
    ProductFactory.get({serialNr: $scope.test}, function(data) {
        $scope.lonely = data;
    });*/

    //DELETE
    //ProductFactory.delete({serialNr:'a'});

    //INSERT
    var data2 = {
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

    var staff = {
        //staffId : 2,
        name : 'bolisen',
        phone : '112'
    }

    //StaffFactory.update({staffId: staff.staffId}, staff);
    //StaffFactory.save(staff);


}]);
