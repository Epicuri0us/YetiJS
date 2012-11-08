
/**
 * @classdesc The yObjectPool is a generic object pool used to minimize garbage creation on runtime.
 * 
 * @author Leo Zurbriggen
 * @constructor
 * @param {Class} pObjectClass - The class of the objects in the pool.
 * @param {Integer} pSize - The initial size of the pool.
 * @param {Parameters} arguments - (optional) Any arguments that are needed to create an object of the class.
 * @property {Class} objectClass - The class of the objects in the pool.
 * @property {Object[]} freeObjects - The array containing all free objects at the time.
 * @property {Object[]} activeObjects - The array containing all objects that are in use at the time.
 */
function yObjectPool(pObjectClass, pSize){
	this.objectClass = pObjectClass;
	this.freeObjects = [];
	this.activeObjects = [];
	
	for(var i = 0; i < pSize; i++){
		if(arguments.length > 2){
			this.freeObjects[i] = new this.objectClass.apply(arguments.split(2)[1]);
		}else{
			this.freeObjects[i] = new this.objectClass.call();
		}
	}
	
	/**
	 * Gets a free item out off the pool and adds it to the active ones, creates a new one if there are no free objects.
	 * @param {Parameters} arguments - (optional) Any arguments that are needed to create an object of the class.
	 */
	yObjectPool.prototype.get = function(){
		if(this.freeObjects.length > 0){			
			var newObject = this.pop(freeObjects);
			
			if(arguments.length > 0){
				newObject.apply(newObject, arguments);
			}else{
				newObject.call(newObject);
			}
			this.push(this.activeObjects, newObject);
			return newObject;
		}else{
			var newObject;
			if(arguments.length > 0){
				newObject = new this.objectClass.apply(arguments);
			}else{
				newObject = new this.objectClass.call();
			}
			this.push(this.activeObjects, newObject);
			return newObject;
		}
	}
	
	/**
	 * Frees an object by adding it back to free objects and removing it from the active ones.
 	 * @param {Object} pObject - The object to free.
	 */
	yObjectPool.prototype.free = function(pObject){
		this.push(this.freeObjects, pObject);
		this.slice(this.activeObjects, this.activeObjects.indexOf(pObject));
	}
	
	/**
	 * Gets the last item and removes it from the array
 	 * @param {Object[]} pArray - The array to get the last item from.
	 */
	yObjectPool.prototype.pop = function(pArray){
		var popObject = pArray[pArray.length-1];
		this.slice(pArray, pArray.length-1);
		return popObject;
	}
	
	/**
	 * Deletes an index out of the array.
	 * @param {Object[]} pArray - The array.
	 * @param {Object} pIndex - The index.
	 */
	yObjectPool.prototype.slice = function(pArray, pIndex){
		for (var i = pIndex, length = pArray.length - 1; i < length; i++){
			pArray[i] = pArray[i + 1];
		}
		pArray.length = length;
	}
	
	/**
	 * Adds an object at the end of an array.
	 * @param {Object[]} pArray - The array.
	 * @param {Object} pObject - The object to push.
	 */
	yObjectPool.prototype.push = function(pArray, pObject){
		pArray[pArray.length] = pObject;
	}
}
