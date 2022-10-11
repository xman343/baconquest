
// Module for player character.

export class Player {
    constructor(game){
        this.game = game;
        this.width = 93;
        this.height = 65;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.image = document.getElementById('player');
        this.frameX = 0;
        this.frameY = 0;
        this.maxFrame = 4;
        this.fps = 16;
        this.frameInterval = 1000/this.fps;
        this.frameTimer = 0;
        this.speed = 0;
        this.maxSpeed = 10;
        this.weight = .28;
        this.gameOver = false;
    }
    update(input, deltaTime){
        // Collision detection
        this.checkCollision();
        this.checkEnemyCollision();
        // Player movement.
        
        // Controls vertical movement (jumping).
        this.y += this.speed;
        // Causes player to jump.
        if (this.onGround()){
            if (input.includes('ArrowUp')){
                this.speed -= 10;
            } else {
                this.speed = 0;
            }
        } 
        // Causes player to fall after jumping.
        if (!this.onGround()){
            if (input.includes('ArrowDown')){
                this.speed += 10;
            } else {
                this.speed += this.weight;
            }
        } 

        // If player is on ground, speed doesn't change.
        else this.speed - 0;
        // Establishes lower and upper impassable boundaries of game.
        if (this.y > 435) this.y = 435;
        if (this.y < 0) this.y = 0;

        // Sprite animation
        if (this.frameTimer > this.frameInterval){
            this.frameTimer = 0;
            if (this.frameX < this.maxFrame) this.frameX++;
            else this.frameX = 0;
        } else {
            this.frameTimer += deltaTime;
        }
    }
    // Draws player frame.
    draw(context){
        // Player image
        context.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    // Function that determines whether player is on ground.
    onGround(){
        return this.y >= this.game.height - this.height;
    }

    checkCollision(){
        this.game.bacon.forEach(bacon => {
            if (
                bacon.x < this.x + this.width && 
                bacon.x + bacon.width > this.x &&
                bacon.y < this.y + this.height &&
                bacon.y + bacon.height > this.y
            ){
                // collision detected 
                bacon.markedForDeletion = true;
                this.game.score++;
            } else {
                // no collision
            }
        });
    }
    checkEnemyCollision(){
        this.game.enemies.forEach(enemies => {
            if (
                enemies.x < (this.x + this.width) - 10 &&
                enemies.x + enemies.width > this.x + 10 &&
                enemies.y < this.y + this.height &&
                enemies.y + enemies.height > this.y
            ){
                // collision detected
                this.gameOver = true;
            } else {
                // no colision
            }
        });
    }
}