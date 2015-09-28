var isaac = new Firebase("https://isaacotherrien.firebaseio.com/");

var portfolio = angular.module("portfolio", ["firebase"]);

portfolio.controller("HeaderCtrl", function($scope, $firebaseObject){
	var sync = $firebaseObject(isaac.child("Me"));
	sync.$bindTo($scope, "info");
});

portfolio.controller("OneCtrl", function($scope, $firebaseObject){
	var sync = $firebaseObject(isaac.child("About me"));
	sync.$bindTo($scope, "aboutMe");
});

portfolio.controller("RecentCtrl", function($scope, $firebaseObject){
	var sync = $firebaseObject(isaac.child("Recent Work"));
	sync.$bindTo($scope, "works");
});

portfolio.controller("InTouchCtrl", function($scope, $firebaseObject){
	var sync = $firebaseObject(isaac.child("Get in touch"));
	sync.$bindTo($scope, "touch");
});

portfolio.controller("FooterCtrl", function($scope, $firebaseObject){
	var sync = $firebaseObject(isaac.child("footer"));
	sync.$bindTo($scope, "footer");
});

function save(){
	name = $("#userName").val();
	if(name == ""){
		alert("You must have a name.");
		return;
	}
	email = $("#userEmail").val();
	var reg = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
	if(!reg.test(email)){
		alert("You must have a valid email.");
		return;
	}
	message = $("#userMessage").val();
	if(message.length <= 2){
		alert("You must enter a significative message.");
	}
	userMsg = {"name":name, "email":email, "message":message};
	isaac.child("messages").push(userMsg);
}