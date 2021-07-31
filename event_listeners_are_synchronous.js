// Test de l'EventEmitter
// pour montrer que les listeners sont synchrones

var events = require('events');
const { nextTick } = require('process');
var eventEmitter = new events.EventEmitter();

const reducer = (accumulator, currentValue) => { return accumulator + 1.0 / Math.pow(2, currentValue) };

eventEmitter.on('error', (err) => {
    console.error('Houps erreur : ' + err.message);
});
eventEmitter.once('my_event', function() {
    let delay = 100;
    setTimeout(() => {
        console.log(delay + ' ms callback');
    }, delay);
    nextTick(() => {
        console.log('nextTick callback');
    });
    setImmediate(() => {
        console.log("setImmediate callback");
    });
    setTimeout(() => {
        console.log('setTimeout with 0 delay callback');
    }, 0);
    // heavy computation
    const array1 = [...Array(1_000_000).keys()].map((val) => 0.5 * val);
    // array1.shift();
    console.log('Reduce successful : ' + Math.round(array1.reduce(reducer, 5000.0))); // printed first
    console.log('data received successfully, ', this === eventEmitter); // printed second
});

eventEmitter.emit('my_event');
eventEmitter.emit('my_event'); // ignored because 'once' is used instead of 'on' 
eventEmitter.emit('error', new Error("bug ici"));