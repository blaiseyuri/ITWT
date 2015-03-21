'use strict'

angular.module 'itwtApp'
.controller 'MainCtrl', ($scope, $http) ->
  $scope.awesomeThings = []

  $http.get('/api/things').success (awesomeThings) ->
    $scope.awesomeThings = awesomeThings
  $scope.shirt = {}

  $scope.addShirt = (daShirt) ->
    console.log daShirt
    $http.post('/api/clothes/shirts', daShirt).success (awesomeThings) ->
      console.log awesomeThings

  $scope.picturePass = (pic)->
    $http.post('/uploads', pic).success (awesomeThings) ->
      console.log awesomeThings
  

  $scope.addThing = ->
    return if $scope.newThing is ''
    $http.post '/api/things',
      name: $scope.newThing

    $scope.newThing = ''

  $scope.deleteThing = (thing) ->
    $http.delete '/api/things/' + thing._id
