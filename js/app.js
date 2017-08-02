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



});