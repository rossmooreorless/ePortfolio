const container = document.querySelector('#g-container');
// console.log(container);

// Function to place the selected image into g-container.
function loadImage(prevImage){
    //container.innerHTML = prevImage.alt;
    container.innerHTML = '';
    container.style.backgroundImage = 'url(' + prevImage.src + ')';
}

// Function to remove the image from g-container.
function unloadImage(){
    container.innerHTML = 'Hover on a preview image below to view it here!';
    container.style.backgroundImage = 'url("")';
}