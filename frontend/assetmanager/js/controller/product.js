angular.module('myApp').controller('productController', ['$scope','$location', '$http', '$timeout', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', 'ModelFactory', 'ModelProductFactory', function($scope, $location, $http, $timeout, ProductFactory, StaffFactory, StaffProductFactory, ModelFactory, ModelProductFactory) {

    document.getElementById("inp1").focus();

    $scope.types = ["Computer", "Screen", "Phone", "Printer", "License"];
    $scope.type = $scope.types[0];
    $scope.staffmembers = [];

    //To store the chosen staff
    $scope.staff = {selected: {"staffId":-1,"name":"Storage"}};

    //Get all the staffmembers from database
    StaffFactory.query(function(data) {
        $scope.staffmembers = data;
    });

    $scope.switchFocus = function(keyEvent) {
        if (keyEvent.which === 13) {

            var focused = document.activeElement.id;
            if(focused == 'inp1') {
                keyEvent.preventDefault();
                document.getElementById("inp2").focus();
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
        alert(futureDateFormatted);
        return futureDateFormatted;
    }

    $scope.addproduct = function(id) {
        $scope.resultOfQueryF = null;
        $scope.resultOfQueryS = null;

        $http.get('/api/model/productnr/' + window.encodeURIComponent($scope.m_productNr))
        .then(function(response) {
            if(response.status == 200) {
                $scope.model = response.data;
                $scope.status = "Stored";
                if(id != -1) {
                    $scope.status = "Owned"
                }

                var product = {
                    'serialNr' : $scope.serialNr,
                    'status' : $scope.status,
                    'p_productNr' : response.data.m_productNr,
                    'p_warranty' : $scope.formatDate(response.data.m_warranty),
                    'p_lifespan' : $scope.formatDate(response.data.m_lifespan),
                    'comment': ''
                };

                if(id != -1) {
                    ProductFactory.save(product, function() {
                        $http.get('/api/product/lastinserted').
                        then(function(response) {
                            $scope.lp = response.data;
                            var modelproduct = {
                                'modelId': $scope.model.modelId,
                                'productId': $scope.lp.productId,
                            }

                            var staffproduct = {
                                'productId': $scope.lp.productId,
                                'staffId': id,
                            }
                            StaffProductFactory.save(staffproduct);
                            ModelProductFactory.save(modelproduct);
                        });
                    });
                } else {
                    ProductFactory.save(product, function() {
                        $http.get('/api/product/lastinserted').
                        then(function(response) {
                            $scope.lp = response.data;
                            var modelproduct = {
                                'modelId': $scope.model.modelId,
                                'productId': $scope.lp.productId,
                            }
                            ModelProductFactory.save(modelproduct);
                        });
                    });
                }

                //Success
                $scope.serialNr = "";
                $scope.m_productNr = "";
                $scope.resultOfQueryS = true;
                document.getElementById("inp1").focus();
            } else {
                //Failure
                $scope.modelNotFound = true;
            }
        });
    };
}]);
