var bird = new Image()
var bg = new Image()
var fg = new Image()
var pipebot = new Image()
var pipeup = new Image()
var bird1 = new Image()
var bird2 = new Image()
let canvas = document.querySelector('#canvas')
let context = canvas.getContext("2d")
score = 0

bird.src = 'vverh.png'
bg.src = 'flappy_bird_bg.png'
fg.src = 'flappy_bird_fg.png'
pipebot.src = 'flappy_bird_pipeBottom.png'
pipeup.src = 'flappy_bird_pipeUp.png'
bird1.src = 'seridina.png'
bird2.src = 'niz.png'


function randint(min, max){
    return Math.round(Math.random()*(max-min)+min)
}



let pipes = []
pipes[0]={
    x:canvas.width,
    y:randint(-240,0)
}


crashed = false
birdframe = 0
const birdframes = [bird1, bird, bird2]
ybird = 256
xbird = 120
gravit = 1
a = 0
xfg1 = 0
xfg2 = 121
birdrotate = 0
x = 0
hhh = 0


function Jump(){
    ybird -= 50
    gravit=1
    birdrotate = -30
    x = 0
}


function Crush(){
    for(let i=0; i<pipes.length;i+=1){
        if(ybird + bird.height>=pipes[i].y && ybird + bird.height<=pipes[i].y+pipeup.height && xbird + bird.width>=pipes[i].x && xbird + bird.width<=pipes[i].x+pipeup.width){
            return true
        }
        else if(ybird + bird.height>=pipes[i].y+pipeup.height+150 && ybird + bird.height<=pipes[i].y+pipeup.height+150+pipeup.height && xbird + bird.width>=pipes[i].x && xbird + bird.width<=pipes[i].x+pipeup.width){
            return true
        }
        else if(ybird + birdframes[birdframe].height/2 >= 368){
            hhh += 1
        }
    }   
}



function Draw(){
    context.drawImage(bg,0,0)
    for(let i=0; i<pipes.length;i+=1){
        context.drawImage(pipeup,pipes[i].x,pipes[i].y)
        context.drawImage(pipebot,pipes[i].x,pipes[i].y+pipeup.height+150)
        pipes[i].x-=1
        if(pipes[i].x==125){
            pipes.push({
                x:canvas.width,
                y:randint(-240,0)})
        }

        if(pipes[i].x<-60){
            pipes.splice(i, 1)
        }
        if(pipes[i].x==125){
            score+=1
        }
        
        if(Crush()){
            crashed = true
        }
        if(hhh >= 1){
            crashed = true
            hhh = 0 
        }
    }


    
    context.drawImage(fg,xfg1,canvas.height-fg.height)
    xfg1-=1
    context.drawImage(fg,121 + xfg1,canvas.height-fg.height)
    if(xfg1<-120){
        xfg1 = 0
    }






    context.save()
    context.translate(xbird + birdframes[birdframe].width/2,ybird + birdframes[birdframe].height/2)
    context.rotate(birdrotate*Math.PI/180)
    context.drawImage(birdframes[birdframe],-birdframes[birdframe].width/2,-birdframes[birdframe].height/2)
    context.restore()
    a+=1
    if(a%20==0){
        birdframe = (birdframe+1)%birdframes.length
    }
    if(a%9==0){
        ybird += gravit
        gravit+= 1
        if(birdrotate < 90){
            birdrotate += x
            x += 2
        }
    }

    context.fillStyle="#000"
    context.font="24px Verdana"
    context.fillText("score: " + score, 20, 20)
    if(!crashed){
        requestAnimationFrame(Draw)
    }
    else{
        setTimeout(() => {
            location.reload()
        }, 1000)
    }
}


document.addEventListener('keydown', Jump)
document.addEventListener('touchstart', Jump)

pipebot.onload = Draw