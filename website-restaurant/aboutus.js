$(document).ready(function(){
    $("#owner").click(function(){
        $('#owner').css({'text-decoration':'underline'});
        $('#staff').css({'text-decoration':'none'});
        $('#achievements').css({'text-decoration':'none'});
        $('#owner-content').css({'visibility':'visible'});
        $('#staff-content').css({'visibility':'hidden'});
        $('#achievements-content').css({'visibility':'hidden'});
        $('#about-pic-div').css({"background":"url('about-owner.jpg') center no-repeat"});
        $('#about-pic-div').css({"background-size":"cover"});
    });
    $("#staff").click(function(){
        $('#owner').css({'text-decoration':'none'});
        $('#staff').css({'text-decoration':'underline'});
        $('#achievements').css({'text-decoration':'none'});
        $('#staff-content').css({'visibility':'visible'});
        $('#owner-content').css({'visibility':'hidden'});
        $('#achievements-content').css({'visibility':'hidden'});
        $('#about-pic-div').css({"background":"url('about-staff.jpg') center no-repeat"});
        $('#about-pic-div').css({"background-size":"cover"});
    });
    $("#achievements").click(function(){
        $('#owner').css({'text-decoration':'none'});
        $('#staff').css({'text-decoration':'none'});
        $('#achievements').css({'text-decoration':'underline'});
        $('#achievements-content').css({'visibility':'visible'});
        $('#staff-content').css({'visibility':'hidden'});
        $('#owner-content').css({'visibility':'hidden'});
        $('#about-pic-div').css({"background":"url('about-achievements.jpg') center no-repeat"});
        $('#about-pic-div').css({"background-size":"cover"});
    });
});