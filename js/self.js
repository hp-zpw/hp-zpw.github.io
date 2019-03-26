/*
*
* Created by MVP_Rubi on 2019/3/14
*
*/


(function(window,$){
	var ATTR_ANIMNAME = "anim-name";
	var currentPageIdx = 1;
	var prevPageIdx = 1;
	var pageCount = $(".page").length;
	var hasPlayMusic = false;
	var maskDom = '<img id="Mask" class="max-size" src="svg/mask.svg"/>';
	// var img = new Image();
	// img.src = "svg/mask.svg";
	setTimeout(function(){
		InitL2DWidget();
	},1);

	// 模拟加载完成
	var loadingLoop = setInterval(function(){
		if(IsResAllReady())
		{
			InitPlugins();
			InitLayout();
			$("#PuffSvg").addClass("loader-trans");
			$("#EnterBtn").removeClass("undisplay").addClass("anim").addClass("button-trans");
			$("#EnterBtn").one('click', function(){
				if($("#live2d-widget").length > 0) $("#live2d-widget").addClass("hide");
				EnterClick($(this));
			});
			clearInterval(loadingLoop);
		}
		else
			return;
	},1000);

	function EnterClick(self)
	{
		$(".loader-bg").prepend(maskDom);
		$("#TempMask").addClass("hide");
		//$("#Mask").removeClass("hide");
		// setTimeout(function(){
			// $("#Mask").attr("src","svg/mask.svg");
		// },1)
		self.addClass("hide");
		$("#PuffSvg").addClass("hide");
		setTimeout(function(){
			PlayPageAllAnim(1);
			// PlayAudio();
		},500);
		setTimeout(function(){
			$("#Mask").addClass("hide");
			$(".loader-bg").addClass("hide");
		},1200);
	}

	function IsResAllReady()
	{
		// if (!img.complete) return;
		// console.log("img state complete");
		for (var i = 0; i < $("audio").length; i++) {
			// console.log("audio state",$("audio")[i].readyState);
			if ($("audio")[i].readyState != 4)
				return false;
		}
		for (var i = 0; i < $("video").length; i++) {
			// console.log("video state",$("video")[i].readyState);
			if ($("video")[i].readyState != 4)
				return false;
		}

		return true;
	} 

	function PlayAudio() {
		var audio = document.getElementById('bgAudio');
		if(!audio) return;
		audio.volume = .3;
		// if(audio.paused)
		// console.log("Play Audio!");
			audio.play();
	}

	function InitPlugins(){
		var direction = $(window).width() > 600 ? "horizontal" : "vertical" ;
		var animationTime = $(window).width() > 600 ? 1000 : 500 ;
		$(".main").onepage_scroll({
		   sectionContainer: ".page",
		   easing: "ease",
		   animationTime: animationTime,
		   pagination: true,
		   updateURL: false,
		   beforeMove: function(index) {
				$("#live2d-widget").addClass("hide");
				PausePageVedio(currentPageIdx);
		   },
		   afterMove: function(index) {
		   		prevPageIdx = currentPageIdx;
		   		currentPageIdx = index;
				PlayPageAllAnim(currentPageIdx);
				PlayPageVedio(currentPageIdx);
				InitPage(prevPageIdx);
				if(currentPageIdx == pageCount)
					$("#live2d-widget").removeClass("hide");
				if(!hasPlayMusic)
				{
					hasPlayMusic = true;
					PlayAudio();
				}

		   },
		   loop: false,
		   keyboard: true,
		   responsiveFallback: false,
		   direction: direction
		});
		new Parallax(document.getElementById('scene1'));
		new Parallax(document.getElementById('scene2'));
		new Parallax(document.getElementById('scene3'));
		new Parallax(document.getElementById('scene4'));
		new Parallax(document.getElementById('scene5'));

		

	}

	function InitL2DWidget()
	{
		L2Dwidget.init({
			"model": {
				jsonPath: 
				"model/chan/unitychan.model.json",
				"scale": 1.5
			},
			"display": {
				"position": "right",
				"width": 150,
				"height": 300,
				"hOffset": -20,
				"vOffset": -150,
			},
			"mobile": {
				"show": true,
				"scale": 0.5
			},
			"react": {
				"opacityDefault": 1,
				"opacityOnHover": 1
			}
		});

	}


	function InitLayout(){
		for (var i = 1; i <= pageCount; i++) {
			InitPage(i);
		}
	};

	function PlayPageVedio(pageIdx)
	{
		var videos = $(".page" + pageIdx).find("video");
		$.each(videos,function(i,video){
			$(video)[0].currentTime = 0;
			$(video)[0].play();
		});
	}

	function PausePageVedio(pageIdx)
	{
		var videos = $(".page" + pageIdx).find("video");
		$.each(videos,function(i,video){
			$(video)[0].pause();
		});
	}

	function PlayPageAllAnim(pageIdx) 
	{
		var animtors = $(".page" + pageIdx).find('*['+ATTR_ANIMNAME+']');
		$.each(animtors,function(i,animtor){
			$(this).removeClass('hide').addClass($(this).attr(ATTR_ANIMNAME) + ' animated').one(
				'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function(){
			});
		});
	};

	function InitPage(pageIdx)
	{
		var animtors = $(".page" + pageIdx).find('*['+ATTR_ANIMNAME+']');
		$.each(animtors,function(i,animtor){
			$(this).addClass('hide');
		});
	}
})(window,$);