(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'fill-me');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":2,"./states/gameover":3,"./states/menu":4,"./states/play":5,"./states/preload":6}],2:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],3:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
    preload: function () {
    },
    create: function () {
        /*
        var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
        this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
        this.titleText.anchor.setTo(0.5, 0.5);

        this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
        this.congratsText.anchor.setTo(0.5, 0.5);

        this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
        this.instructionText.anchor.setTo(0.5, 0.5);
        },
        update: function () {
        if(this.game.input.activePointer.justPressed()) {
          this.game.state.start('play');
        }
        */
    }
};
module.exports = GameOver;

},{}],4:[function(require,module,exports){

'use strict';
function Menu() {}

Menu.prototype = {
  preload: function() {

  },
  create: function() {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.sprite = this.game.add.sprite(this.game.world.centerX, 138, 'yeoman');
    this.sprite.anchor.setTo(0.5, 0.5);

    this.titleText = this.game.add.text(this.game.world.centerX, 300, '\'Allo, \'Allo!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.instructionsText = this.game.add.text(this.game.world.centerX, 400, 'Click anywhere to play "Click The Yeoman Logo"', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionsText.anchor.setTo(0.5, 0.5);

    this.sprite.angle = -20;
    this.game.add.tween(this.sprite).to({angle: 20}, 1000, Phaser.Easing.Linear.NONE, true, 0, 1000, true);
  },
  update: function() {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};

module.exports = Menu;

},{}],5:[function(require,module,exports){

'use strict';
function Play() {}
Play.prototype = {
    isMarked: false,
    create: function() {
        this.game.physics.startSystem(Phaser.Physics.ARCADE);
        this.map = this.game.add.tilemap('map');
        this.map.addTilesetImage('tileset');
        
        this.backgroundLayer = this.map.createLayer('background');
        this.blockedLayer = this.map.createLayer('blocked');
        
        this.blockedLayer.resizeWorld();
        
        var x = this.blockedLayer.getTileX(0);
        var y = this.blockedLayer.getTileY(17);
        console.log(x + "" + y);
        var tile = this.map.getTile(0, 1, this.blockedLayer);
        //tile.index = 4;
        console.log(tile);

        this.game.input.onDown.add(this.handleClick, this);
        this.leftArrow = this.game.add.sprite(0, 0, 'arrows', 1);
        this.upArrow = this.game.add.sprite(0, 0, 'arrows', 2);
        this.rightArrow = this.game.add.sprite(0, 0, 'arrows', 3);
        this.downArrow = this.game.add.sprite(0, 0, 'arrows', 4);
        console.log(this.downArrow);
    },
    update: function() {
    },
    handleClick: function() {
        if (!this.isMarked) {
            var x = this.backgroundLayer.getTileX(this.game.input.activePointer.worldX);
            var y = this.backgroundLayer.getTileY(this.game.input.activePointer.worldY);
            var tile = this.map.getTile(x, y, this.backgroundLayer);
            console.log(tile);
            if (tile) {
                this.marker = this.game.add.sprite(tile.worldX, tile.worldY, 'marker', 1);
                tile.index = 1;
                this.isMarked = true;
            }
        } else {
            
        }
    }
};

module.exports = Play;
},{}],6:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {
    this.asset = this.add.sprite(this.width/2,this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.load.setPreloadSprite(this.asset);
    this.load.image('marker', 'assets/marker.png');
    this.load.tilemap('map', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    this.load.image('tileset', 'assets/tileset.png');
    this.load.image ('marker', 'assets/marker.png');
    this.load.spritesheet('arrows', 'assets/arrows.png', 16, 16, 4);
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;
},{}]},{},[1])