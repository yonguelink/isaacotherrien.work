var isaac = new Firebase("https://isaacotherrien.firebaseio.com/");

var portfolio = angular.module("portfolio", ["firebase"]);
var adminAuth = isaac.getAuth();
var edit = false;

portfolio.controller("HeaderCtrl", function($scope, $firebaseObject){
	$scope.info = $firebaseObject(isaac.child("Me"));
	$scope.editable = editable($firebaseObject);
});

portfolio.controller("OneCtrl", function($scope, $firebaseObject){
	$scope.aboutMe = $firebaseObject(isaac.child("AboutMe"));
	$scope.editable = editable($firebaseObject);
});

portfolio.controller("RecentCtrl", function($scope, $firebaseObject){
	$scope.works = $firebaseObject(isaac.child("RecentWork"));
	$scope.editable = editable($firebaseObject);
});

portfolio.controller("InTouchCtrl", function($scope, $firebaseObject){
	$scope.touch = $firebaseObject(isaac.child("GetInTouch"));
	$scope.editable = editable($firebaseObject);
});

portfolio.controller("FooterCtrl", function($scope, $firebaseObject){
	$scope.footer = $firebaseObject(isaac.child("Footer"));
	$scope.editable = editable($firebaseObject);
});

portfolio.controller("SaveBtnCtrl", function($scope, $firebaseObject){
	$scope.save = editable($firebaseObject);
});

portfolio.controller("AdminCtrl", function($scope, $firebaseObject){
	$scope.admin = editable($firebaseObject);
});

function editable($firebaseObject){
	if(adminAuth)
		return $firebaseObject(isaac.child(adminAuth.uid));
	return $firebaseObject(isaac.child(0));
}

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

function search(e){
	e = e || window.event;
	if (e.keyCode == 13)
		login();
}

function saveAllText(){
	$('#myPage').contents().find("span[contenteditable='true']").each(function(){
		loc = this.attributes.getNamedItem("location");
		val = this.innerHTML;
		tempIsaac = isaac;
		if(loc){
			loc = loc.nodeValue.split(" ");
			for(pos in loc){
				child = loc[pos];
				if(!isNaN(child)){
					if(child < 10)
						child = "0" + child;
					else
						child = child.toString();
				}
				if(pos == loc.length-1){
					toSend = {};
					toSend[child] = val;
					tempIsaac.update(toSend);
				}else
					tempIsaac = tempIsaac.child(child);
			}
		}
	});
	redirect("index.html");
}

function login(){
	userName = $("#userName").val() + "@isaacotherrien.work";
	userPassword = $("#userPassword").val();
	isaac.authWithPassword({
		email    : userName,
		password : userPassword
	},function(error, authData) {
		if (error) {
			console.log("Login Failed!", error);
		}else{
			redirect("index.html");
		}
	});
}

function logout(){
	isaac.unauth();
	redirect("index.html");
}

function redirect(page){
	page = page || "admin.html";
	//Redirect to page page
	window.location = page;
}