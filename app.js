getjoke();
var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
};

var maxRadius = 40;

var colorArray = [
    '#2C3E50',
    '#E74C3C',
    '#ECF0F1',
    '#3498DB',
    '#2980B9'
];
window.addEventListener('mousemove', function(event) {
    mouse.x = event.x;
    mouse.y = event.y;
})
window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;


    init();
})

function Circle(x, y, dx, dy, radius) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.minRadius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }
    this.update = function(){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;


        // Interactivity
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if(this.radius < maxRadius) {
                this.radius += 1;
            }
        }else if(this.radius > this.minRadius) {
            this.radius -= 1;
        }
        this.draw();

    }
}
var circleArray = [];
function init() {

    circleArray = [];

    for (var i = 0; i < 800; i++) {
        var radius = Math.random() * 3 + 1;
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 2;
        var dy = (Math.random() - 0.5) * 2;
        circleArray.push(new Circle(x, y, dx, dy, radius));
    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight)

    for(var i = 0; i < circleArray.length; i++) {
        // Do SomeThing
        circleArray[i].update();
    }
}
init();
console.log(animate());



// Jokes Count
// Counting Clicks
var clicks = 1;
var newQuote = document.getElementById('gen');
newQuote.addEventListener('click', () => {
    getjoke();
    clicks += 1
    document.getElementById('count').innerText = clicks;
});


// icanhazdadjoke Joke API Request
var main = document.getElementById('main-quote').innerText;
async function getjoke() {
    const jokedata = await fetch('https://icanhazdadjoke.com/', {
        headers: {
            'Accept': 'application/json'
        }
    });
    var jokeObj = await jokedata.json();
    document.getElementById('main-quote').innerText = jokeObj.joke;
    quote = jokeObj.joke;
};




// Counting Site Visits Using The Count Api
var stats = document.getElementById('stats');

function countApi() {
    fetch('https://api.countapi.xyz/update/ayomide/youtube/?amount=1')
    .then(res => res.json())
    .then(res => {
        stats.innerText = res.value;
    });
}
countApi();


//Text To Speech
var msg = new SpeechSynthesisUtterance();
var listen = document.getElementById('listen');
listen.addEventListener('click', () => {
    msg.text = document.getElementById('main-quote').innerText;
    window.speechSynthesis.speak(msg);
});

