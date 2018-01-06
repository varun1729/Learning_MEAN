$('ul').on("click", ".task", function() {
    $(this).toggleClass('strike');
});

$("ul").on("click", ".delete", function() {
    $(this).parent().fadeOut(500, function() {
        $(this).remove();
    });
});

$("ul").on("mouseenter", "li", function() {
    $(this).find(".delete").fadeIn(100, function() {}),
        $(this).find(".delete").css({
            "display": "inline-block",
            "opacity": "1",
        });
});

$("ul").on("mouseleave", "li", function() {
    $(this).find(".delete").fadeOut(100, function() {
        $(this).hide();
    });
});

$("input[type = 'text']").keypress(function(event) {
    if (event.which === 13) {
        let task = $(this).val();
        $(this).val("");
        $('ul').append("<li> <span class=\"delete\"> <i class='fa fa-eraser' aria-hidden='true'></i> </span> <span class=\"task\">" + task + "</span> </li>");
    }
});

// Thanks to  https://stackoverflow.com/a/15191130
$.fn.animateRotate = function(angle, duration, easing, complete) {
  var args = $.speed(duration, easing, complete);
  var step = args.step;
  return this.each(function(i, e) {
    args.complete = $.proxy(args.complete, e);
    args.step = function(now) {
      $.style(e, 'transform', 'rotate(' + now + 'deg)');
      if (step) return step.apply(e, arguments);
    };

    $({deg: 0}).animate({deg: angle}, args);
  });
};

$('.fa-cog').click(function() { 
    $(this).animateRotate(180,600,'linear');
});

$("input[type = 'text']").fadeToggle(0);
$(".fa-pencil").on("click", function() {
    $("input[type = 'text']").fadeToggle(500);
});

let currentThemeImg = $(".imgSelected");
$("#img1").click(function(){ 
    $('body').css("background" , 'linear-gradient(to right, #ffd89b, #19547b)');
    $(currentThemeImg).removeClass('imgSelected');
    $(this).addClass('imgSelected');
    currentThemeImg = $(this);
});
$("#img2").click(function(){ 
    $('body').css("background" , 'linear-gradient(to right, #ff7e5f, #feb47b)');
    $(currentThemeImg).removeClass('imgSelected');
    $(this).addClass('imgSelected');
    currentThemeImg = $(this);});
$("#img3").click(function(){ 
    $('body').css("background" , 'linear-gradient(to right, #3a6186, #89253e)');
    $(currentThemeImg).removeClass('imgSelected');
    $(this).addClass('imgSelected');
    currentThemeImg = $(this);});
$("#img4").click(function(){ 
    $('body').css("background" , 'linear-gradient(to right, #4ECDC4, #556270)');
    $(currentThemeImg).removeClass('imgSelected');
    $(this).addClass('imgSelected');
    currentThemeImg = $(this);});
$("#img5").click(function(){ 
    $('body').css("background" , 'linear-gradient(to right, #00c3ff, #ffff1c)');
    $(currentThemeImg).removeClass('imgSelected');
    $(this).addClass('imgSelected');
    currentThemeImg = $(this);});
$("#img6").click(function(){ 
    $('body').css("background" , 'linear-gradient(to right, #fceabb, #f8b500)');
    $(currentThemeImg).removeClass('imgSelected');
    $(this).addClass('imgSelected');
    currentThemeImg = $(this);});
