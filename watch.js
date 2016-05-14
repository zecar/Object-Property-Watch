Object.defineProperty(Object.prototype, 'watch', {
	configurable: true,
	enumerable: true,
	writable: false,
	value: function(handler, props){
		let propertiesToWatch = [];
		if(props){
			if(props.constructor === Array || props.constructor === String)
				propertiesToWatch = propertiesToWatch.concat(props);
			else{
				console.log("properties must be String or Array");
				return false;
			}
		}
		propertiesToWatch = propertiesToWatch.length ? propertiesToWatch : Object.keys(this);
		let applyHandler = (prop, toApply) => {
			toApply = toApply || this;
			let oldVal = this[prop];
			let newVal = oldVal;
			let get = function(){
				return newVal;
			}
			let set = function(val){
				oldVal = newVal;
				newVal = val;
				handler.call(this, oldVal, val, prop);
				return newVal;
			}
			delete this[prop];
			Object.defineProperty(this, prop, {
				configurable: true,
				get: get,
				set: set
			});

		}

		propertiesToWatch.forEach(applyHandler);
	}
});

Object.defineProperty(Object.prototype, "unwatch", {
	value: function(props){
		let propertiesToUnWatch = [];
		if(props){
			if(props.constructor === Array || props.constructor === String)
				propertiesToUnWatch = propertiesToUnWatch.concat(props);
			else{
				console.log("properties must be String or Array");
				return false;
			}
		}
		let removeWatch = (prop) => {
			let val = this[prop];
			Object.defineProperty(this, prop, {
				get: undefined,
				set: undefined
			});
			delete this[prop];
			this[prop] = val;
		}
		propertiesToUnWatch.forEach(removeWatch);
	}
});