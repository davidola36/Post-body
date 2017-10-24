var app = angular.module('myApp', ['ui.tinymce', 'ngFileUpload', 'ngYoutubeEmbed', 'ngVimeo']);

// form element creation directive
 app.directive("biUiBuilder", function($compile){
	var pointer = 0;
	
	var getTemplate = function(elem,position,mode) {
		
        var inset = "";
		var identifier = "element"+pointer;
		var border;
		var extra = "";
		var prop = "";
		
		if(mode != "preview"){
			prop = "margin_right_30";
		}
		
		// increment pointer
		pointer++;
		
		inset = "<div style=\"width: 20px; position: absolute; left: -30px;\">"+
			"<a href=\"\" title=\"Remove Item\" class=\"_link _link_slimmer _link_gray round_2px cursor margin_bottom_5\" data-ng-click=\"removeElement("+position+")\" data-ng-show=\"mode == 'debug'\">"+
				"<span class=\"cons exer_alt\"></span>"+
			"</a>";
			
			if(elem.type == "button")
			{
				inset += "<div class=\"relative\" bi-dropdown data-ng-show=\"mode == 'debug'\">"+
					"<a href=\"\" title=\"Remove Item\" class=\"cursor tick dropdown_caret\">"+
						"<span class=\"cons pen_alt\" title=\"Edit Asset Details\"></span>"+
					"</a>"+
					"<div class=\"drop w_400 margin_top_5 round_3px left_0\">"+
						"<ul class=\"lists lists_blk\">"+
							"<li><p>Button Text</p><div class=\"border_ccc no_bottom_border round_3px error_included margin_bottom_10\"><div class=\"bg_fff border_bottom_ccc round_3px \"><input v_type=\"String\" placeholder=\"Provide Button Text\" v_null=\"y\" class=\"full txt round_3px no_border\" type=\"text\" name=\"\" value=\"\"  data-ng-model=\"elem.value\"/></div><div class=\"error_holder\"></div></div></li>"+
							"<li><p>Web Address</p><div class=\"border_ccc no_bottom_border round_3px error_included \"><div class=\"bg_fff border_bottom_ccc round_3px \"><input v_type=\"String\" placeholder=\"Provide Button Text\" v_null=\"y\" class=\"full txt round_3px no_border\" type=\"text\" name=\"\" value=\"\"  data-ng-model=\"elem.link\"/></div><div class=\"error_holder\"></div></div></li>"+
						"</ul>"+
					"</div>"+
				"</div>";
			}
			else if(elem.type == "banner"){
				inset += "<div class=\"relative\" bi-dropdown data-ng-hide=\"elem.value == ''\" data-ng-show=\"mode == 'debug'\">"+
					"<a href=\"\" title=\"Remove Item\" class=\"cursor tick dropdown_caret\">"+
						"<span class=\"cons pen_alt\" title=\"Edit Asset Details\"></span>"+
					"</a>"+
					"<div class=\"drop w_400 margin_top_5 round_3px left_0\">"+
						"<ul class=\"lists lists_blk\">"+
							"<li><p>Image Alt Text</p><div class=\"border_ccc no_bottom_border round_3px error_included\"><div class=\"bg_fff border_bottom_ccc round_3px \"><input v_type=\"String\" placeholder=\"Provide Alternative Text for Image\" v_null=\"y\" class=\"full txt round_3px no_border\" type=\"text\" name=\"\" value=\"\"  data-ng-model=\"elem.alt\"/></div><div class=\"error_holder\"></div></div></li>"+
							"<li><p>Image Link</p><div class=\"border_ccc no_bottom_border round_3px error_included \"><div class=\"bg_fff border_bottom_ccc round_3px \"><input v_type=\"String\" placeholder=\"Provide Button Text\" v_null=\"y\" class=\"full txt round_3px no_border\" type=\"text\" name=\"\" value=\"\"  data-ng-model=\"elem.link\"/></div><div class=\"error_holder\"></div></div></li>"+
						"</ul>"+
					"</div>"+
				"</div>";
			}
			
		inset += "</div>"+
		"<span class=\"handle cons myHandle\" data-ng-show=\"mode == 'debug'\"></span>"+
		"<div>";
		
        switch(elem.type) {
			case 'textbox': 
				inset += "<textarea ui-tinymce  data-ng-model=\"elem.value\"></textarea>";
				
                break;
			case 'banner':
                inset += "<a data-bi-ui-uploader=\".fileUploader\" data-ng-model=\"elem.value\"  data-ng-show=\"elem.value == ''\" href=\"\" class=\"block hover_blue bg_f6f6f6 round_3px padding_top_60 padding_bottom_60 central relative\">"+
					"<span class=\"inliner\"><span class=\"cons plus circle fltLft\"></span>Choose A File</span>"+
					
				"</a>"+
				"<input style=\"display:none\" type=\"file\" name=\"fileUpload\" class=\"fileUploader\" />"+
				"<div class=\"xl relative\" data-ng-hide=\"elem.value == ''\">"+
					"<div class=\"absolute padding_all_5\" data-ng-show=\"mode == 'debug'\">"+
						"<a href=\"\" title=\"Remove Item\" class=\"_link _link_slim _link_gray round_3px cursor\" data-ng-click=\"elem.value = ''; elem.alt = '';\"><span class=\"cons xer_asset can fltLft\"></span>&nbsp;&nbsp;Clear Image</a>"+
 					"</div>"+
					"<a href=\"{{elem.link}}\" target=\"_blank\">"+
						"<img style=\"display: block; width: 100%\" data-ng-src=\"{{elem.value}}\" alt=\"{{elem.alt}}\" />"+
					"</a>"+
				"</div>";
				
                break;
			case 'button':
                inset += "<div style=\"position: relative; padding: 10px 50px;\">"+
					"<a style=\"padding: 15px; background: #d72927; color: #fff; display: block; text-decoration: none; font-size:14px; text-align: center; text-transform: uppercase; border-radius: 3px;\" target=\"_blank\" href=\"{{elem.link}}\">{{elem.value}}</a>"+
				"</div>";
				
                break;
        }
		
		inset += "</div>";
		
		return inset;
    }
	
	return {
		restrict	: "E",
		link		: function(scope,element,attrs) {
			element.html(getTemplate(scope.elem,attrs.pos,attrs.mode));
			$compile(element.contents())(scope);
		},
		scope 		: {
			elem	: "=",
			remove	: "=",
			mode	: "="
		},
		controller	: function($scope,$element) {
			// remove element
			// refresh JSON object array
			$scope.removeElement = function(){
				// run remove element function in parent controller
				// pass object position value
				$scope.remove($element.attr("type"),$element.attr("pos"));
				
				return false;
			}

		}
	};
});

// controller for UIbuilder
app.controller("addtext", ['$scope', function($scope){
	$scope.mode = "debug";
	$scope.letter = {
		items:[]
	};
	
	$scope.addTextbox = function(){
	 console.log("clicked");
	 $scope.letter.items.push({
	  type : "textbox" ,
	  value : "<h3>Another Great Heading</h3>"+
		"<p>This is a text block. You can use it to add text to your template.</p>"
	 })
	}
	
}])

// Controller for file upload
app.controller('MyCtrl', ['$scope', 'Upload', function ($scope, Upload) {
    // upload later on form submit or something similar
    $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
	};
	
    // for multiple files:
    $scope.uploadFiles = function (files) {
    	if (files && files.length) {
    		for (var i = 0; i < files.length; i++) {
				Upload.upload({
					url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
					data: {file: files, 'username': $scope.username}
				}).then(function (resp) {
					//console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
				}, function (resp) {
					//console.log('Error status: ' + resp.status);
				}, function (evt) {
					var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
					console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file[0].name);
					//console.log(evt);
				});
			}	
 		}
    };	
}]);

/*app.config(function($sceDelegateProvider) {
	$sceDelegateProvider.resourceUrlWhitelist([
	  'self',
	  '*://www.youtube.com/**'
	]);
  });  */

		
app.directive("videoPlugin", function($compile){

	var getPlayer = function(elem){
		var inset = ""
	
		switch(elem.type){
			case 'youtube':
				inset += '<ng-youtube-embed video="elem.value" autoplay="true" color="white" disablekb="true" end="20">' +
					'</ng-youtube-embed>'
				break;
			case 'vimeo':
				inset += ' <div id="embed">Loading video...</div>'
				break;
			
		
		}
		return inset
	}

	return{
		restrict: 'E',
		link: function(scope,element,attrs) {
			element.html(getPlayer(scope.elem));
			$compile(element.contents())(scope);
		},
		scope: {
			elem: '=',
			settings: '='
		},
	}
});

app.controller('videoPluginCtrl', ['$scope', function($scope){
	$scope.video = {
		items:[]
	};

	// youtube
	$scope.plugin= {
		url : 'https://www.youtube.com/watch?v=QXV0O1MhaIY',
		vurl: "7100569"
	}

	
	$scope.vimeoUrl =  "http://www.vimeo.com/"	+ $scope.plugin.vurl 
	  
	$scope.addYoutube= function(){
		console.log("clicked");
		$scope.video.items.push({
		type : "youtube" ,
		value: $scope.plugin.url
		})
	}
	
	

	$scope.addVimeo= function(){
		$scope.video.items.push({
		 type : "vimeo" ,
		 value: $scope.vimeoUrl
		})
		console.log($scope.video.items);
		
	   }
}]);

	




app.controller('socialMediaCtrl', ['$scope', function($scope){
	$scope.social = {
		items:[]
	};
	$scope.plugin = {
		url : "https://www.facebook.com/"
	}


	
	  
	$scope.addFacebook= function(){
		$scope.social.items.push({
		type : "facebook" ,
		value: $scope.plugin.url
		})
	}


}]);


app.directive("socialMedia", function($compile, $timeout){
	var getPlayer = function(elem){
		inset = ""
		
		switch(elem.type){
			case "facebook":
				inset += '<div class="fb-post" data-href="elem.value"></div>'
				break;

		}
		return inset
	
	}

	return{
		restrict: 'E',
		link: function(scope,element,attrs) {
			element.html(getPlayer(scope.elem));
			$compile(element.contents())(scope);
		//	$timeout(function() {
		//		if (FB) {
		//		  FB.XFBML.parse(element[0]);
		//		}
		//	});
		
		},
		scope: {
			elem: '=',
		},
	}
}) 

