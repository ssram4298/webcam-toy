let width = 0.4*screen.width, height = 0, filter = 'none', streaming = false,val = 'none';

const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const slider = document.getElementById("myRange");
const saveBtn = document.getElementById('save-btn');
const photoBtn = document.getElementById('photo-btn');
const clearBtn = document.getElementById('clear-btn');
const photoFilter=document.getElementById('photo-filter');

slider.style.display = "none";

navigator.mediaDevices.getUserMedia({
    video: true,
    audio: false
}).then( (stream) => {
    video.srcObject = stream;
    video.play();
}).catch( (err)=> {
    console.log(`Error : ${err}`)
});

video.addEventListener('canplay', (e) => {
    if (!streaming) {
        if (width <= 400) {
            width = 400;
        }
        height = video.videoHeight / (video.videoWidth / width);

        video.setAttribute('height', height);
        video.setAttribute('width', width);
        canvas.setAttribute('height', height);
        canvas.setAttribute('width', width);
        
    }
}, false);

photoBtn.addEventListener('click' , (e) => {
    takePicture();
    e.preventDefault();
},false);


photoFilter.addEventListener('change', (e) => {
    switch (photoFilter.value) {
        case "none":
            slider.style.display = "none";
            break;
        case "blur":
            min = 0; max = 35; value = 10;
            slider.style.display = "block";
            val = photoFilter.value + `(${value}px)`;
            video.style.filter = val;
            console.log(`value: ${val}`);
            break;
        case "hue-rotate":
            min = 0; max = 360; value = 90;
            val = photoFilter.value + `(${value}deg)`;
            slider.style.display = "block";
            video.style.filter = val;
            console.log(`value: ${val}`);
            break;
        case "contrast":
            min = 100; max = 1000; value = 300;
            val = photoFilter.value + `(${value}%)`;
            slider.style.display = "block";
            video.style.filter = val;
            console.log(`value: ${val}`);
            break;
        default:
            min = 0; max = 100; value = 80;
            slider.style.display = "block";
            val = photoFilter.value + `(${value}%)`;
            video.style.filter = val;
            console.log(`value: ${val}`);
            break;
    }
    slider.min = min;
    slider.max = max;
    slider.value = value;
});

slider.oninput = function () {
    console.log(this.value);
    switch (photoFilter.value) {
        case "none":
            slider.style.display = "none";
            break;
        case "blur":
            value = this.value;
            val = photoFilter.value + `(${value}px)`;
            video.style.filter = val;
            console.log(`value: ${val}`);
            break;
        case "contrast":
            value = this.value;
            val = photoFilter.value + `(${value}%)`;
            video.style.filter = val;
            console.log(`value: ${val}`);
            break;
        case "hue-rotate":
            value = this.value;
            val = photoFilter.value + `(${value}deg)`;
            video.style.filter = val;
            console.log(`value: ${val}`);
            break;
        default:
            value = this.value;
            val = photoFilter.value + `(${value}%)`;
            video.style.filter = val;
            console.log(`value: ${val}`);
            break;
    }
}

clearBtn.addEventListener('click', (e) => {
    filter = 'none';
    video.style.filter = filter;
    slider.style.display = "none";
    photos.innerHTML = '';
    photoFilter.selectedIndex = 0;
    e.preventDefault();
});

function takePicture() {
    const context = canvas.getContext('2d');
    photos.innerHTML = '';
    if (width && height) {
        canvas.width = width;
        canvas.height = height;

        context.drawImage(video, 0, 0, width, height);

        const imgURL = canvas.toDataURL('image.png');
        console.log(atob('imgURL'));
        
        const img = document.createElement('img');

        img.setAttribute('src', imgURL);
        img.style.filter = val;
        console.log(val);
        photos.appendChild(img);
    }     
}
