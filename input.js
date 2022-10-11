
//User input module.

export class InputHandler {
    constructor(){
        this.keys = [];
        // Dictates what to do when the up / down keys are pressed.
        window.addEventListener('keydown', e => {
            console.log(e.key);
            if ((e.key === 'ArrowDown' ||
                e.key === 'ArrowUp'
            )   && this.keys.indexOf(e.key) === -1){
                this.keys.push(e.key);
            }
            console.log(e.key, this.keys);

        });
        // Dictates what to do when up / down keys are released.
        window.addEventListener('keyup', e => {
            if (e.key === 'ArrowDown' ||
                 e.key === 'ArrowUp'){
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            console.log(e.key, this.keys);
        })
    }
}