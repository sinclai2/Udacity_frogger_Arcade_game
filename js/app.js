// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.checkCollision = function(player){
    if(
        player.x + 60 > this.x
        && player.x + 25 < this.x +99
        && player.y + 88 > this.y 
        && player.y < this.y + 66)
    {
        console.log("collided");
        player.reset();
    }
    if(player.y <= 0){
        player.reset();
        console.log("You won!");
        
        player.score += 1;
        player.level += 1
        increaseDifficulty(player.level)
    }

    // Prevent player from moving outside the canvas
    if(player.y > 383){
        player.y = 383;
    }
    if(player.x > 402.5){
        player.x = 402.5;
    }
    if(player.x < 2.5){
        player.x = 2.5;
    }  
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    // if enemy reach the end of canvas +200 start from 0
    if(this.x >= 705){
        this.x = 0;
    }

    this.checkCollision(player);

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed){
    Enemy.call(this, x, y, speed);
    this.sprite = "images/char-boy.png"
    this.score = 0;
    this.level = 1;
}

Player.prototype.reset = function(){
    this.x = 200
    this.y = 383;
}

Player.prototype.displayScoreAndLevel = function(){
    var canvas2 = document.querySelector("canvas");
    scoreLevelDiv.innerHTML = "<h3>Score: " + this.score + " Level: " + this.level + "</h3>";
    document.body.insertBefore(scoreLevelDiv, canvas2);
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    this.displayScoreAndLevel();
}

Player.prototype.handleInput = function(keyPress){
    if(keyPress == "left"){
        this.x -= this.speed;
    } 
    else if(keyPress == "up"){
        this.y -= this.speed - 20; // check before submit
    }
    else if(keyPress == "right"){
        this.x += this.speed;
    }
    else if(keyPress == "down"){
        this.y += this.speed - 20;
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];
var player = new Player(200, 383, 50);
// where score and level will be displayed
var scoreLevelDiv = document.createElement("div");
// create enemy object
var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 200);
allEnemies.push(enemy);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

var increaseDifficulty = function(level){
    // remove all previous enemies from canvas
    allEnemies.length = 0;
    // load new set of enimies
    for(var i = 0; i <= level; i++){
        var enemy = new Enemy(0, Math.random() * 184 + 50, Math.random() * 200);
        allEnemies.push(enemy);
    }
} // end increasesDifficulty
