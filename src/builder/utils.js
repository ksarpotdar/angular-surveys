angular.module('mwFormBuilder')
        .service('mwFormUuid', function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                        .toString(16)
                        .substring(1);
            }
            this.get = function () {
                return s4() + s4() + s4() + s4() + s4() + s4() + s4() + s4();


            };
        }).factory('mwFormClone', ["mwFormUuid", function (mwFormUuid) {
        var service = {};
        var checkedObjects = [];
        function resetIds(obj, root) {
            if (root) {
                checkedObjects = [];
            }
            if (checkedObjects.indexOf(obj) >= 0) {
                return;
            }
            checkedObjects.push(obj);
            if (!obj === Object(obj)) {
                return;
            }

            if (Array.isArray(obj)) {
                obj.forEach(resetIds);
                return;
            }

            for (var property in obj) {
                if (obj.hasOwnProperty(property)) {
                    resetIds(obj[property]);
                }
            }

            if (obj.hasOwnProperty('id')) {
                var newId = mwFormUuid.get();
                var oldId = obj.id;
                obj.id = newId;
            }

        }
        service.cloneElement = function (pageElement) {
            var element = {};
            angular.copy(pageElement, element);
            resetIds(element, true);
            return element;
        };

        service.cloneElements = function (elements) {
            var _elements = [];
            if (Array.isArray(elements)) {
                for (var i = 0; i < elements.length; i++) {
                    _elements.push(service.cloneElement(elements[i]));
                }

            }
            return _elements;
        };
        
        return service;

    }]);

/*    .factory('CollectionsUtil', function(){
 return{
 replaceByEqualObject: function(collection, referenceObjects, equalFn){
 return _.map(collection, function(element){
 var foundRefObj = _.find(referenceObjects, function(refObj){
 if(equalFn){
 return equalFn(element, refObj);
 }else{
 return _.isEqual(element, refObj);
 }
 });
 if(foundRefObj){
 return foundRefObj;
 }else{
 return element;
 }
 });
 },
 isNotEmptyArray: function(object){
 return object && $.isArray(object) && object.length > 0;
 }
 }
 });*/
