/// <reference path="../typings/angularjs/angular.d.ts"/>
var app = angular.module('debts', ['uiGmapgoogle-maps']);


app.controller('firstController', function ($scope, $http, $location) {
    $scope.model = {};

    $http.get("https://debtsforme.herokuapp.com/all").success(function (data) {
        console.log(data);
        $scope.model.items = data;

        $scope.find = function (actiontext) {
            $http.get("http://localhost:4000/id/" + actiontext).success(function (data) {
                console.log(data);
                model.items = data;
            });
        };

        $scope.miss = function () {
            $http.get("http://localhost:4000/miss/0").success(function (data) {
                console.log(data);
                model.items = data;
            });
        };
        $scope.avail = function () {
            $http.get("http://localhost:4000/miss/1").success(function (data) {
                console.log(data);
                model.items = data;
            });
        };
        $scope.all = function () {
            $http.get("http://localhost:4000/all").success(function (data) {
                console.log(data);
                model.items = data;
            });
        };

    });
    
    $scope.goToDebtForm = function () {
        location.href = 'debt.html';
    };
    
    $scope.goToDebt = function (name) {
       window.location.href = 'debt.html?name=' + encodeURIComponent(name);
    };
    
    $scope.debtsSum = function () {
        var temp = 0;
        angular.forEach($scope.model.items, function (item) {
            temp += item.debt;
            console.log("item.debt");
        });
        return temp;
    };


});

app.controller('debtController', function DebtController ($scope, $http, $location) {
    var dirtyMap = false;
    var nameResult = window.location.href.split('name=')[1];
    $scope.debt = {}; 
    
    if (nameResult) {
        $http.get('https://debtsforme.herokuapp.com/id/' + nameResult)
        .success(function (res) {
            $scope.debt = res[0];        
        });
    }
    
    
    $scope.currentKey = 1;
    $scope.map = {center: {latitude: 40, longitude: -73}, zoom: 8};
    
    navigator.geolocation.getCurrentPosition(function success(position) {
        $scope.map.center = position.coords;
        dirtyMap = true;
        $scope.currentKey = 2;
    }, function fail(position) {})
    
    $scope.shouldUpdateMap = function () {
        var result = dirtyMap;
        dirtyMap = false;
        return result;
    }
    
    
    
    $scope.saveDebt = function () {
        console.log('debt', $scope.debt);
        var result = $http.post('https://debtsforme.herokuapp.com/debt/save', $scope.debt);
        
        result.success(function () {
           location.href = 'index.html'; 
        });
        
        result.error(function (err) {
            console.log(err);
        });
    }; 
});
