var myApp=angular.module("myApp",[]);

myApp.controller("myController",function($scope,$http){
  $scope.phone='';
  $scope.name='';

    
	
	$http({
          "url":"https://kisannetapp.herokuapp.com/GetContactList",
          "method":"POST"
        }).then(function (response) {
          console.log();
		$scope.contactsList=response.data
        })

    $scope.getFileData=function () {
     $http({
          "url":"https://kisannetapp.herokuapp.com/GetContactList",
          "method":"POST"
        }).then(function (response) {
          console.log();
		$scope.contactsList=response.data
        })
    }
    $scope.GetReport=function() {
      $scope.getFileData();
    }


    $scope.checkDuplicate=function(mobileNumber) {
      $scope.contactsList.forEach(function(obj) {
        if(obj.phone===("+91"+mobileNumber)){
          $("#duplicateNumber").show();
          $("#duplicateNumber").text('DUPLICATE NUMBER');
          $("#createContact").attr("disabled","true");
        }
      })
    }
    $scope.validate=function (mobileNumber) {
      $scope.checkLength(mobileNumber);
      $scope.checkDuplicate(mobileNumber);
    }
    $scope.checkLength=function (mobileNumber) {
      $("#duplicateNumber").hide();
      var warning=$("#duplicateNumber").val();
      console.log(warning);
      if(mobileNumber.toString().length==10){
        $("#createContact").removeAttr("disabled");
      }
      else{
        $("#createContact").attr("disabled","true");
      }
    }
    //if($scope.addUser.phone.length>)
    $scope.AddContact=function (obj) {

      console.log(obj);
      /** Add User **/
        var params=obj;
        console.log(params)
        $http({
          "url":"https://kisannetapp.herokuapp.com/AddJSONData",
          "method":"POST",
          "params":params
        }).then(function (response) {
            $scope.getFileData();
        })
    }
    $scope.getModal=function (item) {
      var OTP=Math.floor(100000 + Math.random() * 900000);
      $scope.user=item;
      $scope.user.OTP=OTP;
      console.log("user",$scope.user);
    }
    $scope.sendOTP=function (rowData) {
      var params=rowData;
      console.log(params)
      $http({
        "url":"https://kisannetapp.herokuapp.com/sendOTP",
        "method":"POST",
        "params":params
      }).then(function (response) {
        console.log(response.data);
          $scope.contactsList=response.data;
      })
    }


})
