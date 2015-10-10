angular.module('myApp').controller('inventoryController', ['$scope','$location', '$http', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', 'ModelFactory', 'ModelProductFactory', 'MpsviewFactory', function($scope, $location, $http, ProductFactory, StaffFactory, StaffProductFactory, ModelFactory, ModelProductFactory, MpsviewFactory) {

    $scope.currentDate = Date.parse(new Date());
    $scope.calculateDate = function(date) {
        if(Date.parse(date) < $scope.currentDate)
            return true;
        return false;
    };

    $scope.setProduct = function(productId) {
        ProductFactory.get({productId: productId}, function(data) {
            $scope.productComment = data;
        });
    }

    $scope.comment = function() {
        ProductFactory.update({productId: $scope.productComment.productId},$scope.productComment, function() {
            getDatabase();
            $('#commentModal').modal('hide');
        });
    }

    $scope.dispose = function(productId) {
        $http.put("/api/product/dispose/" + productId).then(function(response) {
            StaffProductFactory.delete({productId: productId}, function() {
                getDatabase();
            });
        });
    }

    function getOwner(productId) {
        $http.get("/api/mpsview/product/" + productId).then(function(response) {
            item.staff = response.data.s_name;
            item.staffId = response.data.s_id;
        });
    }

    function getDatabase() {
        var getAllMpviewsPromise = $http.get("/api/mpview");
        var getAllMpsviewsPromise = getAllMpviewsPromise.then(function(response) {
            if(response.status == 200) {
                //Save all products
                $scope.inventory = response.data;
                $scope.disposed = [];

                for(var i = $scope.inventory.length -1; i >= 0; i--) {
                    if($scope.inventory[i].status === "Disposed") {
                        var data = $scope.inventory.splice(i, 1);
                        $scope.disposed.push(data[0]);
                    }
                }

                $http.get("/api/mpsview").then(function(response) {
                    $scope.ownedInv = response.data;
                    //console.log($scope.inventory);
                    for(var i = 0; i < $scope.inventory.length; i++) {
                        if($scope.inventory[i].status === "Owned") {
                            //If a product is "Owned" then they get assigned their owner.
                            for(var j = 0; j < $scope.ownedInv.length; j++) {
                                if($scope.inventory[i].productId === $scope.ownedInv[j].p_id) {
                                    $scope.inventory[i].staff = $scope.ownedInv[j].s_name;
                                    $scope.inventory[i].staffId = $scope.ownedInv[j].s_id;
                                }
                            }
                        }
                    }
                });
            } else {
                alert("Error");
            }
        });
    }

    getDatabase();
    document.getElementById("inp1").focus();
    $scope.sortField = 'name';
    $scope.reverse = true;
    $scope.show = true;
    $scope.confirm = false;
}]);
