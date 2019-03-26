/*
*
* Created by MVP_Rubi on 2019/3/14
*
*/


(function(window,$){
	var ATTR_ANIMNAME = "anim-name";
	var PAGE_CLASS = "swiper-slide";
	var currentPageIdx = 1;
	var prevPageIdx = 1;
	var pageCount = $(".swiper").length;

	// var img = new Image();
	// img.src = "svg/mask.svg";

	//判断加载完成
	var loadingLoop = setInterval(function(){
		if(IsResAllReady())
		{

			// InitPlugins();
			InitLayout();
			$("#PuffSvg").addClass("loader-trans");
			$("#EnterBtn").removeClass("undisplay").addClass("anim").addClass("button-trans");
			$("#EnterBtn").one('click', function(){
				EnterClick($(this));
			});
			clearInterval(loadingLoop);
		}
		else
			return;
	},1000);

	function EnterClick(self)
	{
		$("#TempMask").addClass("hide");
		$("#Mask").removeClass("hide");
		setTimeout(function(){
			$("#Mask").attr("src","svg/mask.svg");
		},1)
		self.addClass("hide");
		$("#PuffSvg").addClass("hide");
		setTimeout(function(){
			PlayPageAllAnim(1);
			PlayAudio();
		},500);
		setTimeout(function(){
			$("#Mask").addClass("hide");
			$(".loader-bg").addClass("hide");
			InitPlugins();
		},1180);
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
		audio.volume = .2;
		if(audio.paused)
			audio.play();
	}

	// $(document).ready(function () {
	// 	InitPlugins();
	// })

	function InitPlugins(){
		var mySwiper = new Swiper ('.swiper-container', {
			// Optional parameters
			direction: 'vertical',
			loop: false,
		})
		// $(".main").onepage_scroll({
		//    sectionContainer: ".page",
		//    easing: "ease",
		//    animationTime: 1000,
		//    pagination: true,
		//    updateURL: false,
		//    beforeMove: function(index) {
		   		
		//    },
		//    afterMove: function(index) {
		//    		prevPageIdx = currentPageIdx;
		//    		currentPageIdx = index;
		//    		PlayPageAllAnim(currentPageIdx);
		//    		InitPage(prevPageIdx);
		//    },
		//    loop: true,
		//    keyboard: true,
		//    responsiveFallback: false,
		//    direction: "horizontal"
		// });
		new Parallax(document.getElementById('scene1'));
		new Parallax(document.getElementById('scene2'));
		new Parallax(document.getElementById('scene3'));
		new Parallax(document.getElementById('scene4'));
		new Parallax(document.getElementById('scene5'));
	}


	function InitLayout(){
		// for (var i = 0; i <= pageCount; i++) {
		// 	InitPage(i);
		// }
	};

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
		var animtors = $(PAGE_CLASS).eq(index).find('*['+ATTR_ANIMNAME+']');
		$.each(animtors,function(i,animtor){
			$(this).addClass('hide');
		});
	}
})(window,$);