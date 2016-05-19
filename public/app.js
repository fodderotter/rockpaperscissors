var app = angular.module("rpsApp", ["ui.router"]);

app.config(function($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise("/");
	$stateProvider
	.state("active", {
		templateUrl:"templates/active.html",
		url:"/"
	})
});