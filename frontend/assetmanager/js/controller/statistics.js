angular.module('myApp').controller('statisticsController', ['$scope','$location', '$http', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', 'ModelFactory', 'ModelProductFactory', 'MpsviewFactory', function($scope, $location, $http, ProductFactory, StaffFactory, StaffProductFactory, ModelFactory, ModelProductFactory, MpsviewFactory) {



}]);

angular.module('myApp').controller('productStatsController', ['$scope', '$http', function($scope, $http) {

    $scope.chart = function() {
        var nrOfTypes = [0,0,0,0,0];
        $http.get("/api/mpview").then(function(response) {
            var data = response.data;
            $scope.total = data.length;
            for(var i = 0; i < data.length; i++) {
                for(var j = 0; j < $scope.labels.length; j++) {
                    if(data[i].type === $scope.labels[j]) {
                        nrOfTypes[j]++;
                    }
                }
            }
        });
        return nrOfTypes;
    };

    $scope.labels = ["Computer", "Phone", "Screen", "Printer", "License"];
    $scope.types = ['Doughnut', 'Pie', 'PolarArea'];
    $scope.type = 'Pie';

    $scope.data = $scope.chart();
}]);

angular.module('myApp').controller('modelStatsController', ['$scope', '$http', function($scope, $http) {
    $scope.chart = function() {
        var nrOfTypes = [0,0,0,0,0];
        $http.get("/api/model").then(function(response) {
            var data = response.data;
            $scope.total = data.length;
            for(var i = 0; i < data.length; i++) {
                for(var j = 0; j < $scope.labels.length; j++) {
                    if(data[i].type === $scope.labels[j]) {
                        nrOfTypes[j]++;
                    }
                }
            }
        });
        return nrOfTypes;
    };

    $scope.labels = ["Computer", "Phone", "Screen", "Printer", "License"];
    $scope.types = ['Doughnut', 'Pie', 'PolarArea'];
    $scope.type = 'Doughnut';

    $scope.data = $scope.chart();
}]);
