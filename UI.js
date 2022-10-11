// UI Module

export class UI {
    constructor(game){
        this.game = game;
        this.fontFamily = 'Press Start P2';
        this.fontSize = 30;
    }
    draw(context){
        context.font = this.fontSize + 'px ' + this.fontFamily;
        context.textAlign = 'left';
        context.fillStyle = this.game.fontColor;
        // Score
        context.fillText('Score: ' + this.game.score, 20, 50);
    }
}