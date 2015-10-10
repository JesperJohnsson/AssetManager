angular.module('myApp').controller('productController', ['$scope', '$http', '$timeout', '$parse', '$filter', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', 'ModelFactory', 'ModelProductFactory', function($scope, $http, $timeout, $parse, $filter, ProductFactory, StaffFactory, StaffProductFactory, ModelFactory, ModelProductFactory) {

    function fadeMessages(string_variable, value) {
        var model = $parse(string_variable);
        $timeout(function(){model.assign($scope, value);}, 7000);
    }

    $scope.setProductNr = function(productNr) {
        $scope.m_productNr = productNr;
    }

    $scope.setFocus = function() {
        document.getElementById("inp1").focus();
    }

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
        var currentDate = new Date($scope.purchasedate);
        currentDate.setDate(currentDate.getDate() + 365 * add);
        var yyyy = currentDate.getFullYear();
        var mm = currentDate.getMonth() + 1;
        var dd = currentDate.getDate();
        var futureDateFormatted = yyyy + "-" + mm + "-" + dd;
        return futureDateFormatted;
    };

    function resetVariables() {
        $scope.serialNr = "";
        $scope.m_productNr = "";
        $scope.staff = {selected: {"staffId":-1,"name":"Storage"}};
        $scope.setFocus();
    }

    $scope.addproduct = function(id) {
        $http.get('/api/model/productnr/' + window.encodeURIComponent($scope.m_productNr))
        .then(function(response) {
            if(response.status == 200) {
                $scope.model = response.data;
                $scope.status = "Stored";
                if(id != -1) {
                    $scope.status = "Owned"
                }

                //Format the purchase date, because input[date] is really weird with it's formatting...
                if(angular.isUndefined($scope.purchasedate)) {
                    $scope.purchasedate = $filter("date")(Date.now(), 'yyyy-MM-dd');
                } else {
                    $scope.purchasedate = $filter("date")($scope.purchasedate, 'yyyy-MM-dd');
                }

                var product = {
                    'serialNr' : $scope.serialNr,
                    'status' : $scope.status,
                    'p_productNr' : response.data.m_productNr,
                    'p_warranty' : $scope.formatDate(response.data.m_warranty),
                    'p_lifespan' : $scope.formatDate(response.data.m_lifespan),
                    'p_purchased' : $scope.purchasedate,
                    'comment': ''
                };

                ProductFactory.save(product, function() {
                    $http.get('/api/product/lastinserted').
                    then(function(response) {
                        $scope.lp = response.data;

                        var modelproduct = {
                            'modelId': $scope.model.modelId,
                            'productId': $scope.lp.productId,
                        }
                        if(id != -1) {
                            var staffproduct = {
                                'productId': $scope.lp.productId,
                                'staffId': id,
                            }
                            StaffProductFactory.save(staffproduct);
                            //Assigned message
                            $scope.assigned = true;

                        }
                        ModelProductFactory.save(modelproduct);
                    });
                });
                //Success
                resetVariables();
                $scope.success = true;
                fadeMessages("success", null);
            } else {
                //Failure
                $scope.error = true;
                fadeMessages("error", null);
            }
        });
    };

    $scope.setFocus();
    $scope.staffmembers = [];
    $scope.models = [];
    $scope.storage = [];

    //To store the chosen staff
    $scope.staff = {selected: {"staffId":-1,"name":"Storage"}};
    $scope.item = {};
    $scope.model = {};

    $scope.purchasedate = $filter("date")(Date.now(), 'yyyy-MM-dd');

    //Get all the staffmembers from database
    StaffFactory.query(function(data) {
        $scope.staffmembers = data;
        $scope.staffmembers.unshift({"staffId":-1,"name":"Storage"});
    });

    ModelFactory.query(function(data) {
        $scope.models = data;
    });
}]);

angular.module('myApp').controller('editproductController', ['$scope', '$http', '$timeout', '$parse', '$filter', 'ProductFactory', 'ModelFactory', 'ModelProductFactory', 'MpviewFactory', function($scope, $http, $timeout, $parse, $filter, ProductFactory, ModelFactory, ModelProductFactory, MpviewFactory) {

    function fadeMessages(string_variable, value) {
        var model = $parse(string_variable);
        $timeout(function(){model.assign($scope, value);}, 7000);
    }


    //resetVariables
    function resetVariables() {
        $scope.product = {}
        $scope.products = [];
        $scope.producttoedit = {};
        $scope.purchasedate = $filter("date")(Date.now(), 'yyyy-MM-dd');

        $scope.model = {};
        $scope.models = [];
        $scope.productNr = "";
    }

    //Get all information from database
    function getFromDatabase() {
        //Get all the staffmembers from the database
        MpviewFactory.query(function(data) {
            $scope.products = data;
        });

        //Get all the Models from the database
        ModelFactory.query(function(data) {
            $scope.models = data;
        });
    }

    //Function for setting the productNr inside the html document.
    $scope.setProductNr = function(productNr) {
        $scope.productNr = productNr;
    };

    $scope.formatDate = function(add) {
        var currentDate = new Date($scope.purchasedate);
        currentDate.setDate(currentDate.getDate() + 365 * add);
        var yyyy = currentDate.getFullYear();
        var mm = currentDate.getMonth() + 1;
        var dd = currentDate.getDate();
        var futureDateFormatted = yyyy + "-" + mm + "-" + dd;
        return futureDateFormatted;
    };

    //Submit function
    $scope.editproduct = function() {
        //Checks if there's a product selected
        if(angular.isDefined($scope.product.selected)) {
            $http.get('/api/model/productnr/' + window.encodeURIComponent($scope.productNr))
            .then(function(response) {
                //Http response is OK
                if(response.status == 200) {

                    //Format the purchase date, because input[date] is really weird with it's formatting...
                    if(angular.isUndefined($scope.purchasedate)) {
                        $scope.purchasedate = $filter("date")(Date.now(), 'yyyy-MM-dd');
                    } else {
                        $scope.purchasedate = $filter("date")($scope.product.selected.p_purchased, 'yyyy-MM-dd');
                    }

                    //Create productvariable
                    $scope.producttoedit = {
                        'productId' : $scope.product.selected.productId,
                        'serialNr' : $scope.product.selected.serialNr,
                        'status' : $scope.product.selected.status,
                        'p_productNr' : $scope.productNr,
                        'p_warranty' : $scope.formatDate(response.data.m_warranty),
                        'p_lifespan' : $scope.formatDate(response.data.m_lifespan),
                        'p_purchased' : $scope.purchasedate,
                        'comment': $scope.product.selected.comment
                    };
                    //Update the product in the database
                    ProductFactory.update({productId: $scope.product.selected.productId}, $scope.producttoedit, function() {
                        //ModelProductFactory.update() ?, fungerar inte.

                        //After the product is updated, delete the old ModelProduct
                        ModelProductFactory.delete({productId: $scope.product.selected.productId});
                        var modelproduct = {
                            'modelId': response.data.modelId,
                            'productId': $scope.product.selected.productId,
                        }
                        //Save the new modelproduct with the correct relationships.
                        ModelProductFactory.save(modelproduct, function() {
                            //Update view when modelproduct is saved
                            getFromDatabase();
                        });

                        //Reset the form
                        resetVariables();

                        //Success message
                        $scope.success = true;
                        fadeMessages("success", null);
                    });
                } else {
                    //Model not found error message
                    $scope.modelNotFound = true;
                    fadeMessages("modelNotFound", null);
                }
            });
        } else {
            //No product selected error message.
            $scope.noproductSelected = true;
            fadeMessages("noproductSelected", null);
        }
    };

    //Init variables
    $scope.product = {}
    $scope.products = [];
    $scope.producttoedit = {};

    $scope.purchasedate = $filter("date")(Date.now(), 'yyyy-MM-dd');

    $scope.model = {};
    $scope.models = [];

    getFromDatabase();
}]);

angular.module('myApp').controller('removeproductController', ['$scope', '$http', '$timeout', '$parse', 'ProductFactory', 'StaffProductFactory', 'ModelProductFactory', 'MpviewFactory', function($scope, $http, $timeout, $parse, ProductFactory, StaffProductFactory, ModelProductFactory, MpviewFactory) {

    function fadeMessages(string_variable, value) {
        var model = $parse(string_variable);
        $timeout(function(){model.assign($scope, value);}, 7000);
    }

    //resetVariables
    function resetVariables() {
        $scope.product = {}
        $scope.products = [];
    }

    //Get all information from database
    function getFromDatabase() {
        //Get all the staffmembers from the database
        MpviewFactory.query(function(data) {
            $scope.products = data;
        });
    }

    function remove(productId) {
        //Remove the selected product
        ModelProductFactory.delete({productId: productId}, function() {
            ProductFactory.delete({productId: productId}, function() {
                $scope.success = true;
                resetVariables();
                getFromDatabase();
            });
        })
    }

    //Submit function
    $scope.removeproduct = function() {
        //Checks if there's a product selected
        if(angular.isDefined($scope.product.selected)) {
            if($scope.confirm !== null) {
                ProductFactory.delete({productId: $scope.product.selected.productId}, function() {
                    $scope.success = true;
                    fadeMessages("success", null);
                    $scope.confirm = null;
                    resetVariables();
                    getFromDatabase();
                });
            } else {
                $scope.notconfirmed = true;
                fadeMessages("notconfirmed", null);
            }
        } else {
            //No product selected error message.
            $scope.noproductSelected = true;
            fadeMessages("noproductSelected", null);
        }
    };

    //Init variables
    $scope.product = {}
    $scope.products = [];

    getFromDatabase();
}]);
