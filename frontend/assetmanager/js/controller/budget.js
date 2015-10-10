angular.module('myApp').controller('budgetController', ['$scope','$location', '$http', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', 'ModelFactory', 'ModelProductFactory', 'MpsviewFactory', function($scope, $location, $http, ProductFactory, StaffFactory, StaffProductFactory, ModelFactory, ModelProductFactory, MpsviewFactory) {

    function addValueToChart(stringtype, kvalue, jvalue, totalNumber) {
        date = new Date($scope.inventory[kvalue][stringtype]);
        if(date.getFullYear() == $scope.currentYear && $scope.inventory[kvalue].type === $scope.labels[jvalue]) {
            totalNumber++;
        }
        return totalNumber;
    }

    function calculateUseAsset(kvalue, jvalue, totalNumber) {
        date = new Date($scope.inventory[kvalue].p_purchased);

        if(date.getFullYear() <= $scope.currentYear) {
            if($scope.inventory[kvalue].p_disposed === null && $scope.inventory[kvalue].type === $scope.labels[jvalue] && $scope.inventory[kvalue].status === "Owned") {
                totalNumber++;
            }
        }
        return totalNumber;
    }

    function resetVariables() {
        $scope.data = [];
        $scope.inventory = [];
    }

    function proximityYears(year) {
        $scope.years = [year - 2, year - 1, year, year + 1, year + 2];
    }

    $scope.createChart = function(year) {
        if(angular.isUndefined(year)) {
            year = new Date().getFullYear();
        }

        proximityYears(year);
        resetVariables();

        $http.get("/api/mpview").then(function(response) {
            if(response.status == 200) {
                //Save all products
                $scope.inventory = response.data;

                //Loop through all the series, [1,2,3,4,5] is how all the data for the series Purchase for all the labels is stored
                for(var i = 0; i < $scope.series.length; i++) {
                    var seriesData = [];

                    //Loop as many times as there is labels in $scope.labels.
                    for(var j = 0; j < $scope.labels.length; j++) {
                        var number = 0;
                        //Loop through all items in inventory;
                        for(var k = 0; k < $scope.inventory.length; k++) {
                            var date;
                            switch(i) {
                                case 0:
                                    number = addValueToChart("p_purchased", k, j, number);
                                    break;
                                case 1:
                                    number = calculateUseAsset(k, j, number);
                                    break;
                                case 2:
                                    number = addValueToChart("p_disposed", k, j, number);
                                    break;
                                case 3:
                                    number = addValueToChart("p_warranty", k, j, number);
                                    break;
                                case 4:
                                    number = addValueToChart("p_lifespan", k, j, number);
                                    break;
                            }
                        }
                        seriesData.push(number);
                    }
                    $scope.data.push(seriesData);
                }
            }
        });
    };

    //The chart is calculated using the labels and series below.
    $scope.labels = ["Computer", "Phone", "Screen", "Printer", "License"];
    $scope.series = ['Purchased', 'Being Used', "Disposed", "Expiring Warranty", "Expiring Lifespan"];
    $scope.data = [];
    $scope.years = [];

    $scope.createChart();

    //To set the default year as the first option, angular is really weird with showing a blank option if no default one is given.
    $scope.currentYear = $scope.years[2];
}]);
