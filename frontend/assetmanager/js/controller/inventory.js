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
    })


}]);
