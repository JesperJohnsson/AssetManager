angular.module('myApp').controller('statisticsController', ['$scope','$location', '$http', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', 'ModelFactory', 'ModelProductFactory', 'MpsviewFactory', function($scope, $location, $http, ProductFactory, StaffFactory, StaffProductFactory, ModelFactory, ModelProductFactory, MpsviewFactory) {



}]);

angular.module('myApp').controller('productStatsController', ['$scope', '$http', function($scope, $http) {

    $scope.chart = function() {
        var nrOfTypes = [[0,0,0,0,0],[0,0,0,0,0],[0,0,0,0,0]];
        $http.get("/api/mpview").then(function(response) {
            var data = response.data;
            $scope.total = data.length;
            for(var i = 0; i < data.length; i++) {
                for(var j = 0; j < $scope.labels.length; j++) {
                    if(data[i].type === $scope.labels[j]) {
                        //nrOfTypes[j]++;
                        for(var k = 0; k < $scope.series.length; k++) {
                            if(data[i].status === $scope.series[k]) {
                                nrOfTypes[k][j]++;
                                //console.log(nrOfTypes[k][j]);
                            }
                        }
                    }
                }
            }
        });
        return nrOfTypes;
    };

    $scope.labels = ["Computer", "Phone", "Screen", "Printer", "License"];
    $scope.series = ["Stored", "Owned", "Disposed"];
    $scope.types = ['Bar', 'Line', 'Radar'];
    $scope.type = $scope.types[1];
    $scope.data = $scope.chart();
}]);

angular.module('myApp').controller('modelStatsController', ['$scope', '$http', function($scope, $http) {

    $scope.chart = function() {
        var nrOfTypes = [0,0,0,0,0];
        var totalWarranty = [0,0,0,0,0];
        var totalLifespan = [0,0,0,0,0];

        $scope.averageData = [[0,0,0,0,0],[0,0,0,0,0]];

        $http.get("/api/model").then(function(response) {
            var data = response.data;
            $scope.total = data.length;
            for(var i = 0; i < data.length; i++) {
                for(var j = 0; j < $scope.labels.length; j++) {
                    if(data[i].type === $scope.labels[j]) {
                        nrOfTypes[j]++;
                        totalWarranty[j] += data[i].m_warranty;
                        totalLifespan[j] += data[i].m_lifespan;
                    }
                }
            }

            for(var i = 0; i < $scope.labels.length; i++) {
                $scope.averageData[0][i] = totalWarranty[i] / nrOfTypes[i];
                $scope.averageData[1][i] = totalLifespan[i] / nrOfTypes[i];
                if(!isFinite($scope.averageData[0][i])) {
                    $scope.averageData[0][i] = 0;
                }
                if(!isFinite($scope.averageData[1][i])) {
                    $scope.averageData[1][i] = 0;
                }
            }
        });
        return nrOfTypes;
    };

    $scope.averageData = [[0,0,0,0,0],[0,0,0,0,0]];
    $scope.labels = ["Computer", "Phone", "Screen", "Printer", "License"];
    $scope.series = ['Warranty', 'Lifespan'];

    $scope.types = ['Doughnut', 'Pie', 'PolarArea'];
    $scope.type = $scope.types[0];

    $scope.types2 = ['Bar', 'Line', 'Radar'];
    $scope.type2 = $scope.types2[0];

    $scope.data = $scope.chart();

    console.log($scope.averageData);

}]);
