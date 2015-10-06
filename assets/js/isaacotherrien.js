var loc = window.location.search.substring(1).split("&");
lang = "en";

if(loc.length > 0){
	for(i in loc){
		val = loc[i].split("=");
		if(val[0] == "l"){
			lang = val[1];
		}
	}
	if(lang !== "fr") lang="en";
}else{
	lang = window.navigator.language || window.navigator.userLanguage;
	if(lang.indexOf("fr") > -1)lang = "fr";
	else lang = "en";
}

var isaac = new Firebase("https://isaacotherrien.firebaseio.com/");
isaac = isaac.child(lang);

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

portfolio.controller("MsgCtrl", function($scope, $firebaseObject){
	$scope.messages = $firebaseObject(isaac.child("messages"));
	$scope.emailBack = function(message){
		isaac.child("messages").child(message.id).update({replied:true});
		window.location = "mailto:"+message.email+"&subject=Reply from Isaac&from=isaac@isaacotherrien.work";
	};
	$scope.delete = function(message){
		isaac.child("messages").child(message.id).update({deleted:true});
	};
	$scope.editable = editable($firebaseObject);
});

function switchLang(){
	lang = lang == "fr" ? "en" : "fr";
	page = "/?l=" + lang;
	redirect(page);
}

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
	msg = isaac.child("messages").push(userMsg);
	msgId = msg.key();
	isaac.child("messages").child(msgId).update({'id':msgId});
	alert("Message sent!");
	$("#userName").val("");
	$("#userEmail").val("");
	$("#userMessage").val("");
}

function search(e){
	e = e || window.event;
	if (e.keyCode == 13)
		login();
}

function saveAllText(){
	$('#myPage').contents().find("span[contenteditable='true']").each(function(){
		console.log(this);
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
					//Don't save the new recent work template if nothing has changed
					if(!(val === "Title" || val === "Desc" || val === "Image" | val === "Link")){
						while(val.indexOf("&nbsp;") > -1)
							val = val.replace("&nbsp;", "");
						while(val.indexOf("amp;") > -1)
							val = val.replace("amp;", "");
						toSend[child] = val;
						tempIsaac.update(toSend);
					}
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