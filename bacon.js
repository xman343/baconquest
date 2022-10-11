
// Module for collectible bacon

import {randInt} from './randint.js';
import {Player} from './player.js';

export class Bacon {
    constructor(game){
        this.game = game;
        this.image = document.getElementById('bacon');
        this.width = 33;
        this.height = 36;
        this.x = ((this.game.width) + ((randInt(3)) * this.width));
        this.y = this.game.height - (this.height * (randInt(3))+this.height);
        this.frameX = 0;
        this.frameY = 0;
        this.fps = 20;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0; 
        this.speedX = -3.5;
        this.maxFrame = 0;
        this.markedForDeletion = false;
        this.player = Player;
        this.player.x = Player.x;
        this.player.y = Player.y;
    }
    update(deltaTime){
        // Controls bacon's movement across screen
        this.x += this.speedX;
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
        // Check if bacon is off screen
        if (this.x + this.width < 0) this.markedForDeletion = true;
    }
    draw(context){
        // Bacon image
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
}