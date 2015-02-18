
'use strict';

//Each module should practically go into separate files 

angular.module('app',['ngRoute','ngAnimate'])
    .config(['$routeProvider',function($routeProvider){
        $routeProvider
        .when('/friends', {
            templateUrl: 'partials/friends.html',
            controller: 'FriendsCtrl as vm'
          })
          .when('/friends/:id', {
            templateUrl: 'partials/friend.html',
            controller: 'FriendCtrl as am'
          })
          .otherwise({redirectTo: "/friends"});
    }])
    
    .controller('FriendsCtrl', ['FriendsAPI', function(FriendsAPI){
        var vm = this;
        vm.friends = [];
        FriendsAPI.getFriends().then(function(response){
            vm.friends = response;
        });
        vm.removeFriend = function(id){
            FriendsAPI.removeFriend(id).then(function(response){
                vm.friends = response;
            });
        }
    }])
    
    .controller('FriendCtrl', ['FriendsAPI', function(FriendsAPI){
        var am = this;
        am.friend = {};
        FriendsAPI.getFriend().then(function(response){
            am.friend = response;
        });

    }])
    
    .factory('FriendsAPI', ['$http', '$q', function($http, $q){
        var friends = [{
                    id: 1,
                    img: 'http://marquonslhistoire.com/workspace/uploads/slides/layers/03-player-fr-1421336804.png',
                    name: "Nani",
                    address: "603 Causley Ave., Dallas, TX",
                    status: "This life is awesomely great!!",
                    available: true
                },
                {
                    id: 2,
                    img: 'http://marquonslhistoire.com/workspace/uploads/slides/layers/05-piatti-sm-fr-1421283172.png',
                    name: "Mallam",
                    address: "604 Causley Ave., Dallas, TX",
                    status: "This life is awesomely great!!",
                    available: false
                }];
        var getFriends = function() {
            return $q.when(friends);
        };
        var getFriend = function(id){
            var friend = {
                id: 1,
                img: 'http://marquonslhistoire.com/workspace/uploads/slides/layers/03-player-fr-1421336804.png',
                name: "Nani",
                phone: "(920)-664-4444",
                address: "603 Causley Ave., Dallas, TX",
                status: "This life is awesome",
                available: true,
                bio: 'By emphasising aesthetics, seduces the viewer into a world of ongoing equilibrium and the interval that articulates the stream of daily events. Moments are depicted that only exist to punctuate the human drama in order to clarify our existence and to find poetic meaning in everyday life.His sometimes radiate a cold and latent violence. At times, disconcerting beauty emerges. The inherent visual seductiveness, along with the conciseness of the exhibitions, further complicates the reception of their manifold layers of meaning.'
            }
            return $q.when(friend);
        };
        var removeFriend = function(id){
            var friendsList = friends;
                for(var i = 0; i <= friendsList.length; i++){
                    if(friends[i].id === id){
                        friends.splice(i, 1);
                    }
                }
            return $q.when(friends);  
        };
        
        return {
            getFriends: getFriends,
            getFriend: getFriend,
            removeFriend: removeFriend
        }
    }])
    
    .filter("availability", [function(){
        return function(input){
            if(input)
                return "Available"
            else
                return "Not Available"
        }
    }])
