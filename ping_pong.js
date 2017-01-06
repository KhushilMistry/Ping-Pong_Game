function Game() {
    var canvas = document.getElementById("game");
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.getContext("2d");
    this.context.fillStyle = "white";
}

Game.prototype.draw = function () {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillRect(this.width / 2, 0, 2, this.height);
};

Game.prototype.update = function () {
    if (this.paused)
        return;
};

var game = new Game();

function MainLoop() {
    game.update();
    game.draw();
    setTimeout(MainLoop, 33.3333);
}

MainLoop();