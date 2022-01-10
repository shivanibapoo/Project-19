var meteorit, meteoritImg, meteoritsGroup;
var rocket, rocketImg;
var space, spaceImg;
var star, starImg, starsGroup;
var invisibleBlock, invisibleBlockGroup;
var score = 0;
var gameState = "play";

function preload(){
    meteoritImg = loadImage("Meteorit.png");
    rocketImg = loadImage("rocket2.png");
    spaceImg = loadImage("space.png");
    starImg = loadImage("star2.png");
}

function setup() {
    createCanvas(400,400);
    
    space = createSprite(200,200,400,800);
    space.addImage("space",spaceImg);
    space.velocityY = 2;

    rocket = createSprite(200, 50)
    rocket.addImage("rocket",rocketImg);
    rocket.scale = 0.1;

    starsGroup = new Group();
    meteoritsGroup = new Group();
    invisibleBlockGroup = new Group();
    

}

function draw() {
    background(200);

    function displayScore(){
        stroke("red");
        fill("red");
        textSize(15);
        text('score: ' + score, 20,50);
    };

    function handleStarCollision(){
        for (let i = 0; i < starsGroup.size(); i++) {
            var star = starsGroup.get(i);
            if(star.isTouching(rocket)) {
                starsGroup.remove(star);
                star.remove();
                score++;
                break;
            }
        }           
    };
    
    if(gameState === "play"){

        if(space.y > 400){
            space.y = 200;
        }   
        
        if(keyDown("space")){
            console.log("The game state is: " + gameState);
            rocket.velocityY = -5;
        }
        rocket.velocityY = rocket.velocityY + 0.2;

        if(keyDown("left")){
            rocket.x = rocket.x - 3;
        }

        if(keyDown("right")){
            rocket.x = rocket.x + 3;
        }

        if(starsGroup.isTouching(rocket)){
            handleStarCollision();
        }

        if (meteoritsGroup.isTouching(rocket)){
            rocket.velocityY = 0;
        }

        if (invisibleBlockGroup.isTouching(rocket) || rocket.y > 400){
            rocket.destroy();
            gameState = "end";
        }
    }
    
    spawnGroups();
    drawSprites();
    displayScore();

    if(gameState === "end"){
        background("black");
        stroke("red");
        fill("red");
        textSize(20);
        text("Game Over", 150, 200);
    }

}

function spawnGroups(){
    
    var rem = frameCount%100;
    if(rem===0) {

        star = createSprite(50, -50);
        starsGroup.add(star);
        star.x = Math.round(random(50, 350));
        starsGroup.setLifetimeEach(400);
        star.scale = 0.05;
        star.addImage("star", starImg);
        star.velocityY = 1;

        meteorit = createSprite(350, -350);
        meteoritsGroup.add(meteorit); 
        meteorit.x = Math.round(random(50,350));
        meteoritsGroup.setLifetimeEach(400);
        meteorit.scale = 0.1;
        meteorit.addImage("meteorit", meteoritImg);
        meteorit.velocityY = 1.5;

        invisibleBlock = createSprite(350, -350);
        invisibleBlockGroup.add(invisibleBlock);
        invisibleBlock.height = 1.25;
        invisibleBlock.x = meteorit.x;
        invisibleBlock.velocityY = 1.5;
        invisibleBlock.visible = false;
        invisibleBlock.debug = true;
    }
}