
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
 * @property {Image} sprite - The sprite of the entity, will be drawn if the animation is null.
 * @property {yAnimation} animation - The animation of the entity, if it is null, the sprite will be drawn.
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
		this.animation = null;
	},

	/** 
	 * Updates the entity
	 * @memberof yEntity
	 */
	update: function(){
		if(this.physModel){
			var position = this.physModel.GetPosition();
			this.position.x = position.x*this.layer.physWorld.drawScale;
			this.position.y = position.y*this.layer.physWorld.drawScale;
			this.rotation = this.physModel.GetAngle();
		}
	},
	
	/**
	 * Draws the entity
	 * @memberof yEntity
	 */
	draw: function(){
		var camera = this.layer.camera;
		if(this.animation){
			ctx.save();
			ctx.translate((camera.position.x + this.position.x)*camera.scale, (camera.position.y + this.position.y)*camera.scale);
			ctx.rotate(this.rotation);
			this.animation.draw(new yVector(-this.animation.spriteSheet.frameWidth*camera.scale/2, -this.animation.spriteSheet.frameHeight*camera.scale/2), camera);
			ctx.restore();
		}else if(this.sprite){
			ctx.save();
			ctx.translate((camera.position.x + this.position.x)*camera.scale, (camera.position.y + this.position.y)*camera.scale);
      		ctx.rotate(this.rotation);
			ctx.drawImage(this.sprite, -this.sprite.width*camera.scale/2, -this.sprite.height*camera.scale/2, this.sprite.width*camera.scale, this.sprite.height*camera.scale);
			ctx.restore();
		}
	},
	
	/**
	 * Adds a physics object to the entity and the physics world of the layer
	 * @memberof yEntity
	 * @param {b2BodyDef} pBodyDev - The physical body definition.
	 */
	addPhysModel: function(pBodyDef){
		pBodyDef.position.Set(this.position.x, this.position.y);
		this.physModel = this.layer.physWorld.CreateBody(pBodyDef);
	}
});
