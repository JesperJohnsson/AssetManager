//Factories
angular.module('myApp').factory("ProductFactory", function($resource) {
    return $resource("/api/product/:productId", {}, {
        update: { method: "PUT" }
    });
});

angular.module('myApp').factory("StaffFactory", function($resource) {
    return $resource("/api/staff/:staffId", {}, {
        update: { method: "PUT" }
    });
});

angular.module('myApp').factory("StaffProductFactory", function($resource) {
    return $resource("/api/staffproduct/:productId", {}, {
        update: { method: "PUT" }
    });
});

angular.module('myApp').factory("ModelFactory", function($resource) {
    return $resource("/api/model/:modelId", {}, {
        update: { method: "PUT" }
    });
});

angular.module('myApp').factory("ModelProductFactory", function($resource) {
    return $resource("/api/modelproduct/:modelId", {}, {
        update: { method: "PUT" }
    });
});

angular.module('myApp').factory("MpviewFactory", function($resource) {
    return $resource("/api/mpview/:productId", {}, {});
});

angular.module('myApp').factory("MpsviewFactory", function($resource) {
    return $resource("/api/mpsview/product/:productId", {}, {});
});
