angular.module('myApp').controller('modelController', ['$scope', '$http', '$timeout', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', function($scope, $http, $timeout, ProductFactory, StaffFactory, StaffProductFactory) {

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
            $scope.status = 'storage';

            if($scope.assignasset === true) {
                $scope.status = 'owned';
            }

            //Create an array of the new record
            var product = {
                'serialNr' : $scope.serialNr,
                'productNr' : $scope.productNr,
                'productName' : $scope.productName,
                'warranty' : $scope.formatDate($scope.warranty),
                'lifespan' : $scope.formatDate($scope.lifespan),
                'status' : $scope.status,
                'type' : $scope.type,
            };

            //Add new record of product
            if($scope.assignasset === true) {
                ProductFactory.save(product, function() {
                    $http.get('/api/product/lastinserted').
                    then(function(response) {
                        $scope.ab = response.data;
                        var staffproduct = {
                            'productId': $scope.ab.productId,
                            'staffId': $scope.staff.staffId,
                        }
                        StaffProductFactory.save(staffproduct);
                    });
                });
            } else {
                ProductFactory.save(product);
            }


            //Set success output
            $scope.resultOfQueryS = true;
        } else {
            //Set fail output
            $scope.resultOfQueryF = true;
        }
    };
}]);
