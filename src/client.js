// 1. create local Host
var swarmHost = new Swarm.Host('unique_client_id');

// 2. connect to your server
swarmHost.connect('ws://localhost:8000/');

// 3.a. create an object
var someMouse = new Mouse();
// OR swarmHost.get('/Mouse');
// OR new Mouse({x:1, y:2});

// 4.a. a locally created object may be touched immediately
someMouse.set({x:1,y:2});

// 3.b. This object is global (we supply a certain id) so we
// may need to wait for its state to arrive from the server
var mickey = new Mouse('Mickey');

// 4.b. ...wait for the state to arrive
mickey.on('init', function () {
    // ...so we may touch it finally.
    mickey.set({x: 3, y: 4});
});

// 5. let's subscribe to the object's change events
mickey.on(function (spec, val, source) {
    // this will be triggered by every state change, be it
    // local or remote
    console.log('event: ', spec.op(), val);
    // outputs:
    // set {x:3, y:4}
});