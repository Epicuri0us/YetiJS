
/**
 * @classdesc The physics object saves physical data and collision models for very basic physics calculation. Use Box2DWeb for more accurate and advanced physics.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {yVector} pPosition - The position.
 * @param {Float} pWeight - The weight.
 * @property {yVector} position - The position.
 * @property {yVector} velocity - The active velocity.
 * @property {Float} friction - The friction.
 * @property {Float} weight - The weight.
 * @property {Float} cor - The "coefficient of restitution".
 * @property {yPolygon} model - The polygon that represents the object.
 * @property {yPhysicsObject} collisions - An array that stores every physics object this object collides with, clears every frame.
 */
var yPhysicsObject = function(pPosition, pWeight) {
	var that = this;
	that.position = pPosition;
	that.velocity = new yVector(0, 0);
	that.acceleration = new yVector(0, 0);
	that.friction = 0.99;
	that.weight = pWeight;
	that.cor = 0.5;
	that.model;
	that.collisions = [];

	/**
	 * Updates collisionbox
	 */
	yPhysicsObject.prototype.update = function() {
		var that = this;
		var acceleration = new yVector().copy(that.acceleration);
		//console.log(that.acceleration.y, delta);
		that.velocity.add(acceleration.scale(delta));
		if(Math.abs(that.velocity.x) > 0){
			that.velocity.x = that.velocity.x * that.friction;
		}
		if(Math.abs(that.velocity.y) > 0){
			that.velocity.y = that.velocity.y;
		}
		var velocity = new yVector(that.velocity.x * delta, that.velocity.y * delta);

		that.position = that.position.add(velocity);
		that.model.pos = that.position;
		that.collisions = [];
	}

	/**
	 * Checks for collision with another physModel
	 */
	yPhysicsObject.prototype.checkCollision = function(pPhysObject) {
		var response = new yCollisionRespone();
		var collided = SAT.testPolygonPolygon(this.model, pPhysObject.model, response);
		if(collided){
			that.collisions.push(pPhysObject);
			pPhysObject.collisions.push(this);
			if(this.weight == Infinity){
				pPhysObject.position.sub(response.overlapV);
				var u = response.overlapN.scale(-(pPhysObject.velocity.dot(response.overlapN) / response.overlapN.dot(response.overlapN)));
				var w = pPhysObject.velocity.sub(u);
				
				pPhysObject.velocity = w.scale(this.friction).sub(u.scale(pPhysObject.cor));
			}else if(pPhysObject.weight == Infinity){
				this.position.sub(response.overlapV);
				var u = response.overlapN.scale(this.velocity.dot(response.overlapN) / response.overlapN.dot(response.overlapN));
				var w = this.velocity.sub(u);
				
				this.velocity = w.scale(pPhysObject.friction).sub(u.scale(this.cor));
			}else{
				var maxWeight = 1/(this.weight + pPhysObject.weight);
				this.position.sub(response.overlapV.scale(pPhysObject.weight*maxWeight, pPhysObject.weight*maxWeight));
				pPhysObject.position.sub(response.overlapV.scale(this.weight*maxWeight, this.weight*maxWeight));
			}
		}
	}

	/**
	 *Draws physics model for debugging purposes
	 */
	yPhysicsObject.prototype.draw = function(camera) {
		var that = this;
		that.model.draw(camera);
	}

}

// var polygonCollisionResult = function() {
	// // Are the polygons going to intersect forward in time?
	// this.willIntersect;
	// // Are the polygons currently intersecting?
	// this.intersect;
	// // The translation to apply to the first polygon to push the polygons apart.
	// this.minimumTranslationVector;
// }

/*function getCollisionResult(polygon1, polygon2){
// GETAXES	
var axes = new Vector[shape.vertices.length];
// loop over the vertices
for (int i = 0; i < shape.vertices.length; i++) {
  // get the current vertex
  Vector p1 = shape.vertices[i];
  // get the next vertex
  Vector p2 = shape.vertices[i + 1 == shape.vertices.length ? 0 : i + 1];
  // subtract the two to get the edge vector
  Vector edge = p1.subtract(p2);
  // get either perpendicular vector
  Vector normal = edge.perp();
  // the perp method is just (x, y) => (-y, x) or (y, -x)
  axes[i] = normal;
}

// GET LIST OF AXES TO TEST
Axis[] axes1 = shape1.getAxes();
Axis[] axes2 = shape2.getAxes();
// loop over the axes1
for (int i = 0; i < axes1.length; i++) {
  Axis axis = axes1[i];
  // project both shapes onto the axis
  Projection p1 = shape1.project(axis);
  Projection p2 = shape2.project(axis);
  // do the projections overlap?
  if (!p1.overlap(p2)) {
    // then we can guarantee that the shapes do not overlap
    return false;
  }
}
// loop over the axes2
for (int i = 0; i < axes2.length; i++) {
  Axis axis = axes2[i];
  // project both shapes onto the axis
  Projection p1 = shape1.project(axis);
  Projection p2 = shape2.project(axis);
  // do the projections overlap?
  if (!p1.overlap(p2)) {
    // then we can guarantee that the shapes do not overlap
    return false;
  }
}
// if we get here then we know that every axis had overlap on it
// so we can guarantee an intersection
return true;

// PROJECT
double min = axis.dot(shape.vertices[0]);
double max = min;
for (int i = 1; i < shape.vertices.length; i++) {
  // NOTE: the axis must be normalized to get accurate projections
  double p = axis.dot(shape.vertices[i]);
  if (p < min) {
    min = p;
  } else if (p > max) {
    max = p;
  }
}
Projection proj = new Projection(min, max);
return proj;



// GET MTV
double overlap = // really large value;
Axis smallest = null;
Axis[] axes1 = shape1.getAxes();
Axis[] axes2 = shape2.getAxes();
// loop over the axes1
for (int i = 0; i < axes1.length; i++) {
  Axis axis = axes1[i];
  // project both shapes onto the axis
  Projection p1 = shape1.project(axis);
  Projection p2 = shape2.project(axis);
  // do the projections overlap?
  if (!p1.overlap(p2)) {
    // then we can guarantee that the shapes do not overlap
    return false;
  } else {
    // get the overlap
    double o = p1.getOverlap(p2);
    // check for minimum
    if (o < overlap) {
      // then set this one as the smallest
      overlap = o;
      smallest = axis;
    }
  }
}
// loop over the axes2
for (int i = 0; i < axes2.length; i++) {
  Axis axis = axes2[i];
  // project both shapes onto the axis
  Projection p1 = shape1.project(axis);
  Projection p2 = shape2.project(axis);
  // do the projections overlap?
  if (!p1.overlap(p2)) {
    // then we can guarantee that the shapes do not overlap
    return false;
  } else {
    // get the overlap
    double o = p1.getOverlap(p2);
    // check for minimum
    if (o < overlap) {
      // then set this one as the smallest
      overlap = o;
      smallest = axis;
    }
  }
}
MTV mtv = new MTV(smallest, overlap);
// if we get here then we know that every axis had overlap on it
// so we can guarantee an intersection
return mtv;


	}


}
*/
/*function getIntervalDistance(minA, maxA, minB, maxB){
	if(minA < minB){
		return minB - maxA;
	}else{
		return minA - maxB;
	}
}

// Calculate the projection of a polygon on an axis
// and returns it as a [min, max] interval
function projectPolygon(axis, polygon, min, max) {
	var points = polygon.getAbsolutePoints();

	// To project a point on an axis use the dot product
	var dotProduct = axis.dot(points[0]);
	min = dotProduct;
	max = dotProduct;

	for (var i = 0; i < points.length; i++) {
		dotProduct = points[i].dot(axis);
		if (dotProduct < min) {
			min = dotProduct;
		} else {
			if (dotProduct > max) {
				max = dotProduct;
			}
		}
	}
	return new yVector(min, max);
}

// Check if polygon A is going to collide with polygon B.
// The last parameter is the *relative* velocity
// of the polygons (i.e. velocityA - velocityB)
function polygonCollision(polygonA, polygonB, velocity) {
	var result = new polygonCollisionResult();
	result.intersect = true;
	result.willIntersect = true;
	
	polygonA.setEdges();
	polygonB.setEdges();

	var edgeCountA = polygonA.edges.length;
	var edgeCountB = polygonB.edges.length;
	var minIntervalDistance = Infinity;
	var translationAxis = new yVector(0, 0);
	var edge;

	// Loop through all the edges of both polygons
	for (var edgeIndex = 0; edgeIndex < edgeCountA + edgeCountB; edgeIndex++) {
		if (edgeIndex < edgeCountA) {
			edge = polygonA.edges[edgeIndex];
		} else {
			edge = polygonB.edges[edgeIndex - edgeCountA];
		}

		// ===== 1. Find if the polygons are currently intersecting =====

		// Find the axis perpendicular to the current edge
		var axis = new yVector(-edge.y, edge.y);
		axis.normalize();

		// Find the projection of the polygon on the current axis
		var projA = projectPolygon(axis, polygonA, minA, maxA);
		var projB = projectPolygon(axis, polygonB, minB, maxB);
		var minA = projA.x;
		var minB = projB.x;
		var maxA = projA.y;
		var maxB = projB.y;

		// Check if the polygon projections are currentlty intersecting
		if (getIntervalDistance(minA, maxA, minB, maxB) > 0){
			result.intersect = false;
		}
		if(result.intersect){
			//console.log(Math.round(minA) + " " + Math.round(maxA) + " " + Math.round(minB) + " " + Math.round(maxB) + " " + result.intersect);
		}
		
		// ===== 2. Now find if the polygons *will* intersect =====

		// Project the velocity on the current axis
		var velocityProjection = axis.dot(velocity);

		// Get the projection of polygon A during the movement
		if (velocityProjection < 0) {
			minA += velocityProjection;
		} else {
			maxA += velocityProjection;
		}

		// Do the same test as above for the new projection
		var intervalDistance = getIntervalDistance(minA, maxA, minB, maxB);
		if (intervalDistance > 0) {
			result.willIntersect = false;
		}

		// If the polygons are not intersecting and won't intersect, exit the loop
		if (!result.intersect && !result.willIntersect) {
			break;
		}

		// Check if the current interval distance is the minimum one. If so store
		// the interval distance and the current distance.
		// This will be used to calculate the minimum translation vector
		intervalDistance = Math.abs(intervalDistance);
		if (intervalDistance < minIntervalDistance) {
			minIntervalDistance = intervalDistance;
			translationAxis = axis;

			var d = polygonA.getAbsoluteCenter().subV(polygonB.getAbsoluteCenter());
			if (d.dot(translationAxis) < 0) {
				
				translationAxis = translationAxis.mulS(-1);
			}
		}
	}

	// The minimum translation vector
	// can be used to push the polygons appart.
	if (result.willIntersect) {
		result.minimumTranslationVector = translationAxis;
	}

	return result;
}*/
