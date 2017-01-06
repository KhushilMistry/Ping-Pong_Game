function Game() {
    var canvas = document.getElementById("game");
    this.width = canvas.width;
    this.height = canvas.height;
    this.context = canvas.getContext("2d");
    this.context.fillStyle = "white";
    this.keys = new KeyListener();

    this.p1 = new Paddle(5, 0);
    this.p1.y = this.height / 2 - this.p1.height / 2;
    this.p2 = new Paddle(this.width - 5 - 2, 0);
    this.p2.y = this.height / 2 - this.p2.height / 2;
}

Game.prototype.draw = function () {
    this.context.clearRect(0, 0, this.width, this.height);
    this.context.fillRect(this.width / 2, 0, 2, this.height);

    this.p1.draw(this.context);
    this.p2.draw(this.context);
};

Game.prototype.update = function () {
    if (this.paused)
        return;

    if (this.keys.isPressed(83)) {
        this.p1.y = Math.min(this.height - this.p1.height, this.p1.y + 4);
    } else if (this.keys.isPressed(87)) {
        this.p1.y = Math.max(0, this.p1.y - 4);
    }

    if (this.keys.isPressed(40)) {
        this.p2.y = Math.min(this.height - this.p2.height, this.p2.y + 4);
    } else if (this.keys.isPressed(38)) {
        this.p2.y = Math.max(0, this.p2.y - 4);
    }
};

function KeyListener() {
    this.pressedKeys = [];

    this.keydown = function (e) {
        this.pressedKeys[e.keyCode] = true;
    };

    this.keyup = function (e) {
        this.pressedKeys[e.keyCode] = false;
    };

    document.addEventListener("keydown", this.keydown.bind(this));
    document.addEventListener("keyup", this.keyup.bind(this));
}

KeyListener.prototype.isPressed = function (key) {
    return this.pressedKeys[key] ? true : false;
};

KeyListener.prototype.addKeyPressListener = function (keyCode, callback) {
    document.addEventListener("keypress", function (e) {
        if (e.keyCode == keyCode)
            callback(e);
    });
};


function Paddle(x, y) {
    this.x = x;
    this.y = y;
    this.width = 2;
    this.height = 28;
    this.score = 0;
}

Paddle.prototype.draw = function (p) {
    p.fillRect(this.x, this.y, this.width, this.height);
}


var game = new Game();

function MainLoop() {
    game.update();
    game.draw();
    setTimeout(MainLoop, 33.3333);
}

MainLoop();