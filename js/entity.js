
/**
 * @classdesc Objects inherited from the yEntity class represent a specific, normally visible on the screen, object in the game
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @desc Creates a new entity from following parameters:
 * @param {Image} pSprite - The sprite of the entity.
 * @param {yVector} pPosition - The position of the entity.
 * @param {yLayer} pParent - The parent layer of the entity.
 * @property {Image} sprite - The sprite of the entity.
 * @property {yPhsicalObject} physModel - The phyiscal object of the entity.
 * @property {yVector} position - The position of the entity.
 * @property {yParent} parent - The parent layer of the entity.
 */
var yEntity = function(pSprite, pPosition, pParent){
	var that = this;
	that.sprite = pSprite;
	that.physModel = null;
	that.position = pPosition;
	that.parent = pParent;

	/** 
	 * Updates the entity
	 */
	yEntity.prototype.update = function(){
		var that = this;
		if(that.physModel){
			for(var i = 0; i < that.parent.entities.length; i++){
				if(that.physModel != that.parent.entities[i].physModel){
					that.physModel.checkCollision(that.parent.entities[i].physModel);
				}
			}
			that.position.x = that.physModel.position.x;
			that.position.y = that.physModel.position.y;
			that.physModel.update();
		}
	}
	
	/**
	 * Draws the entity
	 */
	yEntity.prototype.draw = function(camera){
		var that = this;
		if(that.sprite != null){
			ctx.drawImage(that.sprite, camera.position.x + that.position.x - that.sprite.width/2, camera.position.y + that.position.y - that.sprite.height/2);
		}
		if(that.physModel && debug){
			that.physModel.draw(camera);
		}
	}
};
