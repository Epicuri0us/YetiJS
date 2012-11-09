
/**
 * @class yEntity
 * @augments Class
 * @classdesc Objects inherited from the yEntity class represent a specific, normally visible on the screen, object in the game
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @desc Creates a new entity from following parameters:
 * @param {Image} pSprite - The sprite of the entity.
 * @param {yVector} pPosition - The position of the entity.
 * @param {yLayer} pLayer - The parent layer of the entity.
 * @property {Image} sprite - The sprite of the entity.
 * @property {yPhsicalObject} physModel - The phyiscal object of the entity.
 * @property {yVector} position - The position of the entity.
 * @property {Double} rotation - The rotation of the entity.
 * @property {yLayer} layer - The parent layer of the entity.
 */
var yEntity = Class.extend({
	init: function(pSprite, pPosition, pLayer){
		this.sprite = pSprite;
		this.physModel = null;
		this.position = pPosition;
		this.rotation = 0;
		this.layer = pLayer;
	},

	/** 
	 * Updates the entity
	 * @memberof yEntity
	 */
	update: function(){
		if(this.physModel){
			var position = this.physModel.GetBody().GetPosition();
			this.position.x = position.x;
			this.position.y = position.y;
			this.rotation = this.physModel.GetBody().GetAngle();
		}
	},
	
	/**
	 * Draws the entity
	 * @memberof yEntity
	 */
	draw: function(){
		var camera = this.layer.camera;
		if(this.sprite != null){
			ctx.save();
			ctx.translate(camera.position.x + this.position.x, camera.position.y + this.position.y);
      		ctx.rotate(this.rotation);
			ctx.drawImage(this.sprite, -this.sprite.width/2, -this.sprite.height/2);
			ctx.restore();
		}
	},
	
	/**
	 * Adds a physics object to the entity and the physics world of the layer
	 * @memberof yEntity
	 */
	addPhysModel: function(pBody, pFixture){
		pBody.position.Set(this.position.x, this.position.y);
		this.physModel = this.layer.physWorld.CreateBody(pBody).CreateFixture(pFixture);
	}
});
