Dot = class{
    constructor(){
        this.x;
        this.y;
        this.width;
        this.height;
        this.dead = false;
        this.reachGoal = false;
        this.brain = new Brain(200);
        this.brain.initialDirections();
    }

    startPos = function(x,y){
        this.x = x;
        this.y = y;
    }

    update = function(value,width,height,gridNum){
        this.width = width / gridNum;
        this.height = height / gridNum;
        if (value == 3){
            this.dead = true;
        } else if (value == 1){
            this.reachGoal = true;
        }
        this.move();
        this.draw();
    }

    move = function(){
        let direction = this.brain.directions.pop();
        if (!this.dead && !this.reachGoal && this.brain.step < this.brain.size){
            switch (direction){
                case 0:
                    this.x -= 1;
                    this.y += 1;
                    break;
                case 1:
                    this.y += 1;
                    break;
                case 2:
                    this.x += 1;
                    this.y += 1;
                    break;
                case 3:
                    this.x -= 1;
                    break;
                case 4:
                    this.x += 1;
                    break;
                case 5:
                    this.x -= 1;
                    this.y -= 1;
                    break;
                case 6:
                    this.y -= 1;
                    break;
                case 7:
                    this.x += 1;
                    this.y -= 1;
                    break;   
                default:
                    break;
            }
            ++this.brain.step;
        } else{
            this.dead = true;
        }
    }

    draw = function(){
        ctx.save();
        ctx.fillStyle = 'orange';
        ctx.fillRect(this.x * this.width,this.y * this.height,this.width,this.height);
        ctx.restore();
    }

    getDot = function(){
        return {
            x: this.x,
            y: this.y
        }
    }
}

Brain = class{
    constructor(size){
        this.size = size;
        this.directions = [];
        this.step = 0;
    }

    initialDirections = function(){
        for (let i = 0; i<this.size; i++){
            let randomNum = Math.floor(Math.random() * 8);
            this.directions.push(randomNum);
        }
    }
}