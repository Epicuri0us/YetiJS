
/*
       Common vector2 operations
       Ugly as hell but no GC headaches
       Author: Tudor Nita | cgrats.com
       Version: 0.6 

*/
/* vector 2D structure */
var Vec2 = function(x_,y_) {
    this.x = x_;
    this.y = y_;
    
    this.mulS = function(value)  { return new Vec2(this.x*value,this.y*value);}
    /* vector * vector */
    this.mulV = function(v)     { return new Vec2(this.x*v.x,this.y*v.y);}
    /* vector / scalar */
    this.divS = function(value)  { return new Vec2(this.x/value,this.y/value);}
    /* vector + scalar */
    this.addS = function(value)  { return new Vec2(this.x+value,this.y+value);}
    /* vector + vector */
    this.addV  = function(v)    { return new Vec2(this.x+v.x,this.y+v.y);}
    /* vector - scalar */
    this.subS = function(value)  { return new Vec2(this.x-value,this.y-value);}
    /* vector - vector */
    this.subV = function(v)    { return new Vec2(this.x-v.x,this.y-v.y);}
    /*  vector absolute */
    this.abs = function()          { return new Vec2(Math.abs(this.x),Math.abs(this.y));}
    /* dot product */
    this.dot = function(v)      { return (this.x*v.x+this.y*v.y);}
    /* vector length */
    this.length = function()       { return Math.sqrt(this.dot(this));}
    /* distance between vectors */
    this.dist = function(v)     { return (v.subV(this)).length();}
    /* vector length, squared */
    this.lengthSqr = function()    { return this.dot(this);}
    /* 
        vector linear interpolation 
        interpolate between two vectors.
        value should be in 0.0f - 1.0f space ( just to skip a clamp operation )
    */
    this.lerp = function(targetV2, v1,v2, value) {  
        targetV2.x = v1.x+(v2.x-v1.x)*value;
        targetV2.y = v1.y+(v2.y-v1.y)*value;
    }
    /* normalize a vector */
    this.normalize = function() {
        var vlen = this.length();
        return new Vec2(this.x/vlen, this.y/vlen);
    }
}

function yArea(Vec1, Vec2){
	var that = this;
	that.topleft = Vec1;
	that.botright = Vec2;
}
