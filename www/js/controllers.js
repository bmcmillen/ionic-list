var app = angular.module('ionic-list');
var api = 'http://10.202.1.106:9091/';

app.controller('ListCtrl', function($scope, $ionicListDelegate, $http) {
    // var items = [
    //     {name:'Eggs'},
    //     {name:'Bread'},
    //     {name:'Crack'}
    // ];
    $scope.newItem = {name:''};
    // $scope.items = items;

    function getItems() {                                             //define getItems function
        $http.get(api).then(res => {             //call endpoint and promise function
            console.log(res);
            $scope.items = res.data;                                  //display the data
        });
    }
    getItems();                                                       //access the data from backend

    $scope.addItem = function() {
        $http.post(api, $scope.newItem).then(res => {             //call endpoint and promise function
            console.log(res);
            getItems();
        });
    };

    $scope.removeItem = function(item) {
        console.log('removeItem()\t %o', item);
        var index = $scope.items.indexOf(item); //define index
        $http.post(api + 'delete', {index:index}).then(res => {             //call endpoint and promise function
            console.log(res);
            getItems();
        });
    };

    $scope.reserveItem = function(item) {
        console.log('reserveItem()\t %o', item);
        item.reserved = true;
        $ionicListDelegate.closeOptionButtons();
    };


})
