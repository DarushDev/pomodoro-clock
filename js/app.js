"use strict";

$( document ).ready(function() {

    var sessionTimer;
    var breakTimer;
    var breakLength = $('#break-slider').val() * 60;
    var sessionLength = $('#session-slider').val() * 60;
    var isSession = true;

    $("#sound").click(function(){
        $(this).toggleClass("fa-volume-up fa-volume-off");
    });

    $('#break-slider').rangeslider({
        polyfill: false
    }).on('input', function() {
        $("#break-output").text(this.value);
        breakLength = this.value * 60;
    });

    $('#session-slider').rangeslider({
        polyfill: false
    }).on('input', function() {
        $("#session-output").text(this.value);
        $(".timer").text(("0" + this.value).slice(-2) + ":00");
        sessionLength = this.value * 60;
    });

    $("#circle").circliful({
        start:100,
        percent: 0,
        //text: "Session", //info text shown bellow the percentage in the circle
        textStyle: 'font-size: 18px;',//css inline style you want to add to your info text
        textColor: '#9A9A9A', //text color of the info text
        textBelow:true, //should the info text be place below the circle
        replacePercentageByText: "25:00", //show our own text
        noPercentageSign: true, //don't show % sign
        percentageTextSize: 30, //font size of the percentage text
        fontColor: "#fff", //Our text color
        textAdditionalCss: "", //not working //additional css for the percentage text
        backgroundColor: "#AB67CC", //background color of the circle //AB67CC//FF4545
        foregroundColor: "#9ACC02", //foreground color of the circle
        pointColor: "#353535", //Central point color
        pointSize:53, //Central point size
        //fillColor: "#0000ff",  //outer central color
        animation: 1, //if the circle should be animated initially
        animationStep: 5, //1-100 how fast animation should be
        animateInView: false, //not working //animate circle on scroll into view
        foregroundBorderWidth: 3, //foreground circle border width
        backgroundBorderWidth: 3 //background circle border width
    });


    $("#pause").hide();
    $("#stop").hide();


    $("#play").click(function(){

        $("#play").hide();
        $("#pause").show();
        $("#stop").show();

        if(isSession){
            sessionTimer = setInterval(sessionTimerFunction, 1000);
        } else {
            breakTimer = setInterval(breakTimerFunction, 1000);
        }


        $("#break-slider").prop("disabled", true);
        $("#break-slider").rangeslider('update');
        $("#session-slider").prop("disabled", true);
        $("#session-slider").rangeslider('update');
    });



    function breakTimerFunction(){
        breakLength = breakLength -1;

        var percent = 360 - (360 * breakLength) / ($("#break-slider").val()*60);
        $("#circle").children("svg").eq(0).children("circle").eq(1).css("stroke-dasharray", percent + ", 20000");

        var minutes = ("0" + Math.floor(breakLength / 60)).slice(-2);
        var seconds = ("0" + breakLength % 60).slice(-2);
        $(".timer").text(minutes + ":" + seconds);

        if(breakLength <= 0){
            $("#circle").children("svg").eq(0).children("circle").eq(2).css({fill:"#353535"});//change circle center point color
            clearInterval(breakTimer);
            playSessionSound();
            isSession = true;
            breakLength = $('#break-slider').val() * 60;
            $("#circle").children("svg").eq(0).children("circle").eq(1).css({
                "stroke-dasharray":"0, 20000",
                "stroke":"#9ACC02"
            });//reset circle percentage
            sessionTimer = setInterval(sessionTimerFunction, 1000);
        }
    }

    function sessionTimerFunction(){
        sessionLength = sessionLength - 1;

        var percent = 360 - (360 * sessionLength) / ($("#session-slider").val()*60);
        $("#circle").children("svg").eq(0).children("circle").eq(1).css("stroke-dasharray", percent + ", 20000");

        var minutes = ("0" + Math.floor(sessionLength / 60)).slice(-2);
        var seconds = ("0" + sessionLength % 60).slice(-2);
        var time = minutes + ":"+seconds;
        $(".timer").text(time);

        if(sessionLength <= 0){
            $("#circle").children("svg").eq(0).children("circle").eq(2).css({fill:"#FF4545"});//change circle center point color
            clearInterval(sessionTimer);
            playBreakSound();
            isSession = false;
            sessionLength = $('#session-slider').val() * 60;
            $("#circle").children("svg").eq(0).children("circle").eq(1).css({
                "stroke-dasharray":"0, 20000",
                "stroke":"#FF4545"
            });//reset circle percentage
            breakTimer = setInterval(breakTimerFunction , 1000);
        }
    }

    function playSessionSound(){
        if($("#sound").hasClass("fa-volume-up")){
            var audioElement = document.createElement('audio');
            audioElement.setAttribute('src', 'http://k003.kiwi6.com/hotlink/va19h1zq3h/session-time.mp3');
            audioElement.play();
        }
    }

    function playBreakSound(){
        if($("#sound").hasClass("fa-volume-up")){
            var audioElement = document.createElement('audio');
            audioElement.setAttribute('src', 'http://k003.kiwi6.com/hotlink/w0r8fvy112/break-time.mp3');
            audioElement.play();
        }
    }

});