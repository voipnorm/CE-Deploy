/**
 * Created by christno on 1/31/19.
 *
 * JS functions just for the UI interaction
 *
 * Checkbox functions to hide and reveal file upload input
 */
function inRoomCheckBox() {
    var checkBox = document.getElementById("inRoomCheck");
    // Get the output text
    var inRoomDiv = document.getElementById("inRoomFileDiv");
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
        inRoomDiv.style.display = "block";
    } else {
        inRoomDiv.style.display = "none";
    }
}
function macroCheckBox() {
    // Get the checkbox
    var checkBox = document.getElementById("macroCheck");
    // Get the output text
    var macroDiv = document.getElementById("macroFileDiv");
    var macroNameDiv = document.getElementById("macroNameDiv");
    var macroName = document.getElementById("macroName");
    var macroActivateDiv = document.getElementById("macroActivateDiv");
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
        macroDiv.style.display = "block";
        macroNameDiv.style.display = "block";
        macroName.required = "true";
        macroActivateDiv.style.display = "block";
    } else {
        macroName.required = "false";
        macroDiv.style.display = "none";
        macroNameDiv.style.display = "none";
        macroActivateDiv.style.display = "none";
    }
}
function wallpaperCheckBox() {
    // Get the checkbox
    var checkBox = document.getElementById("wallpaperCheck");
    // Get the output text
    var wpDiv = document.getElementById("wallpaperFileDiv");
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
        wpDiv.style.display = "block";
    } else {
        wpDiv.style.display = "none";
    }
}

function brandingCheckBox() {
    // Get the checkbox
    var checkBox = document.getElementById("brandingCheck");
    // Get the output text
    var wpDiv = document.getElementById("brandingFileDiv");
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
        wpDiv.style.display = "block";
    } else {
        wpDiv.style.display = "none";
    }
}

$(document).ready(function() {
    $("#show_hide_password a").on('click', function(event) {
        event.preventDefault();
        if($('#show_hide_password input').attr("type") == "text"){
            $('#show_hide_password input').attr('type', 'password');
            $('#show_hide_password i').addClass( "fa-eye-slash" );
            $('#show_hide_password i').removeClass( "fa-eye" );
        }else if($('#show_hide_password input').attr("type") == "password"){
            $('#show_hide_password input').attr('type', 'text');
            $('#show_hide_password i').removeClass( "fa-eye-slash" );
            $('#show_hide_password i').addClass( "fa-eye" );
        }
    });
});