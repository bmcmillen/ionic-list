angular.module('starter.controllers', [])


.controller('ListCtrl', function($scope, $ionicListDelegate) {
    var items = [
        {name:'Eggs'},
        {name:'Bread'},
        {name:'Crack'}
    ];
    $scope.newItem = {name:''};
    $scope.items = items;

    $scope.addItem = function() {
        console.log('addItem()\t %o', $scope.newItem);
        $scope.items.push($scope.newItem);
        $scope.newItem = {};
    };

    $scope.removeItem = function(item) {
        console.log('removeItem()\t %o', item);
        var index = items.indexOf(item); //define index
        items.splice(index,1);          //splice at (item, position)
    };

    $scope.reserveItem = function(item) {
        console.log('reserveItem()\t %o', item);
        item.reserved = true;
        $ionicListDelegate.closeOptionButtons()
;
    };
})
