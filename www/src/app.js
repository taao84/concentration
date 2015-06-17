
// first tile picked up by the player
var firstTile = null;
// second tile picked up by the player
var secondTile = null;
// can the player pick up a tile?
var canPick = true;

var renderer = null;
var stage = null;
var concentrationManager = null;

var maxX = 640;
var maxY = 480;

$(document).ready(function() {
  initializeMainContainers();
  initializeStage();
  animate();
});

function initializeMainContainers() {
  renderer = PIXI.autoDetectRenderer(maxX, maxY,{backgroundColor : 0x1099bb});

  // create the root of the scene graph
  stage = new PIXI.Container();
  concentrationManager = new ConcentrationManager(3, 4, 44);
}

function initializeStage() {
  document.body.appendChild(renderer.view);
  //importing a texture atlas created with texture packer
  var tileAtlas = ["asset/images.json"];
  // create a new loader
  var loader = PIXI.loader.add(tileAtlas).load(onTilesLoaded);
  
  // add the container to the stage
  stage.addChild(concentrationManager.getGameContainer()); 
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(stage);
} 

function onTilesLoaded() {
  concentrationManager.chooseTiles();
  concentrationManager.shuffleTiles();
  concentrationManager.placeDowntiles();
  requestAnimationFrame(animate);
}