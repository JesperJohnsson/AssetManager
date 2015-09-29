angular.module('myApp').controller('modelController', ['$scope', '$http', '$timeout', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', 'ModelFactory', function($scope, $http, $timeout, ProductFactory, StaffFactory, StaffProductFactory, ModelFactory) {

    document.getElementById("inp1").focus();

    //The different types an asset can have.
    $scope.types = ["Computer", "Screen", "Phone", "Printer", "License"];
    $scope.type = $scope.types[0];
    $scope.ab = {};
    $scope.staffmembers = [];

    //To hide the last select element //Assign asset to Staff
    $scope.assignasset = false;

    //To store the chosen staff
    $scope.staff = {selected: {"staffId":-1,"name":"Storage"}};

    //Get all the staffmembers from database
    StaffFactory.query(function(data) {
        $scope.staffmembers = data;
    });

    $scope.switchFocus = function(keyEvent) {
        if (keyEvent.which === 13) {
            keyEvent.preventDefault();
            var focused = document.activeElement.id;
            if(focused == 'inp1') {
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
                document.getElementById("inp2").focus();
            }
        }
    };

    $scope.submit = function() {
        $scope.resultOfQueryF = null;
        $scope.resultOfQueryS = null;

        if($scope.productName && $scope.productNr && $scope.warranty && $scope.lifespan) {

            //Create an array of the new record
            var model = {
                'name': $scope.productName,
                'type': $scope.type,
                'm_productNr': $scope.productNr,
                'm_warranty': $scope.warranty,
                'm_lifespan': $scope.lifespan
            };

            ModelFactory.save(model);

            $scope.productName = "";
            $scope.productNr = "";
            $scope.warranty = "";
            $scope.lifespan = "";
            $scope.searchdata = [];

            document.getElementById("inp1").focus();


            //Set success output
            $scope.resultOfQueryS = true;
        } else {
            //Set fail output
            $scope.resultOfQueryF = true;
        }
    };
}]);
