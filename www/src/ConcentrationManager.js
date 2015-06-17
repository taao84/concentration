/**
 * A manager for the concentration logic.
 * @param {int} numTilesToChoose The number of positions to be chosen.
 * @param {int} maxNumOfOptions The maximum number of options to choose from.
 * @param {int} boardNumRows Number of rows in the concentration board.
 * @param {int} boardNumCols Number of columns in the concentration board.
 */
function ConcentrationManager(boardNumRows, boardNumCols, maxNumOfOptions) {
  //create an empty container
  this.gameContainer = new PIXI.Container();
  this.chosenTiles = null;
  this.boardNumRows = boardNumRows;
  this.boardNumCols = boardNumCols;
  this.numTilesToChoose = (boardNumRows * boardNumCols) / 2;
  this.maxNumOfOptions = maxNumOfOptions;
  
  this.getChosenTiles = function() {
    return this.chosenTiles;
  } 
  
  this.setChosenTiles = function(value) {
    this.chosenTiles = value;
  }
  
  this.getGameContainer = function() {
    return this.gameContainer;
  }
};

/**
 * This method choose randomly a given number of positions out of given max.  
 * 
 * @returns {Array} An array with the chosen positions.
 */
ConcentrationManager.prototype.chooseTiles = function() {
  // We have 44 possible options, from those we want to choose 24 only in order to fill 48 spaces
  var tileOptions = ExtendedArray.range(0, 1, this.maxNumOfOptions);
  tileOptions.shuffle();
  tileOptions = tileOptions.splice(0, this.numTilesToChoose);
  var chosenTiles = tileOptions.concat(tileOptions);
  this.setChosenTiles(chosenTiles);
}

/**
 * Shuffle the chosen tiles
 */
ConcentrationManager.prototype.shuffleTiles = function() {
  var numTilesOnBoard = this.numTilesToChoose * 2;
  for (var i = 0; i < (numTilesOnBoard*2); i++) {
    var from = Math.floor(Math.random() * numTilesOnBoard);
    var to = Math.floor(Math.random() * numTilesOnBoard);
    var tmp = this.chosenTiles[from];
    this.chosenTiles[from] = this.chosenTiles[to];
    this.chosenTiles[to] = tmp;
  }
}

/**
 * Place down tiles
 */
ConcentrationManager.prototype.placeDowntiles = function() {
  for (i = 0; i < this.boardNumCols; i++) {
    for (j = 0; j < this.boardNumRows; j++) {
      // new sprite
      var tile = PIXI.Sprite.fromFrame(this.chosenTiles[i * this.boardNumRows + j]);
      var tileValue = this.chosenTiles[i * this.boardNumRows + j];
      var concentrationTile = new ConcentrationTile(tile, this.gameContainer, tileValue);
      // add the tile
      this.gameContainer.addChild(concentrationTile.getTileSprite());
      concentrationTile.registerListeners();
    }
  }
}
