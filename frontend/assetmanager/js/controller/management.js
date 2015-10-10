angular.module('myApp').controller('managementController', ['$scope', '$http', '$timeout', '$parse', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', 'ModelFactory', 'ModelProductFactory', 'MpsviewFactory', function($scope, $http, $timeout, $parse, ProductFactory, StaffFactory, StaffProductFactory, ModelFactory, ModelProductFactory, MpsviewFactory) {

    function fadeMessages(string_variable, value) {
        var model = $parse(string_variable);
        $timeout(function(){model.assign($scope, value);}, 7000);
    }

    //Get all stored products
    $scope.getStorage = function() {
        $http.get('/api/mpview/storage')
        .then(function(response) {
            $scope.storage = response.data;
        });
    };

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
                        $scope.assigned = true;
                        fadeMessages("assigned", null);
                    } else {
                        $scope.error = true;
                        fadeMessages("error", null);
                    }
                })
            });
        } else {
            //Error message
            $scope.error = true;
            fadeMessages("error", null);
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
                        $scope.unassigned = true;
                        fadeMessages("unassigned", null);
                    } else {
                        $scope.error = true;
                        fadeMessages("error", null);
                    }
                })
            });
        } else {
            //Error message
            $scope.error = true;
            fadeMessages("error", null);
        }
    };


    //Init
    $scope.staffmembers = [];
    $scope.storage = [];
    $scope.personalStorage = [];
    $scope.staff = {};
    $scope.item = {};
    $scope.p = {};
    $scope.add = false;
    $scope.getStorage();

    //Get all the staffmembers
    StaffFactory.query(function(data) {
        $scope.staffmembers = data;
    });


}]);
