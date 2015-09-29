angular.module('myApp').controller('substituteController', ['$scope','$location', '$http', '$timeout', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', 'ModelFactory', 'ModelProductFactory', 'MpsviewFactory', function($scope, $location, $http, $timeout, ProductFactory, StaffFactory, StaffProductFactory, ModelFactory, ModelProductFactory, MpsviewFactory) {
    //Init
    $scope.staffmembers = [];
    $scope.storage = [];
    $scope.personalStorage = [];
    $scope.staff = {};
    $scope.item = {};
    $scope.p = {};
    $scope.add = false;

    //Get all the staffmembers
    StaffFactory.query(function(data) {
        $scope.staffmembers = data;
    });

    //Get all stored products
    $scope.getStorage = function() {
        $http.get('/api/mpview/storage')
        .then(function(response) {
            $scope.storage = response.data;
        });
    };
    $scope.getStorage();


    $scope.getPersonalStorage = function(staffId) {
        $http.get('/api/mpsview/staff/' + staffId)
        .then(function(response) {
            $scope.personalStorage = response.data;
        });
        $scope.add = false;
    };

    //Function called in product.html by the second form
    $scope.assign = function(staffId, productId) {
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

                        $scope.getStorage();
                        $scope.getPersonalStorage(staffId);
                        $scope.item = {};

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
    $scope.unassign = function(staffId, productId) {
        if(!angular.isUndefined(staffId) && !angular.isUndefined(productId)) {
            //Assign product
            StaffProductFactory.delete({productId: productId}, function() {
                //Update status
                ProductFactory.get({productId: productId}, function(data) {
                    $scope.p = data;
                    if($scope.p.status == "Owned") {
                        $scope.p.status = 'Stored';
                        ProductFactory.update({productId:productId}, $scope.p);

                        $scope.getStorage();
                        $scope.getPersonalStorage(staffId);

                        //Success message
                        //$scope.success = true;
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
}]);
