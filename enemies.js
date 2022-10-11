
// Module for enemies.

import {randInt} from './randint.js';

class Enemy {
    constructor(){
       this.frameX = 0;
       this.frameY = 0;
       this.fps = 20;
       this.frameInterval = 1000/this.fps;
       this.frameTimer = 0; 
       this.markedForDeletion = false;
    }
    update(deltaTime){
        // Movement
        this.x += this.speedX;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        // Check if enemy is off screen
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context){
        // Draws bounding box
        context.strokeRect(this.x, this.y, this.width, this.height);
        // Draws gate image
        context.drawImage(this.image, this.frameX * this.width, 0, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}

export class Fence extends Enemy {
    constructor(game){
        super();
        this.game = game;
        this.image = document.getElementById("fence");
        this.width = 56;
        this.height = 34;
        // Randomly distributes fences across game field.
        // Note: 128 = twice the fence's actual size in pixels.
        this.x = ((this.game.width * 2) + ((randInt(2)) * 128));
        this.y = 470;
        this.speedX = -3.5;
        this.maxFrame = 0;
    }
    update(deltaTime){
        super.update(deltaTime);
    }
}