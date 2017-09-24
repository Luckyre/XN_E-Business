$(document).ready(function(){
	// 点击关闭topbanner
	$("#topbanner a:eq(1)").click(function(){
        $("#topbanner,#topbanner>div").slideUp(300);
    });

    // 返回顶部
    (function(){
        $(".sidebar_back,.back").click(function(){
            $("html,body").animate({
                "scrollTop":0
            },800);
        });
    })();

    // 左侧边栏、底部固定导航部分
    (function(){
        var TOP = 0,
        jd_lift = $(".jd_lift"),
        life_col1 = $(".life_col1"),
        life_col3 = $(".life_col3"),
        life_col5 = $(".life_col5"),
        life_col6 = $(".life_col6"),
        life_col8 = $(".life_col8"),
        life_col9 = $(".life_col9"),
        life_col11 = $(".life_col11"),
        life_col13 = $(".life_col13"),
        jd_go_on = $(".jd_go_on"),
        arr = [jd_lift,life_col1,life_col3,life_col5,life_col6,life_col8,life_col9,life_col11,life_col13,jd_go_on];
        $(window).scroll(function(){

            TOP = $(document).scrollTop()+200;
            
            TOP < $(".jd_coupon").offset().top ? $(".footer_nav").slideUp() : $(".footer_nav").slideDown();

            if (TOP > arr[0].offset().top) {
                $(".leftsidebar").fadeIn(500);
            }
            else {
                $(".leftsidebar").fadeOut(500);
                return;
            }
             
            if (TOP >= arr[9].offset().top) {
                $(".leftsidebar_list li")
                    .eq(9)
                    .attr("class","current")
                    .siblings()
                    .removeAttr("class");
            }
            else if(TOP >= arr[8].offset().top){
                $(".leftsidebar_list li")
                    .eq(8)
                    .attr("class","current")
                    .siblings()
                    .removeAttr("class");
            }
            else if(TOP >= arr[7].offset().top){
                $(".leftsidebar_list li")
                    .eq(7)
                    .attr("class","current")
                    .siblings()
                    .removeAttr("class");
            }
            else if(TOP >= arr[6].offset().top){
                $(".leftsidebar_list li")
                    .eq(6)
                    .attr("class","current")
                    .siblings()
                    .removeAttr("class");
            }
            else if(TOP >= arr[5].offset().top){
                $(".leftsidebar_list li")
                    .eq(5)
                    .attr("class","current")
                    .siblings()
                    .removeAttr("class");
            }
            else if(TOP >= arr[4].offset().top){
                $(".leftsidebar_list li")
                    .eq(4)
                    .attr("class","current")
                    .siblings()
                    .removeAttr("class");
            }
            else if(TOP >= arr[3].offset().top){
                $(".leftsidebar_list li")
                    .eq(3)
                    .attr("class","current")
                    .siblings()
                    .removeAttr("class");
            }
            else if(TOP >= arr[2].offset().top){
                $(".leftsidebar_list li")
                    .eq(2)
                    .attr("class","current")
                    .siblings()
                    .removeAttr("class");
            }
            else if(TOP >= arr[1].offset().top){
                $(".leftsidebar_list li")
                    .eq(1)
                    .attr("class","current")
                    .siblings()
                    .removeAttr("class");
            }
            else {
                $(".leftsidebar_list li")
                    .eq(0)
                    .attr("class","current")
                    .siblings()
                    .removeAttr("class");
            }        
        });

        $(".leftsidebar_list li").bind("click",function(){
                var click_num = $(this).index();
                $("html,body").stop(true,true).animate({
                    "scrollTop":arr[click_num].offset().top
                },500);
                
            });
    })();
    
    // 登录框部分
    (function(){
        var re = /current/;

        $(".sidebar_jdvip,.shortcut-login").click(function(){
            $("#jd_login").fadeIn(300);
            $(".login_QR").stop().animate({
                    "left":"20px"
                },200,function(){
                    $(".login_help").fadeIn(400);
                });
        });           
    
        $(".login-tab").on("click",function(){
            var $Class = $(this).attr("class");
            if ($Class.search(re) == -1) {
                $(this)
                    .stop(true,true)
                    .attr("class",$Class+" current")
                    .siblings(".login-tab")
                    .attr("class","login-tab");
                $(".login-inner .dd>div")
                    .eq($(this).index())
                    .show()
                    .siblings("[data-value]")
                    .hide();
            }      
        });

        $(".login_pic").on({
            "mouseenter":function(){
                $(".login_QR").stop().animate({
                    "left":"20px"
                },200,function(){
                    $(".login_help").fadeIn(400);
                })
            },
            "mouseleave":function(){          
                $(".login_QR").animate({
                        "left": "100px"
                },200);
                $(".login_help").stop().fadeOut(200);
            }
        });

        $(".login-input-box").on({
            "focus":function(){
                $(this).siblings("label").css({
                    "background-position-y":"-48px"
                }).siblings(".clear-btn").show();
            },
            "focusout":function(){
                $(this).siblings("label").css({
                    "background-position-y":0
                });
            }
        });

        $(".clear-btn").on("click",function(){
            $(this).hide().prev().val("");
        });

        $(".login-title .close").on("click",function(){

            $("#jd_login").stop().fadeOut(300);
        });

    })();
});
