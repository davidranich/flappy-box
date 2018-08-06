/* FLAPPY BIRD CLONE */

// Create our 'main' state that will contain the game

var mainState = {
    
        preload: function() {
            // load bird sprite
            game.load.image('bird', '/img/bird.png');
    
            // load pipe
            game.load.image('pipe', '/img/pipe.png');
    
            //game.load.audio('jump', '/sounds/jump.wav');
        },
    
        create: function() {
            game.input.mouse.capture = true;
    
            // change the background color of the game to blue
            game.stage.backgroundColor = '#71c5cf';
            
            // set physics 
            game.physics.startSystem(Phaser.Physics.ARCADE);
    
            // display the bird at the position x = 100 and y = 245
            this.bird = game.add.sprite(100, 245, 'bird');
    
            this.bird.anchor.setTo(-0.2, 0.5);
    
            // add physics to the bird
            // needed for: movement, gravity, collisions, etc.
            game.physics.arcade.enable(this.bird);
    
            // add gravity to the bird to make it fall
            this.bird.body.gravity.y = 1000;
    
            // call the 'jump' function when the space key is pressed
            var spaceKey = game.input.keyboard.addKey(
                            Phaser.Keyboard.SPACEBAR);
            spaceKey.onDown.add(this.jump, this);
            
            // call 'jump' function on touch / left mouse button is pressed

            game.input.onDown.add(this.jump, this);

            // adds pipes
            this.pipes = game.add.group();
            this.timer = game.time.events.loop(1500, this.addRowOfPipes, this);
    
            //this.jumpSound = game.add.audio('jump');
    
            this.score = 0;
            this.labelScore = game.add.text(20, 20, "0",
                { font: "30px Rajdhani", fill: "#fff" });
        },
    
        update: function() {
    
            if (this.bird.angle < 20) {
                this.bird.angle += 1;
            } 
    
            game.physics.arcade.overlap(this.bird, this.pipes, this.hitPipe, null, this);
            // if the bird is out of the screen
            // call the 'restartGame' function
            if (this.bird.y < 0 || this.bird.y > 490) {
                this.restartGame();
            }
        },
    
        jump: function() {
            if (this.bird.alive == false) {
                return;
            }
            var animation = game.add.tween(this.bird);
            animation.to({angle: -20}, 100);
            animation.start();
            //this.jumpSound.play();
    
            // adds verticle velocity to the bird
            this.bird.body.velocity.y = -350;
        },
    
        restartGame: function() {
            // starts game at 'main' state; restarting game
            game.state.start('main');
            //game.paused = false;
        },
    
        addOnePipe: function(x, y) {
            // create a pipe at 'x' and 'y'
            var pipe = game.add.sprite(x, y, 'pipe');
    
            // add the pipe to our previously created grup
            this.pipes.add(pipe);
    
            // enable physics on the pipe
            game.physics.arcade.enable(pipe);
    
            // add velocity to the pipe
            pipe.body.velocity.x = -200;
    
            // automatically kill the pipe when it's no longer visible
            pipe.checkWorldBounds = true;
            pipe.outOfBoundsKill = true;
        },
    
        addRowOfPipes: function() {
            // randomly picks a number between 1 and 5
            // hole position
            var hole = Math.floor(Math.random() * 5) + 1;
    
            // Add six pipes
            // One big hole at position 'hole' and 'hole + 1'
            for (var i = 0; i < 8; i++) {
                if (i != hole && i != hole + 1) {
                    this.addOnePipe(400, i * 60 + 10);
                }
            }
            this.labelScore.text = this.score;
            this.score += 1;
        },
    
        hitPipe: function() {
            // if the bird has already hit a pipe, do nothing
            // it means the bird is already falling off the screen
            if (this.bird.alive == false) {
                return;
            }
    
            // set the alive property of the bird to false
            this.bird.alive = false;
    
            // prevent new pipes from appearing
            game.time.events.remove(this.timer);
    
            // go through all of pipes, and stop their movement
            this.pipes.forEach(function(p) {
                p.body.velocity.x = 0;
            }, this);
        }
    };
    
    // Initialize Phaser, and create a 400px by 490px game
    
    var game = new Phaser.Game(400, 490);
    
    // Add the 'mainState' and call it 'main'
    game.state.add('main', mainState);
    
    // Start the state to actually start the game
    game.state.start('main');