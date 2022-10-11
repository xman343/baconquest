
// Module for Test Object

export class TestObj {
    constructor(game){
        this.game = game;
        this.width = 100;
        this.height = 100;
        this.x = this.game.width;
        this.y = this.game.height - 200;
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0; 
        this.speedX = -1;
        this.maxFrame = 0;
    }
    update(deltaTime){
        // Controls test object's motion across screen
        this.x += this.speedX;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
    draw(context){
        context.strokeRect(this.x, this.y, this.width, this.height);
    }
}