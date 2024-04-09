const prefs_icon_link = document.querySelector('#prefs-icon');
const prefs_panel = document.querySelector('#prefs-panel')
const body = document.querySelector('body');
const sections = document.querySelectorAll('.main-section');
const userResetBtn = document.querySelector('#user-reset');
const userNameSpan = document.querySelector('#user-name');
const welcomeSection = document.querySelector('#welcome-section');
const backgroundColorPicker = document.querySelector('#prefs-bg-color');
const fontColorPicker = document.querySelector('#prefs-font-color');
const fontSizeRange = document.querySelector('#prefs-font-size');
const prefReset = document.querySelector('#prefs-reset');
const fontSizeDisplay = document.querySelector('#font-size');
const prefTable = document.querySelector('#prefs-table');
const prefSaveBtn = document.querySelector('#prefs-save');
const prefClearBtn = document.querySelector('#prefs-clear');
const menuIcon = document.querySelector('#burger-menu');
const navLinks = document.querySelector('#nav-links');

var defaultSettings = {}; 
// console.log(prefReset);
// console.log(fontColorPicker);
// console.log(fontSizeRange);
// console.log(backgroundColorPicker);
// console.log(welcomeSection);
// console.log(userNameSpan);
// console.log(prefs_panel);
// console.log(body);
// console.log(sections);
// console.log(userResetBtn);
// console.log(prefTable);
// console.log(prefSaveBtn);
// console.log(prefClearBtn);
console.log(menuIcon);
console.log(navLinks);


// Username settings


// when the page loads
// If a user name has previously been saved to local storage, retrieve its value and 
// use it to welcome the user.
// otherwise prompt them to provide their name, save it to local storage and use it
// to welcom them.
 

window.onload = function(){
    if(localStorage.getItem('UserName'))
    {
        userNameSpan.innerText = localStorage.getItem('UserName');
    }
    else
    {
        setUserName();
    }

    let defSet = getDefaults();
    setPrefPanelValues(defSet);

}

// function to ask for a username and save it to local storage
function setUserName(){
    
    let name = prompt('Hello, welcome! Please provide a username:');
    
    if(name)
    {
        localStorage.setItem('UserName', name);
        userNameSpan.innerText = localStorage.getItem('UserName');
    }

    else
    {
        localStorage.setItem('UserName', 'Anonymous');
        userNameSpan.innerText = localStorage.getItem('UserName');     
    }
}


// Reset the username when the reset button is clicked

userResetBtn.addEventListener('click', setUserName);


// Default Settings

let sectionComputedStyles = getComputedStyle(welcomeSection);
// console.log(sectionComputedStyles);
defaultSettings.bgColor = rgbToHex(sectionComputedStyles.backgroundColor);
defaultSettings.fontColor = rgbToHex(sectionComputedStyles.color);
defaultSettings.fontSize = parseInt(sectionComputedStyles.fontSize);

// save the default settings to local storage using JSON

localStorage.setItem('Defaults', JSON.stringify(defaultSettings));
// console.log(JSON.stringify(defaultSettings));
// console.log(defaultSettings);
//console.log(defaultSettings.fontSize);

// Set preferences to default
prefReset.addEventListener('click', function(){
        let defSet = getDefaults();
        applySettings(defSet);
        setPrefPanelValues(defSet);
});

// Function to get the default settings from local storage
function getDefaults(){
    let defSet;
    if(localStorage.Defaults){
        defSet = JSON.parse(localStorage.Defaults);
    }
    return defSet;
}

// Function to apply new settings to the sections
function applySettings(settings){
    for(let i = 0; i < sections.length; i++) 
    {
        let currentSection = sections[i];
        currentSection.style.backgroundColor = settings.bgColor; 
        currentSection.style.color = settings.fontColor;
        currentSection.style.fontSize = settings.fontSize + 'px';
    }
}

// Function to set the control values in the preference panel 
function setPrefPanelValues(settings){
    backgroundColorPicker.value = settings.bgColor;
    fontColorPicker.value = settings.fontColor;
    fontSizeRange.value = settings.fontSize;
    fontSizeDisplay.innerText = settings.fontSize;
}



// User Preferences


var tempSettings = null;
// Apply changes as the preference controls are toggled by the user.
prefTable.addEventListener('change', function(){

    var tempSettings = {};

    tempSettings.bgColor = backgroundColorPicker.value;
    tempSettings.fontColor = fontColorPicker.value; 
    tempSettings.fontSize = fontSizeRange.value;

    fontSizeDisplay.innerText = tempSettings.fontSize;

    console.log(backgroundColorPicker);
    console.log(tempSettings.bgColor);
    console.log(tempSettings.fontColor);
    console.log(tempSettings.fontSize);

    applySettings(tempSettings);
});

// Save the user defined preferences
prefSaveBtn.addEventListener('click', function(){
    var tempSettings = {};

    tempSettings.bgColor = backgroundColorPicker.value;
    tempSettings.fontColor = fontColorPicker.value; 
    tempSettings.fontSize = fontSizeRange.value;

    if(tempSettings){
        localStorage.setItem('UserSettings', JSON.stringify(tempSettings));
        alert('CONGRATULATIONS!!! You have changed your preferences successfully :)')
    }
    else{
        warn("BOOOO... Your preferences haven't changed :(");
    }
});

prefClearBtn.addEventListener('click', function(){
    if(localStorage.UserSettings){
        let userSet = JSON.parse(localStorage.UserSettings);
        applySettings(userSet);
        setPrefPanelValues(userSet);
    }
    else{
        let defSet = JSON.parse(localStorage.Defaults);
        applySettings(defSet);
        setPrefPanelValues(defSet);
    }
});









prefs_icon_link.addEventListener('click', prefsIconClick);
prefs_icon_link.addEventListener('mouseout', prefsIconMouseOut);
prefs_icon_link.addEventListener('mouseover', prefsIconMouseOver);

function prefsIconClick(){
    prefs_icon_link.firstElementChild.setAttribute('class', "fa-solid fa-gear fa-flip fa-lg");
    prefs_icon_link.firstElementChild.setAttribute('style', "--fa-animation-duration: 1s; --fa-animation-iteration-count: 2;");
    if(prefs_panel.style.display == 'block')
    {
        prefs_panel.style.display = 'none';
    }
    else
    {
        prefs_panel.style.display = 'block';
    }
}

function prefsIconMouseOut(){
    prefs_icon_link.firstElementChild.setAttribute('class', "fa-solid fa-gear fa-bounce");
    prefs_icon_link.firstElementChild.setAttribute('style', "--fa-animation-duration: 1s;");
}

function prefsIconMouseOver(){
    prefs_icon_link.firstElementChild.setAttribute('class', "fa-solid fa-gear fa-spin fa-lg");
    prefs_icon_link.firstElementChild.setAttribute('style', "--fa-animation-duration: 1s; --fa-animation-iteration-count: 5;");
}

// Function to convert RGB colors to Hexadecimal color values
function rgbToHex(rgb)
{
    // Get the Red, Green, Blue values from the rgb() value
    // rgb    (187,  182,  165)

    // Set the sperator
    // let sep;
    // if(rgb.indexOf(',') > -1){
    //     sep = rgb.indexOf(',')
    // }
    // else{
    //      sep = ' ';    
    // }

    // Ternary Operator can be used instead of a simple if statement as above
    // Syntax:
// Variable = condition              true   false
    let sep = rgb.indexOf(',') > -1 ? ',' : ' ';
    let rgbString; 

    if(rgb.includes('a'))
    {
        // split rgb using the seperator 
        rgbString = rgb.substr(5).split(')')[0].split(sep);
    }
    else
    {
        rgbString = rgb.substr(4
            ).split(')')[0].split(sep);
    }

    let red = (+rgbString[0]).toString(16).trim();
    let green = (+rgbString[1]).toString(16).trim();
    let blue = (+rgbString[2]).toString(16).trim();

    // console.log(red);
    // console.log(green);
    // console.log(blue);

    if(red.length == 1){
        red = '0' + red;
    }

    if(green.length == 1){
        green = '0' + green;
    }

    if(blue.length == 1){
        blue = '0' + blue;
    }

    let hex = '#';

    hex = hex + red + green + blue;
    // console.log(hex);
    return hex;
}

/* Burger Menu */
menuIcon.addEventListener('click', function(){
    if(navLinks){
        if(navLinks.style.display == 'block'){
            navLinks.style.display = 'none';
        }
        else{
            navLinks.style.display = 'block';
        }
    }
    else{
        console.log('Could not find navLinks!!!')
    }
    
});