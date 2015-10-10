angular.module('myApp').controller('stafflistController', ['$scope', '$http', '$location', '$timeout', '$parse', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', 'ModelFactory', 'ModelProductFactory', 'MpsviewFactory', function($scope, $http, $location, $timeout, $parse, ProductFactory, StaffFactory, StaffProductFactory, ModelFactory, ModelProductFactory, MpsviewFactory) {

    function fadeMessages(string_variable, value) {
        var model = $parse(string_variable);
        $timeout(function(){model.assign($scope, value);}, 7000);
    }

    function getDatabase() {
        StaffFactory.query(function(data) {
            $scope.staffs = data;
        });
    }

    $scope.staffpage = function(id) {
        $location.path("/stafflist/" + id);
    };

    $scope.setSelectedStaff = function(id) {
        StaffFactory.get({staffId: id}, function(data) {
            $scope.selectedStaff = data;
        });
    };

    $scope.addStaff = function() {
        if(angular.isDefined($scope.name)) {

            var staff = {
                'name' : $scope.name,
            }

            StaffFactory.save(staff, function() {
                getDatabase();
                $('#addStaffModal').modal('hide');
                $scope.name = "";
            });
        }
    }

    $scope.editStaff = function() {
        if(angular.isDefined($scope.selectedStaff) && $scope.selectedStaff.name !== "") {
            //Submit form
            var staff = {
                'name' : $scope.selectedStaff.name
            };

            StaffFactory.update({staffId: $scope.selectedStaff.staffId}, staff, function() {
                getDatabase();
                $('#editStaffModal').modal('hide');
            });

        } else {
            alert("Error when trying to edit staff");
        }
    };

    $scope.removeStaff = function(id) {
        //Can't use setSelectedStaff because the chaining will not work.
        StaffFactory.get({staffId: id}, function(data) {
            var selectedStaff = data;
            if(angular.isDefined(selectedStaff)) {
                var getPersonalStorage = $http.get('/api/mpsview/staff/' + selectedStaff.staffId);

                removeStaffPromise = getPersonalStorage.then(function(response) {
                    var personalStorage = response.data;
                    for(var i = 0; i < personalStorage.length; i++) {
                        var product = {
                            'serialNr' : personalStorage[i].p_serialNr,
                            'status' : 'Stored',
                            'p_productNr' : personalStorage[i].m_productNr,
                            'p_warranty' : personalStorage[i].p_warranty,
                            'p_lifespan' : personalStorage[i].p_lifespan,
                            'comment': personalStorage[i].p_comment
                        };
                        ProductFactory.update({productId:personalStorage[i].p_id}, product);
                    }
                });

                removeStaffPromise.then(function() {
                    StaffFactory.delete({staffId: selectedStaff.staffId}, function() {
                        getDatabase();
                        $scope.success = true;
                        fadeMessages("success", null);
                    });
                });
            } else {
                alert("Error when trying to remove staff");
            }
        });
    };

    $scope.sortField = 'staffId';
    $scope.reverse = false;
    $scope.confirm = false;
    $scope.staffs = [];
    getDatabase();
}]);

angular.module('myApp').controller('staffpageController', ['$scope','$routeParams', '$http', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', 'ModelFactory', 'ModelProductFactory', 'MpsviewFactory', function($scope, $routeParams, $http, ProductFactory, StaffFactory, StaffProductFactory, ModelFactory, ModelProductFactory, MpsviewFactory) {

    $scope.staff = [];
    $scope.personalStorage = [];
    $scope.computer = [];
    $scope.screen = [];
    $scope.phone = [];
    $scope.printer = [];
    $scope.license = [];

    $scope.types = ["Computer", "Screen", "Phone", "Printer", "License"];

    getDatabase();

    function getDatabase() {
        StaffFactory.get({staffId: $routeParams.staffId}, function(data) {
            $scope.staff = data;
        });

        $http.get('/api/mpsview/staff/' + $routeParams.staffId)
        .then(function(response) {
            $scope.personalStorage = response.data;
            sortPersonalStorage();
        });
    }

    function sortPersonalStorage() {
        for(var i = 0; i < $scope.personalStorage.length; i++) {
            if($scope.personalStorage[i].p_type === "Computer") {
                $scope.computer.push($scope.personalStorage[i]);
            } else if($scope.personalStorage[i].p_type === "Screen") {
                $scope.screen.push($scope.personalStorage[i]);
            } else if($scope.personalStorage[i].p_type === "Phone") {
                $scope.phone.push($scope.personalStorage[i]);
            } else if($scope.personalStorage[i].p_type === "Printer") {
                $scope.printer.push($scope.personalStorage[i]);
            } else if($scope.personalStorage[i].p_type === "License") {
                $scope.license.push($scope.personalStorage[i]);
            }
        }

        $scope.sortedPersonalStorage = {
            'type' : [
                {
                    'name' : 'Computer',
                    'data' : $scope.computer
                },
                {
                    'name' : 'Screen',
                    'data' : $scope.screen
                },
                {
                    'name' : 'Phone',
                    'data' : $scope.phone
                },
                {
                    'name' : 'Printer',
                    'data' : $scope.printer
                },
                {
                    'name' : 'License',
                    'data' : $scope.license
                }
            ]
        };
    }
}]);
