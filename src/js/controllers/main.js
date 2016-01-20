var app = angular.module('app', ['templates-dist', 'ngSanitize', 'ngRoute']);

app.config(function ($routeProvider, $locationProvider) {
	'use strict';
	$routeProvider
		.when('/', {
			templateUrl : 'views/main.html',
			controller  : 'main'
		})
		.when('/contact', {
			templateUrl : 'views/contact.html',
			controller  : 'contact'
		})
		.when('/join', {
			templateUrl : 'views/join.html',
			controller  : 'join'
		})
		.when('/404', {
			controller : function() {
				window.location.replace('/');
			}
		})
		.otherwise({
			redirectTo : '/404'
		});
		
		$locationProvider.html5Mode(true);
});

app.controller('header', function ($scope, $log) {
	'use strict';
	$scope.total = 0;
	$scope.specialBoxes = {
		width : 'col-md-6 col-sm-12',
		data: [{
			width : 'col-md-4, col-sm-6',
			provider : '西湖店供應',
			data : [{
				name : '香腸',
				quantity : '',
				price : 60,
				url : 'https://farm8.staticflickr.com/7493/15608405793_451e2b023b_o.jpg',
				description : ''
			},{
				name : '浦燒鯛魚',
				quantity : '',
				price : 80,
				url : 'https://farm8.staticflickr.com/7466/16042416617_455a396f04_o.jpg',
				description : ''
			}, {
				name : '浦燒鯛魚特餐',
				quantity : '',
				price : 90,
				url : 'https://farm9.staticflickr.com/8619/15605856674_378aba97c7_q.jpg',
				description : ''
			}]
		}, {
			width : 'col-md-4, col-sm-6',
			provider : '東湖店供應',
			data : [{
				name : '香腸',
				quantity : '',
				price : 70,
				url : 'https://farm8.staticflickr.com/7493/15608405793_451e2b023b_o.jpg',
				description : ''
			},{
				name : '現炸鱈魚',
				quantity : '',
				price : 85,
				url : 'https://farm8.staticflickr.com/7466/15613712703_16415b61c0_q.jpg',
				description : ''
			}, {
				name : '現炸鱈魚特餐',
				quantity : '',
				price : 100,
				url : 'https://farm8.staticflickr.com/7583/15605855114_c763cae667_q.jpg',
				description : ''
			}]
		}]
	};
	$scope.boxesType = [{
		width : 'col-md-6 col-sm-6',
		data : [{
			name : 'ㄐ卷',
			quantity : '',
			price : 60,
			url : 'https://farm8.staticflickr.com/7505/15605856614_7cd73ff829_q.jpg',
			description : ''
		}, {
			name : '招牌火車',
			quantity : '',
			price : 60,
			url : 'https://farm8.staticflickr.com/7544/16202368366_3ec0369fe4_q.jpg',
			description : ''
		}]
	}, {
		width : 'col-md-3 col-sm-6',
		data : [{
			name : '腿庫',
			quantity : '',
			price : 70,
			url : 'https://farm9.staticflickr.com/8626/16042417257_df53a1d345_q.jpg',
			description : ''
		}, {
			name : '綜合',
			quantity : '',
			price : 70,
			url : 'https://farm9.staticflickr.com/8658/16042148189_5684c98b03_q.jpg',
			description : ''
		}, {
			name : '魯Ｇ腿',
			quantity : '',
			price : 70,
			url : 'https://farm9.staticflickr.com/8629/16202368476_f24fe84ab2_q.jpg',
			description : ''
		}, {
			name : '燒肉',
			quantity : '',
			price : 70,
			url : 'https://farm9.staticflickr.com/8575/15608406573_5b1be101b0_q.jpg',
			description : ''
		}]
	}, {
		width : 'col-md-6 col-sm-6',
		data : [{
			name : '魯排骨',
			quantity : '',
			price : 75,
			url : 'https://farm8.staticflickr.com/7564/15608405723_c19d18a121_q.jpg',
			description : ''
		}, {
			name : '咔拉Ｇ腿',
			quantity : '',
			price : 75,
			url : 'https://farm8.staticflickr.com/7481/15605856544_00a7e98151_q.jpg',
			description : ''
		}]
	}, {
		width : 'col-md-4 col-sm-6',
		data : [{
			name : '咔拉Ｇ腿特餐',
			quantity : '',
			price : 90,
			url : 'https://farm8.staticflickr.com/7464/16226390471_0c65575afb_q.jpg',
			description : ''
		}, {
			name : '滷雞腿特餐',
			quantity : '',
			price : 90,
			url : 'https://farm9.staticflickr.com/8589/15613618023_4c03f35a66_q.jpg',
			description : ''
		}, {
			name : '滷排骨特餐',
			quantity : '',
			price : 90,
			url : 'https://farm8.staticflickr.com/7577/15605856404_5eebb45da2_q.jpg',
			description : ''
		}]
	}];
	
	$scope.links = [{
			image: './assets/img/phone.png',
			heading: '訂購線-西湖店',
			content: '26277265',
			url: 'tel:2627-7265'
		}, {
			image: './assets/img/place.png',
			heading: '店面住址',
			content: '台北市內湖區內湖路一段323巷4弄8號(西湖市場旁)',
			url: 'https://goo.gl/maps/jWRfz'
		}, {
			image: './assets/img/facebook.png',
			heading: '臉書網頁',
			content: '歡迎留言',
			url: 'https://www.facebook.com/pages/%E6%9D%B1%E6%B9%96%E7%81%AB%E8%BB%8A%E4%BE%BF%E7%95%B6/158186497613339'
		}
	];
	
});

app.controller('main', function ($scope, $log) {
	'use strict';
	
	$scope.decrease = function (box) {
		if (box.quantity > 0) {
			box.quantity--;
			$scope.update();
		}
	};
	$scope.increase = function (box) {
		if (box.quantity < 999) {
			box.quantity++;
			$scope.update();
		}
	};
	$scope.sum = function (items, prop, multiplier) {
		var i,
			sum = 0,
			j;
		function accumlate(a, b) {
			return a + b[prop] * b[multiplier];
		}
		for (i = 0; i < items.length; i++) {
			for (j = 0; j < items[i].length; j++) {
				sum += items[i][j].data.reduce(accumlate, 0);
			}		
		}
		return sum;
	};
	$scope.update = function () {
		$scope.$parent.total = $scope.sum([$scope.$parent.boxesType, $scope.$parent.specialBoxes.data], 'price', 'quantity');
	};
});

app.controller('contact', function ($scope, $log) {
	'use strict';
	$scope.mediaObjects = {
		phoneImg: './assets/img/phone.png',
		locImg: './assets/img/place.png',
		fbImg: './assets/img/facebook.png',
		fbHeading: '臉書網頁',
		fbContent: '歡迎留言',
		fbURL: 'https://www.facebook.com/pages/%E6%9D%B1%E6%B9%96%E7%81%AB%E8%BB%8A%E4%BE%BF%E7%95%B6/158186497613339',
		locations: [{			
			phoneHeading: '訂購專線',
			phoneContent: 'TEL : 02-26277265',
			phoneURL: 'tel:2627-7265',
			locHeading: '西湖店',
			locContent: '台北市內湖區內湖路一段323巷4弄8號(西湖市場旁)',
			locURL: 'https://goo.gl/maps/jWRfz'
		}, {
			phoneHeading: '訂購專線',
			phoneContent: 'TEL : 02-26308683',
			phoneUrl: 'tel:2627-7265',
			locHeading: '東湖店',
			locContent: '台北市內湖區東湖路106巷7弄18號1樓',
			locURL: 'https://goo.gl/maps/KD3Hp'
		}]
	};
});

app.controller('join', function ($scope, $log) {
	'use strict';
});

$(document).ready(function (){
	$(".navbar-brand").on("click", function (){
		$(".nav").find(".active").removeClass("active");
		$('.nav a[href="/"]').parent().addClass("active");
	});
	$(".nav a").on("click", function (){
		$(".nav").find(".active").removeClass("active");
		$(this).parent().addClass("active");
		if($('.navbar-toggle').css('display') !='none'){
			$(".navbar-toggle").trigger( "click" );
		}
	});
	
	$('.navbar-default .navbar-nav>li')
		.mouseenter(function (){			
			if($('.navbar-toggle').css('display') =='none' && !$(this).hasClass('active')){
				$(this).addClass('animated rubberBand');
			}
		})
		.click(function(){
			$(this).removeClass('animated rubberBand');
		})
		.on('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function (){
			$(this).removeClass('animated rubberBand');
		});
});

function gototop() {
	document.body.scrollTop = document.documentElement.scrollTop = 0;
}