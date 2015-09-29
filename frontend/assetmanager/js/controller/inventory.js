angular.module('myApp').controller('inventoryController', ['$scope','$location', '$http', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', 'ModelFactory', 'ModelProductFactory', 'MpsviewFactory', function($scope, $location, $http, ProductFactory, StaffFactory, StaffProductFactory, ModelFactory, ModelProductFactory, MpsviewFactory) {
    document.getElementById("inp1").focus();
    $scope.sortField = 'name';
    $scope.reverse = true;

    $http.get("/api/mpview")
    .then(function(response) {
        if(response.status == 200) {
            $scope.inventory = response.data;
        } else {
            alert("Error");
        }
    });

    //Date.parse(new Date()) represents the current date. Change this to Date.parse("2020-01-01"); to test the functionality, outside of calculateDate function to only be executed once.
    $scope.currentDate = Date.parse(new Date());

    $scope.calculateDate = function(date) {
        if(Date.parse(date) < $scope.currentDate)
            return true;
        return false;
    };
}]);
