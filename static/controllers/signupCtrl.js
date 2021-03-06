emcPingApp.controller('signupCtrl', function($scope,$location,$route,searchService, loginService, $rootScope, $http){

    $scope.areStringsEqual = function(password, confirmpassword){
        if(password==confirmpassword){
            console.log(loginService.getToken());
            return true;
        }
        else{
            return false;
        }
    };

    $scope.submit = function(){
        $http.post('http://localhost:3000/api/users/signup', $scope.formData)
            .then(function(data){
                console.log("Successful signup");
                $scope.message = "Signup successful";
                loginService.setToken(data.data.token);
                    $scope.recentQuest();
            },
        function(response){
            console.log("Signup failed");
            $scope.message = "Username already exists. Use a different username.";
        });
    };

    $scope.recentQuest = function(){
        $http.get('http://localhost:3000/api/questions')
            .then(function(response){
                    console.log("Got recent questions");
                    searchService.setsearchResults(response.data);
                    $location.path('/searchQuestion');
                    $route.reload();
                },
                function(response){
                    console.log("Could not get recent questions");
                    $scope.message = response.data.error;
                });
    };

});