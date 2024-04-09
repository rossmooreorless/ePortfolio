const aBox = document.querySelector('.a-box');
const aStart = document.querySelector('#a-start');
const aStop = document.querySelector('#a-stop');
const aSpeed = document.querySelector('#a-speed');
const aSpeedDisplay = document.querySelector('#a-speed-display');


//console.log(aStart);
//console.log(aStop);
//console.log(aSpeed);
//console.log(aSpeedDisplay);
//console.log(box);



// Animation

// Start Button
aStart.addEventListener('click', startAnimation);

function startAnimation(){        
    if (aBox.style.animationPlayState == 'running'){
        aBox.style.animationPlayState = 'paused';
    }           
                                                          // Declared Function
    aBox.style.animationPlayState = 'running';
}

// Animation Stop Button
aStop.addEventListener('click', function(){
    aBox.style.animationPlayState = 'paused';
    playSound();
});


// Animation Speed Control
aSpeed.addEventListener('change', function(e1){
    // Get the new value from the range input that has triggered this event and store it in 
    // a variable called speed.
    let speed = e1.currentTarget.value;
    // Update the span inner text to display the new speed value
    aSpeedDisplay.innerText = speed;

    // Set the speed of the animation to match the users section
    aBox.style.animationDuration = speed + 's';
});

// If animation iteration count is not set to infinite, play the sound when it stops
aBox.addEventListener('animationend', playSound);

// Function to play a sound when animation stops.
function playSound(){
    var audio = new Audio('audio/golfclap.mp3');

    audio.play();
    aBox.style.animationPlayState = 'paused';
} 