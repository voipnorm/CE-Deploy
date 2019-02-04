/**
 * Created by christno on 1/31/19.
 *
 * JS functions just for the UI interaction
 *
 * Checkbox functions to hide and reveal file upload input
 */
function inRoomCheckBox() {
    // Get the checkbox
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
    // If the checkbox is checked, display the output text
    if (checkBox.checked == true){
        macroDiv.style.display = "block";
    } else {
        macroDiv.style.display = "none";
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