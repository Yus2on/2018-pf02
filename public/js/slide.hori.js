var SlideHori = (function(){
	function SlideHori(container, slides, options) {
		var obj = this;
		this.container = container;
		this.slides = slides;
		if(options) {
			this.options = options;
			if(!this.options.delay) this.options.delay = 2000;
			if(!this.options.speed) this.options.speed = 500;
			if(!this.options.dir) this.options.dir = -1;
			if(!this.options.dirBtn || this.options.dirBtn.length<2) {
				this.options.dirBtnUse = false;
			}
		}
		else {
			this.options = {
				delay: 2000,
				speed: 500,
				dir: -1,
				dirBtnUse: false
			}
		}
		this.now = 0;
		this.end = this.slides.length - 1;
		this.init(obj);
		this.interval = setInterval(this.ani, this.options.delay, obj);
		if(this.options.dirBtnUse === true) {
			this.options.dirBtn[0].click(function(){
				clearInterval(obj.interval);
				obj.options.dir = 1;
				obj.ani(obj);
				obj.interval = setInterval(obj.ani, obj.options.delay, obj);
			});
			this.options.dirBtn[1].click(function(){
				clearInterval(obj.interval);
				obj.options.dir = -1;
				obj.ani(obj);
				obj.interval = setInterval(obj.ani, obj.options.delay, obj);
			});
		}
		this.container.mouseenter(function(){
			clearInterval(obj.interval);
		});
		this.container.mouseleave(function(){
			clearInterval(obj.interval);
			obj.interval = setInterval(obj.ani, obj.options.delay, obj);
		});
		$(".sub-navs li").click(function(){
			obj.now = $(this).index()-1;
			clearInterval(obj.interval);
			obj.ani(obj);
			obj.interval = setInterval(obj.ani, obj.options.delay, obj);
		});
	}
	SlideHori.prototype.init = function(obj) {
		obj.container.css({"left":0});
		obj.slides.hide(0);
		obj.slides.eq(obj.now).css({"left":0}).show(0);
		if(obj.now == 0) {
			obj.slides.eq(obj.end).css({"left":"-100%"}).show(0);
			obj.slides.eq(obj.now+1).css({"left":"100%"}).show(0);
		}
		else if(obj.now == obj.end) {
			obj.slides.eq(obj.now-1).css({"left":"-100%"}).show(0);
			obj.slides.eq(0).css({"left":"100%"}).show(0);
		}
		else {
			obj.slides.eq(obj.now-1).css({"left":"-100%"}).show(0);
			obj.slides.eq(obj.now+1).css({"left":"100%"}).show(0);
		}
	}
	SlideHori.prototype.ani = function(obj) {
		obj.init(obj);
		obj.container.stop().animate({"left":(100*obj.options.dir)+"%"}, obj.options.speed, function(){
			if(obj.options.dir == -1) {
				if(obj.now == obj.end) obj.now = 0;
				else obj.now++;
			}
			else {
				if(obj.now == 0) obj.now = obj.end;
				else obj.now--;
			}
		});
	}
	return SlideHori;
}());


var options = {
	delay: 3000,
	speed: 500,
	dir: -1,
	dirBtnUse: false
};
var banner = new SlideHori($(".banner_wrap"), $(".slide"), options);
$(window).resize(function(){
	var hei = $(".slide").eq(0).height();
	$(".banner_wrap").height(hei);
	$(".sub-navs li").innerHeight(hei/5);
	var lft = $(".navs > li").eq(0).position().left;
	var mWid = $(".navs > li").eq(0).innerWidth();
	$(".sub-navs").css({"left":lft+"px", "width":mWid+"px"});
});

$("body").imagesLoaded(function(){
	$(window).trigger("resize");
});