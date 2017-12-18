// level
// ledge with coins




let game = new Phaser.Game(
        1280,
        700,
        Phaser.AUTO,
        'game',
        {
            preload: preload,
            create: create,
            update: update
        }
    );

    let platforms, player, cursors;

    let score = 0, scoreText;

    let timeLabel, startTime, totalTime, timeElapsed, gameTimer;
    

function preload() {
    game.load.image('background', '../img/bg.jpg');
    game.load.image('clouds', '../img/clouds.png');
    game.load.image('ground', '../img/ground-3.png');
    game.load.image('star', '../img/star.png');
    game.load.spritesheet('santa', '../img/santa-2.png', 131, 150)
    
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
        
    game.add.tileSprite(0, 0, 4300, 700, 'background');
    game.add.tileSprite(0, 475, 4300, 225, 'clouds');
    
    game.world.setBounds(0, 0, 4300, 700);



    // platform
    // --------------------------------------------------------------------

    platforms = game.add.group();
    platforms.enableBody = true;


    let level = [1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 1];
    let levelLength = level.length;
    let ground;

    for (let i=0; i<levelLength; i++) {
        if (level[i]===1) {
            ground = platforms.create(270*i, game.world.height - 80, 'ground');
            game.physics.arcade.enable(ground);

            ground.body.immovable = true;
        }
    }

    let levelLedge = [2, 0, 1, 0, 2, 0, 1, 1, 0, 2, 2, 0, 1, 1, 2, 0];
    let levelLedgeLength = levelLedge.length;
    let ledge;

    for (let i=0; i<levelLedgeLength; i++) {
        
        switch (levelLedge[i]) {
            case 1:  
                ledge = platforms.create(270*i, 400, 'ground');
                game.physics.arcade.enable(ledge);
                ledge.body.immovable = true;

                ledge.body.checkCollision.down = false;
                ledge.body.checkCollision.left = false;
                ledge.body.checkCollision.right = false;

                break;

            case 2:
                ledge = platforms.create(270*i, 200, 'ground');
                game.physics.arcade.enable(ledge);
                ledge.body.immovable = true;

                ledge.body.checkCollision.down = false;
                ledge.body.checkCollision.left = false;
                ledge.body.checkCollision.right = false;

                break;

            default:
                break;
        }
    }
    
    

    // stars
    // --------------------------------------------------------------------

    stars = game.add.group();
    stars.enableBody = true;
    let star;

    for (let i = 0; i < levelLength; i++) {
        if (level[i] === 1) {
            star = stars.create(135+(270*i), 490, 'star');   
        } 
    }

    for (let i = 0; i < levelLedgeLength; i++) {
        if (levelLedge[i] === 2) {
            star = stars.create(135+(270*i), 80, 'star');   
        } else if (levelLedge[i] === 1) {
            star = stars.create(135+(270*i), 280, 'star'); 
        }
    }



    // score
    // --------------------------------------------------------------------

    scoreText = game.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#ffffff' });
    scoreText.fixedToCamera = true;



    // timer
    // --------------------------------------------------------------------

    startTime = new Date();
    totalTime = 45;
    timeElapsed = 0;

    createTimer();

    gameTimer = game.time.events.loop(100, function(){
        updateTimer();
    });

    function createTimer() {
        timeLabel = game.add.text(1120, 20, "00:00", {fontSize: "32px", fill: "#fff"});
        timeLabel.fixedToCamera = true;
    }

    function updateTimer() {
 
        let currentTime = new Date();
        let timeDifference = startTime.getTime() - currentTime.getTime();

        timeElapsed = Math.abs(timeDifference / 1000);
        
        if (Math.ceil(timeElapsed) >= totalTime) {
            player.body.velocity.y = -350;
            player.body.checkCollision.down = false

            game.time.events.stop();
        }
 
        let timeRemaining = totalTime - timeElapsed;
 
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = Math.floor(timeRemaining) - (60 * minutes);
 
        let result = (minutes < 10) ? "0" + minutes : minutes;
 
        result += (seconds < 10) ? ":0" + seconds : ":" + seconds;
 
        timeLabel.text = result;
    }



    // player
    // --------------------------------------------------------------------

    player = game.add.sprite(120, game.world.height - 230, 'santa');
    game.physics.arcade.enable(player);

    player.body.gravity.y = 300;

    player.animations.add('right', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11], 10, true);
    player.animations.add('left', [14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24], 10, true);
    
    cursors = game.input.keyboard.createCursorKeys();

    game.camera.follow(player);
}

function update() {
       
    game.physics.arcade.collide(stars, platforms);
    game.physics.arcade.collide(player, platforms);
    game.physics.arcade.overlap(player, stars, collectStar);

  

    function collectStar (player, star) {
        star.kill();

        score += 1;
        scoreText.text = 'Score: ' + score;
    }

    // move player
    // --------------------------------------------------------------------

    player.body.velocity.x = 0;

    if (cursors.right.isDown) {
        //  move right
        player.body.velocity.x = 150;
        player.animations.play('right');
        
    } else if (cursors.left.isDown) {
        //  move left
        player.body.velocity.x = -150;
        player.animations.play('left');
        
    } else {
        //  stop
        player.animations.stop();
        player.frame = 0;
    
    }

    // jump
    if (cursors.up.isDown && player.body.touching.down) {
        player.body.velocity.y = -400;
        
    }

    if (Math.ceil(timeElapsed) >= totalTime) {
        player.frame = 12;
    }


}

