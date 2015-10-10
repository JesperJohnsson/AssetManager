angular.module('myApp').controller('modelController', ['$scope', '$http', '$timeout', '$parse', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', 'ModelFactory', function($scope, $http, $timeout, $parse, ProductFactory, StaffFactory, StaffProductFactory, ModelFactory) {

    function fadeMessages(string_variable, value) {
        var model = $parse(string_variable);
        $timeout(function(){model.assign($scope, value);}, 7000);
    }

    function setFocus() {
        document.getElementById("inp1").focus();
    }

    function resetVariables() {
        $scope.productName = "";
        $scope.productNr = "";
        $scope.warranty = "";
        $scope.lifespan = "";
        $scope.img = "";
        $scope.thumbnail = "";
        $scope.searchdata = [];
        setFocus();
    }

    $scope.setImg = function(imgUrl, thumbUrl) {
        $scope.img = imgUrl;
        $scope.thumbnail = thumbUrl;
    }

    $scope.googleSearch = function(keyEvent) {
        if (keyEvent.which === 13) {
            keyEvent.preventDefault();
            var focused = document.activeElement.id;
            if(focused == 'inp1') {
                //Google search
                $scope.searchTerm2 = 'https://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + window.encodeURIComponent($scope.productNr) + '&callback=JSON_CALLBACK&rsz=8';
                $http({method: 'JSONP', url: $scope.searchTerm2}).
                    then(function(response) {
                      $scope.searchdata = response.data;
                      $scope.productName = $scope.searchdata.responseData.results[0].titleNoFormatting;
                    }, function(response) {
                      $scope.searchdata = response.data || "Request failed";
                  });
                //Google image search
                $scope.searchTerm2 = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + window.encodeURIComponent($scope.productNr) + '&callback=JSON_CALLBACK&rsz=8';
                $http({method: 'JSONP', url: $scope.searchTerm2}).
                  then(function(response) {
                    $scope.searchimages = response.data;
                  }, function(response) {
                    $scope.searchdata = response.data || "Request failed";
                });
                setFocus();
            }
        }
    };

    $scope.addModel = function() {
        $scope.success = null;
        $scope.error = null;

        if($scope.productName && $scope.productNr && $scope.warranty && $scope.lifespan) {

            //Create an array of the new record
            var model = {
                'name': $scope.productName,
                'type': $scope.type,
                'm_productNr': $scope.productNr,
                'm_warranty': $scope.warranty,
                'm_lifespan': $scope.lifespan,
                'm_image': $scope.img,
                'm_tbimage': $scope.thumbnail,
            };

            //Inserts the new record in the database
            ModelFactory.save(model);
            resetVariables();

            //Set success output
            $scope.success = true;
            fadeMessages("success", null);
        } else {
            //Set fail output
            $scope.error = true;
            fadeMessages("error", null);
        }
    };

    //The different types an asset can have.
    $scope.types = ["Computer", "Screen", "Phone", "Printer", "License"];
    $scope.type = $scope.types[0];

}]);

angular.module('myApp').controller('editmodelController', ['$scope', '$http', '$timeout', '$parse', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', 'ModelFactory', function($scope, $http, $timeout, $parse, ProductFactory, StaffFactory, StaffProductFactory, ModelFactory) {

    function fadeMessages(string_variable, value) {
        var model = $parse(string_variable);
        $timeout(function(){model.assign($scope, value);}, 7000);
    }


    function setFocus() {
        document.getElementById("inp1").focus();
    }

    function resetVariables() {
        $scope.productName = "";
        $scope.productNr = "";
        $scope.warranty = "";
        $scope.lifespan = "";
        $scope.img = "";
        $scope.thumbnail = "";
        $scope.searchdata = [];
        $scope.model = {};
        setFocus();
    }

    function getDatabase() {
        ModelFactory.query(function(data) {
            $scope.models = data;
        });
    }

    $scope.setModel = function() {
        if(angular.isDefined($scope.model.selected)) {
            $scope.modelId = $scope.model.selected.modelId;
            $scope.productName = $scope.model.selected.name;
            $scope.productNr = $scope.model.selected.m_productNr;
            $scope.img = $scope.model.selected.m_image;
            $scope.thumbnail = $scope.model.selected.m_tbimage;
            $scope.warranty = $scope.model.selected.m_warranty;
            $scope.lifespan = $scope.model.selected.m_lifespan;
            $scope.type = $scope.model.selected.type;
        }
    }

    $scope.setImg = function(imgUrl, thumbUrl) {
        $scope.img = imgUrl;
        $scope.thumbnail = thumbUrl;
    }

    $scope.googleSearch = function(keyEvent) {
        if (keyEvent.which === 13) {
            keyEvent.preventDefault();
            var focused = document.activeElement.id;
            if(focused == 'inp1') {
                //Google search
                $scope.searchTerm2 = 'https://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + window.encodeURIComponent($scope.productNr) + '&callback=JSON_CALLBACK&rsz=8';
                $http({method: 'JSONP', url: $scope.searchTerm2}).
                    then(function(response) {
                      $scope.searchdata = response.data;
                      $scope.productName = $scope.searchdata.responseData.results[0].titleNoFormatting;
                    }, function(response) {
                      $scope.searchdata = response.data || "Request failed";
                  });
                //Google image search
                $scope.searchTerm2 = 'https://ajax.googleapis.com/ajax/services/search/images?v=1.0&q=' + window.encodeURIComponent($scope.productNr) + '&callback=JSON_CALLBACK&rsz=8';
                $http({method: 'JSONP', url: $scope.searchTerm2}).
                  then(function(response) {
                    $scope.searchimages = response.data;
                  }, function(response) {
                    $scope.searchdata = response.data || "Request failed";
                });
                setFocus();
            }
        }
    };

    $scope.editModel = function() {
        if($scope.productName && $scope.productNr && $scope.warranty && $scope.lifespan) {

            //Create an array of the new record
            var model = {
                'name': $scope.productName,
                'type': $scope.type,
                'm_productNr': $scope.productNr,
                'm_warranty': $scope.warranty,
                'm_lifespan': $scope.lifespan,
                'm_image': $scope.img,
                'm_tbimage': $scope.thumbnail,
            };

            //Inserts the new record in the database
            ModelFactory.update({modelId: $scope.modelId},model, function() {
                resetVariables();
                getDatabase();
                //Set success output
                $scope.success = true;
                fadeMessages("success", null);
            });


        } else {
            //Set fail output
            $scope.error = true;
            fadeMessages("error", null);
        }
    };

    //The different types an asset can have.
    $scope.types = ["Computer", "Screen", "Phone", "Printer", "License"];
    $scope.type = $scope.types[0];
    $scope.models = [];
    $scope.model = {};

    getDatabase();


}]);

angular.module('myApp').controller('removemodelController', ['$scope', '$http', '$timeout', '$parse', 'ProductFactory', 'StaffFactory', 'StaffProductFactory', 'ModelFactory', 'ModelProductFactory', function($scope, $http, $timeout, $parse, ProductFactory, StaffFactory, StaffProductFactory, ModelFactory, ModelProductFactory) {

    function fadeMessages(string_variable, value) {
        var model = $parse(string_variable);
        $timeout(function(){model.assign($scope, value);}, 7000);
    }
    fadeMessages("success", null);

    function getDatabase() {
        ModelFactory.query(function(data) {
            $scope.models = data;
        });
    }

    $scope.removemodel = function() {
        if(angular.isDefined($scope.model.selected)) {
            var doRemoveModel = false;

            var removeProductPromise = $http.get("/api/modelproduct/model/" + $scope.model.selected.modelId);

            var removeModelPromis = removeProductPromise
            .then(function(response) {
                var length = response.data.length;
                if(length !== 0) {
                    for(var i = 0; i < length; i++) {
                        ProductFactory.delete({productId: response.data[i].productId});
                        if(i === length - 1) {
                            doRemoveModel = true;
                        }
                    }
                } else {
                    doRemoveModel = true;
                }
            });

            removeModelPromis.then(function(){
                if(doRemoveModel === true) {
                    ModelFactory.delete({modelId: $scope.model.selected.modelId}, function() {
                        $scope.success = true;
                        fadeMessages("success", null);
                        getDatabase();

                        $scope.models = [];
                        $scope.model = {};
                    });
                }
            });
        } else {
            //Set fail output
            $scope.error = true;
            fadeMessages("error", null);
        }
    };

    $scope.models = [];
    $scope.model = {};
    getDatabase();

}]);
