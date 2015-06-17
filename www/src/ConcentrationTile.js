/**
 * A wrapper for a pixi.js Sprite to represent a Tile in a concentration game.
 * @param {Sprite} A pixi.js Sprite representing a tile in a concentration game.
 * @param {Container} A pixi Container where this Sprite will be placed.
 * @param {int} A number indicating the value of this tile.
 */
function ConcentrationTile(sprite, container, tileValue) {
  var tileSprite = sprite;
  var gameContainer = container;
  
  //first tile picked up by the player
  var firstTile = null;
  // second tile picked up by the player
  var secondTile = null;
  // can the player pick up a tile?
  var canPick = true;
  
  var initializeTile = function () {
    // buttonmode + interactive = acts like a button
    tileSprite.buttonMode = true;
    tileSprite.interactive = true;
    // is the tile selected?
    tileSprite.isSelected = false;
    // set a tile value
    tileSprite.theVal = tileValue;
    // place the tile
    tileSprite.position.x = 7 + i * 80;
    tileSprite.position.y = 7 + j * 80;
    // paint tile black
    tileSprite.tint = 0x000000;
    // set it a bit transparent (it will look grey)
    tileSprite.alpha = 0.5;
  }
  
  this.registerListeners = function() {
    // mouse-touch listener
    tileSprite.mousedown = tileSprite.touchstart = function(data) {
      // can I pick a tile?
      if (canPick) {
        // is the tile already selected?
        if (!isSelected) {
          // set the tile to selected
          isSelected = true;
          // show the tile
          tint = 0xffffff;
          alpha = 1;
          // is it the first tile we uncover?
          if (firstTile == null) {
            firstTile = this;
          } else {
            // this is the second tile
            secondTile = this;
            // can't pick anymore
            canPick = false;
            // did we pick the same tiles?
            if (firstTile.theVal == secondTile.theVal) {
              // wait a second then remove the tiles and make the player able
              // to pick again
              setTimeout(function() {
                gameContainer.removeChild(firstTile);
                gameContainer.removeChild(secondTile);
                firstTile = null;
                secondTile = null;
                canPick = true;
              }, 500);
            } else {
              // we picked different tiles
              // wait a second then cover the tiles and make the player able
              // to pick again
              setTimeout(function() {
                firstTile.isSelected = false
                secondTile.isSelected = false
                firstTile.tint = 0x000000;
                secondTile.tint = 0x000000;
                firstTile.alpha = 0.5;
                secondTile.alpha = 0.5;
                firstTile = null;
                secondTile = null;
                canPick = true
              }, 500);
            }
          }
        }
      }
    }
  }
  
  this.getTileSprite = function() {
    return tileSprite;
  }
  
  initializeTile();
};