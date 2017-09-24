$(document).ready(function(){

    // 头部导航
    (function(){
        if (getCookie("city")) {
            var cookie_city = getCookie("city");
            $(".shortcut .fl")
                .find("a")
                .removeAttr("class")
                .end()
                .find("a[value="+cookie_city+"]")
                .attr("class","selected")
                .end()
                .find("span")
                .text(getCookie('city'));
        }

        $(".shortcut .fl a").on("click",function(){
            var str = $(this).text();
            $(".shortcut .fl a").removeAttr("class");
            $(this).attr("class","selected");
            $(".shortcut .fl span").text(str);
            setTimeout(function(){
                setCookie("city",str,7);
                open(' ','_self');
            },1000);
        });

         /* 设置cookie函数封装 */    
        function setCookie(key,value,t){
            var oDate = new Date();
            oDate.setDate(oDate.getDate() + t);
            document.cookie = key + '=' +value +';expires=' + oDate.toGMTString();
        }

        /* 获取cookie函数封装 */
        function getCookie(key){
            var arr1 = document.cookie.split('; ');
            for ( var i = 0;i<arr1.length;i++){
                var arr2 = arr1[i].split('=');
                if (arr2[0] == key) { 
                    return decodeURI(arr2[1]);
                }
            }
        }
    })();

    // 模拟搜索框的占位符
    (function(){
    	var strValue = $("#search input").eq(0).val();
	    $("#search input").eq(0).focus(function(){     
	        if ($(this).val() == strValue) {                  
	            $(this).val("");
	        }
	    }).blur(function(){
	        if ($(this).val() == "") {
	            $(this).val(strValue);
	        }
	    });
    })();

    // 固定头部搜索框
    (function(){
        var tHeight = $("#seckill").offset().top;
        var S_onoff = true;
    	$(window).scroll(function(){
    		var docScroll = $(document).scrollTop();
    		if (tHeight<docScroll) {
                if (!S_onoff) return;
    			$("#wrap_search").css({
    				"position":"fixed",
    				"top":"-48px",
    				"z-index":3,
    				"background":"url(images/logo2.png) no-repeat 100px 5px #ffffff",
    				"border-bottom":"2px solid #ff0000",
    				"width":"100%",
    				"height":"48px"
    			}).animate({
                    "top":0
                },300).children("#search").css({
    				"float":"none",
    				"margin":"0 auto",
    				"padding-top":"6px"
    			}).find("input").css({
    				"border-color":"#f6f6f6",
    				"background-color":"#f6f6f6",
    			}).parent("#search").siblings().hide();
    			$(".jd-nav").css({
    				"margin-top":"100px"
    			});
                S_onoff = false;
    		}
    		else{
    			$("#wrap_search").css({
    				"position":"static",
    				"border-bottom":"none",
    				"width":"1190px",
    				"background":"#ffffff",
    				"height":"100px"
    			}).children("#search").css({
    				"float":"left",
    				"margin":"0",
    				"padding-top":"25px"
    			}).find("input").css({
    				"border-color":"#ff0000",
    				"background-color":"#ffffff",
    			}).parent("#search").siblings().show();
    			$(".jd-nav").css({
    				"margin-top":0
    			});
                S_onoff = true;
    		}
    	});
    })();

    // 左侧菜单栏的切换
    (function(){
    	$(".menu_dd").find(".menu_cate li").on("mouseenter",function(index){
    		$(this)
    			.attr("class","current")
    			.siblings()
    			.removeAttr("class");
    		$(".menu_pop")
    			.show()
    			.find("li")
    			.eq($(this)
    			.index())
    			.show()
    			.siblings()
    			.hide();
    	}).end().on("mouseleave",function(){
    		$(this).find(".menu_pop").hide();
    		$(".menu_cate li").removeAttr("class");
    	});
    })();

     
    // 轮播图
    (function(){
    	var num = slider_timer = throttle_timer = 0;
	    count = $(".slider_list li").length-1;

	    for (var i = 0; i < count+1; i++) {
	        $(".circle").append("<i></i>");
	    }
	    var circle_ml = -$(".circle").width()/2;

	    $(".circle i")
	        .eq(num)
	        .attr("class","current")
	        .end()
	        .eq(count)
	        .attr("id","circle_last")
	        .parents(".circle")
	        .css({
	            "margin-left":circle_ml+"px"
	        });

	    $(".slider_list li:not(:first-child)").hide();
	    $(".arrow a:eq(1)").on("click",function(){

	        ++num > count ? num=0 : num ;
	        Picfade();

	    }).siblings().on("click",function(){

	        --num < 0 ? num=count : num ;
	        Picfade();

	    });

	    $(".circle i").on("mouseover",function(){

            clearTimeout(throttle_timer);
            throttle_timer = setTimeout(function(){
                Picfade();
            },300);
	        num = $(this).index();      
	        
	    });

	    timer_start();

	    $("#slider_top").mouseenter(function(){
	        clearInterval(slider_timer);
	    }).mouseleave(function(){
	        timer_start();
	    });

	    function Picfade(){
	        $(".slider_list").find("li")
	            .eq(num)
	            .stop(true,true)
	            .fadeIn(1000)
	            .siblings()
	            .fadeOut(500)
	            .end()
	            .parents("#slider_top")
	            .children(".circle")
	            .find("i")
	            .eq(num)
	            .attr("class","current")
	            .siblings()
	            .removeAttr("class");
	    }

	    function timer_start(){
	        slider_timer = setInterval(function(){
	           ++num > count ? num=0 : num ;
	            Picfade();
	        },3000);
	    }
    })();

    // 轮播图右侧 公告栏切换
    (function(){
    	$(".jd-news .dt").find("a:not(:eq(2))").on("mouseenter",function(){
    		var active_num = $(this).index();  
    		$(".jd-news")
    			.find(".dd")
    			.find("ul:eq("+active_num+")")
    			.show()
    			.siblings()
    			.hide();
    		$(".news_tab_active").animate({
    			"left": active_num*55 + "px"
    		},100);
    	});
    })();

    // 轮播图右侧 liftservice 列表的背景图片加载
    (function(){
    	$("#lifeservice i").css({
	        "background-position-y" : function(index,value){
	            return -index*25 + "px"
	        }
	    });
    })();

    // 秒杀倒计时
    (function(){
    	var iNew = new Date("January,1,2018,10:00:00");
    	var s = 0,m = 0,h = 0,seckill_timer=null;

    	seckill_timer = setInterval(function(){
    		var iNow = new Date();
    		var t = Math.floor((iNew-iNow)/1000);
    		s = toTwo(Math.floor(t%60));
    		m = toTwo(Math.floor(t%86400/3600/60));
    		h = toTwo(Math.floor(t%86400/3600));

    		if (s < 0) {
    			$("#seckill").slideUp();
    			clearInterval(seckill_timer);
    		}

		    $("#count_down div")
		    	.eq(0)
		    	.text(h)
		    	.end()
		    	.eq(1)
		    	.text(m)
		    	.end()
		    	.eq(2)
		    	.text(s);
    	},1000);
    	function toTwo(n){
			return n<10 && n>-1 ? '0'+n : ''+n;
		}
    })();

    // 品牌排行榜切换
    (function(){
        var tab_width = $(".tab_head a").width();
        $("#find_tab").find(".tab_head a").on("mouseenter",function(){

            $(this).siblings(".current").stop().animate({
                "left":tab_width*$(this).index()+10+"px"
            },150);
            $(".tab_inner>div")
                .eq($(this).index())
                .stop()
                .show()
                .siblings()
                .hide();
        });
    })();

    // 产品模块底部logo切换
    (function(){
        
        var num = 0,life_onoff = true;
        var life_ul = $(".life_ul");
        $(".life_logo>a").hide();

        $(".life_col").on({
            "mouseenter":function(){
                $(this).find("a[class^='arrow']").show();
            },
            "mouseleave":function(){
                $(this).find("a[class^='arrow']").hide();
            }
        });

        for (var i = 0; i < life_ul.length; i++) {
            
            var life_onoff2 = true;
            var life_width = $(".life_logo").eq(i).width();        
            life_ul.eq(i).val(life_width);
            life_ul.eq(i).data("onoff",true); 
           
            var cloneNum = Math.ceil(life_ul.eq(i).val()/$(".life_ul li").eq(0).width());
            
            for (var j = 0; j < cloneNum; j++) {
                life_ul.eq(i).find("li:eq("+j+")").clone().appendTo(life_ul.eq(i));
                
            }       
            
            life_ul.eq(i).siblings(".arrow-r").on("click",function(){ 
                if (!life_onoff) return;
                life_onoff = !life_onoff;  
                         
                var currentUl = $(this).siblings("ul");
                  
                if (currentUl.data("onoff")) {
                    currentUl.css({"left":0});
                    currentUl.stop().animate({"left":-parseInt(currentUl.val())+"px"},1000,function(){
                        life_onoff = !life_onoff;
                    });
                    currentUl.data("onoff",false);
                }
                else {
                    currentUl.stop().animate({"left":-parseInt(currentUl.val())*2+"px"},1000,function(){
                        life_onoff = !life_onoff;
                    });
                    currentUl.data("onoff",true);
                }
                
            }).siblings(".arrow-l").on("click",function(){
                if (!life_onoff) return;
                life_onoff = !life_onoff;

                var currentUl = $(this).siblings("ul");

                if (currentUl.data("onoff")) {
                    currentUl.css({"left":-currentUl.val()*2+"px"});
                    currentUl.stop().animate({"left":-parseInt(currentUl.val())+"px"},1000,function(){
                        life_onoff = !life_onoff;
                    });
                    currentUl.data("onoff",false);
                }
                else {
                    currentUl.stop().animate({"left":0},1000,function(){
                        life_onoff = !life_onoff;
                    });
                    currentUl.data("onoff",true);
                }        
            });
        }
    })();

    // 所有图片的动画
    (function(){
        // 限时秒杀
        $(".seckill_product li").on({
            mouseenter:function(){   
            $(this).find("img").stop().animate({
                "top":"-5px"
            },300)},

            mouseleave:function(){
            $(this).find("img").stop().animate({
                "top":"5px"
            },300)}
        });

        // 领券中心
        $(".coupon_list li").on({
            mouseenter:function(){   
            $(this).find("img").stop().animate({
                "margin-left":"55px"
            },800)},

            mouseleave:function(){
            $(this).find("img").stop().animate({
                "margin-left":"20px"
            },800)}
        });

        // 发现好货
        $(".col1_list li").on({
            mouseenter:function(){   
            $(this).find("img").stop().animate({
                "right":"20px"
            },400)},

            mouseleave:function(){
            $(this).find("img").stop().animate({
                "right":"10px"
            },400)}
        });
        $(".brand_pro div").on({
            mouseenter:function(){
            $(this).find("img").stop().animate({
                "margin-left":"-10px"
            },400)},
            mouseleave:function(){
            $(this).find("img").stop().animate({
                "margin-left":0
            },400)}

        });

        // 享品质部分
        $(".lift_inner li").on({
            mouseenter:function(){   
            $(this).find("img").stop().animate({
                "left":0
            },400)},

            mouseleave:function(){
            $(this).find("img").stop().animate({
                "left":"10px"
            },400)}
        });

        // 爱生活部分
        $(".life_pro a").on({
            mouseenter:function(){  
            $(this).find("img").stop().animate({
                "margin-left":"-10px"
            },300)},
            mouseleave:function(){
            $(this).find("img").stop().animate({
                "margin-left":0
            },300)}
        });
    })();
    
});
