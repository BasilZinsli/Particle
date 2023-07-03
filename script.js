const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let particleArray = [];
let adjustX = 10;
let adjustY = 10;

const mouse = {
    x: null,
    y: null,
    radius: 300
}

window.addEventListener('mousemove', (e) =>{
mouse.x = e.x;
mouse.y = e.y;
console.log(mouse.x, mouse.y);
});

ctx.fillStyle ='white';
ctx.font ='30px Verdana';
ctx.fillText('SELUXXS', 0, 30);
const textCoordinates = ctx.getImageData(0, 0, canvas.width, canvas.height);


class Particle {
    constructor (x,y){
        this.x = x;
        this.y = y;
        this.size = 3;
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = (Math.random()*20)+1;
        this.red = 255;
        this.gelb = 153;
        this.blue = 51;
    }

    draw(){
        ctx.fillStyle =("RGBA("+ String(this.red) + "," +String(this.gelb)+","+String(this.blue)+","+"1)");    
        ctx.beginPath();
        ctx.arc(this.x, this.y,this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
        
    } 

    update(){ //Whatever should happen when contact with cursor
        
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx*dx +dy*dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance -distance) / maxDistance;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
       
        if (distance < mouse.radius) {
            this.x -= directionX;
            this.y -= directionY; 
            this.red = Math.random()*256+1;
            this.gelb = Math.random()*256+1;
            this.blue = Math.random()*156+1;

        } else{
            if(this.x !== this.baseX){
             let dx = this.x - this.baseX;
             this.x -= dx/10;   
            }
            if(this.y !== this.baseY){
                let dy = this.y - this.baseY;
                this.y -= dy/10;   
            }
        }
        if (distance > 400){
            let dr = this.red - 255;
            this.red -= dr/100;
            let dg = this.gelb - 153;
            this.gelb -= dg/100;
            let db = this.blue - 51;
            this.blue -= db/100;
           
        }
    }  
}

function init () {
    particleArray = [];
   for (let y=0, y2 = textCoordinates.height; y<y2; y++){
        for (let x=0, x2 = textCoordinates.width; x<x2; x++){
         if (textCoordinates.data[(y * 4 * textCoordinates.width)+(x * 4)+3] > 128){
            let positionX = x + adjustX;
            let positionY = y + adjustY;
            particleArray.push(new Particle(positionX*12,positionY*12));
            }
        }  
    }
    
}

init();
console.log(particleArray);

function animate(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for(let i = 0; i < particleArray.length; i++){
        particleArray[i].draw();
        particleArray[i].update();
    }
    requestAnimationFrame(animate);
}

animate();
