angular.module('myApp').controller('productController', ['$scope','$location', '$http', '$timeout', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', 'ModelFactory', 'ModelProductFactory', 'MpsviewFactory', function($scope, $location, $http, $timeout, ProductFactory, StaffFactory, StaffProductFactory, ModelFactory, ModelProductFactory, MpsviewFactory) {

    document.getElementById("inp1").focus();
    $scope.staffmembers = [];
    $scope.storage = [];

    //To store the chosen staff
    $scope.staff = {selected: {"staffId":-1,"name":"Storage"}};
    $scope.item = {};

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

/*angular.module('myApp').controller('assignproductController', ['$scope','$location', '$http', '$timeout', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', 'ModelFactory', 'ModelProductFactory', 'MpsviewFactory', function($scope, $location, $http, $timeout, ProductFactory, StaffFactory, StaffProductFactory, ModelFactory, ModelProductFactory, MpsviewFactory) {
    //Init
    $scope.staffmembers = [];
    $scope.storage = [];
    $scope.staff = {};
    $scope.item = {};
    $scope.p = {};

    //Get all the staffmembers
    StaffFactory.query(function(data) {
        $scope.staffmembers = data;
    });

    //Get all stored products
    $http.get('/api/mpview/storage')
    .then(function(response) {
        $scope.storage = response.data;
    });

    //Function called in product.html by the second form
    $scope.assignproduct = function(staffId, productId) {
        if(!angular.isUndefined(staffId) && !angular.isUndefined(productId)) {
            //Assign product
            var staffproduct = {
                'productId': productId,
                'staffId': staffId,
            }
            StaffProductFactory.save(staffproduct, function() {
                //Update status
                ProductFactory.get({productId: productId}, function(data) {
                    $scope.p = data;
                    if($scope.p.status == "Stored") {
                        $scope.p.status = 'Owned';
                        ProductFactory.update({productId:productId}, $scope.p);

                        //Success message
                        $scope.success = true;
                    } else {
                        $scope.error = true;
                    }
                })
            });
        } else {
            //Error message
            $scope.error = true;
        }

    };
}]);*/
