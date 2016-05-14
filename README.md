# JavaScript Watch Object property changes
I've started with Eligrey's [Gist](https://gist.github.com/eligrey/384583#file-object-watch-js-L10) and modify it a bit.

## What it does
It monitors javascript objects and fires a callback once some property changes. You can use it to trigger functions when some property in some object changes

## General syntax
```javascript
someObject.watch(callback, propsToWatch);
```
### Callback
```javacript
function someName(newVal, oldVal, key){
	// do whatever
}
```
### Props to watch
You can pass a string
```javascript
	someObject.watch(callback, 'name');
```
You can pass an array
```javascript
	someObject.watch(callback, ['name', 'age']);
```
You can pass nothing, in which case it will monitor all properties of the object
```javascript
	someObject.watch(callback);
```
## Usage
```javascript
var dog = {
	breed: 'pug',
	name: 'Doug',
	lastFed: 60
}
dog.watch(function(newVal, oldVal, key){
	if(newVal <= 0){
		console.log("I want food again");
		clearInterval(window.dogFeddInterval);
	}
	else{
		console.log("I'm not hungry yet, I'm going to play with my toys.")
	}
}, 'lastFed');

window.dogFeddInterval = setInterval(function(){
	dog.lastFed -= 10;
}, 10000);
```