
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