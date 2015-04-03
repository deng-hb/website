function load(){
	var Wh = $(window).height();
	$('.sec_main').height(Wh);

	function ZwClick(odiv,olr){
		$(odiv).click(function(){
			var In = $(this).index();
			var obj = $(olr);
			var ol = obj.find('.zw_l');
			obj.show();
			ol.eq(In).show().removeClass('animated rollOut').addClass('animated rollIn');
			ol.eq(In).find('img').show().removeClass('animated rollOut');
			ol.eq(In).find('h3').show();
				$(ol).toggle(function(){
					var This = $(this).find('img');
					This.removeClass('animated rollIn').addClass('animated rollOut');
					ol.eq(In).find('ul').show();
					setTimeout(function(){
						This.hide();
					},500);
				},function(){
					ol.eq(In).hide();
					obj.hide();
					ol.eq(In).find('ul').hide();
				});
		});
	}
	ZwClick('.zw li','.zw-m');
	ZwClick('.zw2 li','.zw-m2');
	ZwClick('.zw3 li','.zw-m3');


	$('.fxa').click(function(){
		$('.fx').show();
	});
	$('.fx').click(function(){
		$(this).hide();
	})
	var mySwiper = new Swiper('.slide',{
		pagination: false,
		loop:false,
		mode:'vertical',
		grabCursor: true,
		paginationClickable: true,
		onTouchEnd:function(swiper){
			$('.swiper-slide-active').siblings('.swiper-slide').find('.animated').hide();
			$('.swiper-slide-active').find('.animated').show();
		}
	});

	$('.u-globalAudio').toggle(function(){
		$('#mp3')[0].pause();
		$(this).removeClass('z-play');
	},function(){
		$('#mp3')[0].play();
		$(this).addClass('z-play');
	})
};

window.onload=function(){
	$('.spinner').remove();
	$('.sec_main').show();
	load();
	$('.swiper-slide-active').siblings('.swiper-slide').find('.animated').hide();
	$('.swiper-slide-active').find('.animated').show();
	
	var muc = 1;
	document.addEventListener('touchstart', function(){
		if(muc==1){
			$('#mp3')[0].play();
			muc = 2;
		}
	},false);

}