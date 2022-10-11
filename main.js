
// Main module for the game program.

import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Fence } from './enemies.js';
import { Bacon } from './bacon.js';
import { UI } from './UI.js';

// Loads the game engine and primes it for user input.
window.addEventListener('load', function(){
    // Retrieves canvas information from CSS. 
    const canvas = document.getElementById('canvas1');
    const ctx = canvas.getContext('2d');
    const restartButton = document.getElementById('restartButton');
    const startButton = document.getElementById('startButton');
    // Sets canvas dimensions.
    canvas.width = 500;
    canvas.height = 500;

    // Game Class
    class Game {
        // Imports canvas info, player and input modules for game logic.
        constructor(width, height){
            this.width = width;
            this.height = height;
            this.player = new Player(this);
            this.bacon = [];
            this.baconTimer = 0;
            this.baconInterval = 1000;
            this.input = new InputHandler();
            this.UI = new UI(this);
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;
            this.score = 0;
            this.gameOver = false;
            this.gameStart = false;

        }
        // Allows key input and change in time to update game, given
        // the optional argument deltaTime.
        update(deltaTime){
            this.player.update(this.input.keys, deltaTime);
            if (this.gameStart == false){
                this.startScreen();
            } else {
                // Handle enemies
                if (this.enemyTimer > this.enemyInterval){
                    this.addEnemy();
                    this.enemyTimer = 0;
                } else {
                    this.enemyTimer += deltaTime;
                }
                this.enemies.forEach(enemy => {
                    enemy.update(deltaTime);
                    if (enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy), 0);
                });
                // Handle bacon
                if (this.baconTimer > this.baconInterval){
                    this.addBacon();
                    this.baconTimer = 0;
                } else {
                    this.baconTimer += deltaTime;
                }
                this.bacon.forEach(bacon => {
                    bacon.update(deltaTime);
                    if (bacon.markedForDeletion){
                        this.bacon.splice(this.bacon.indexOf(bacon), 1);
                    } 
                });
            }


        }
        // Draws the player, enemies, and bacon.
        draw(context){
            if (this.player.gameOver == false){
                this.player.draw(context);
                this.enemies.forEach(enemy => {
                    enemy.draw(context);
                });
                // Draw bacon
                this.bacon.forEach(bacon =>{
                    bacon.draw(context);
                })
                this.UI.draw(context);
            } else {
                this.gameEnd()
            }
        }
        addEnemy(){
            this.enemies.push(new Fence(this));
        }
        // Add bacon
        addBacon(){
            this.bacon.push(new Bacon(this));
        }
        // TODO: Reset function
        gameEnd(){
            this.bacon = [];
            this.enemies = [];
            this.overScreen(ctx);
            // document.location.reload();
        }

        overScreen(){
            const overText = 'Score: ' + this.score;
            ctx.fillText('Game Over', 115, 100);
            ctx.fillText(overText, 120, 300);
            restartButton.style.display = 'Block';
        }

        gameResetFunc(){
            console.log("Restart pressed");
            this.player.gameOver = false;
            restartButton.style.display = 'None';
            this.bacon = [];
            this.enemies = [];
            this.score = 0;
            this.player.y = game.height;
            this.gameStart = true;
        }   

        startScreen(){
            ctx.fillText('BaconQuest!', 100, 120);
            ctx.fillText('Up-Arrow:   Jump', 10, 200);
            ctx.fillText('Down-Arrow: Slam', 10, 240);
            startButton.style.display = 'Block';
        }

        gameStartFunc(){
            startButton.style.display = 'None';
            this.gameStart = true;
        }
    }   

    // Initializes game instance. 
    const game = new Game(canvas.width, canvas.height);
    let lastTime = 0;


    // Function that creates animation loop. 
    // timeStamp = current time elapsed since start of game instance.
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        // Clears previous frame in preparation for next frame.
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Calls game to update deltaTime.
        game.update(deltaTime);
        // Calls game to draw new frame.
        game.draw(ctx);
        // Draws animation frame.
        requestAnimationFrame(animate);
    }
    // Calls the animate function described above.
    // Keeps track of score
    animate(0);

    // Start Button

    startButton.addEventListener("click", function() {
        game.gameStartFunc();
    })

    this.window.addEventListener("keypress", function(e) {
        if (e.key === 'Enter'){
            game.gameStartFunc();
        }
    })
    // Reset Button

    restartButton.addEventListener("click", function() {
        game.gameResetFunc();
   })

   this.window.addEventListener("keypress", function(e) {
    if (game.player.gameOver === true && e.key === 'Enter'){
        game.gameResetFunc();
    }
   })

});

