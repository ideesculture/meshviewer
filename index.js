/**
 * Created by gautier on 16/06/2014.
 */

var container, stats;

var camera, scene, renderer, controls;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;


init();
animate();


function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 0;
    camera.position.y = 0.5;
    camera.position.x = 5;

    controls = new THREE.TrackballControls( camera );

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.2;
    controls.noZoom = false;
    controls.noPan = false;
    controls.staticMoving = false;
    controls.dynamicDampingFactor = 0.3;
    controls.minDistance = 1.1;
    controls.maxDistance = 100;

    controls.keys = [ 65, 83, 68 ]; // [ rotateKey, zoomKey, panKey ]

    var ambient = new THREE.AmbientLight( 0xaaaaaa );
    scene.add( ambient );

    var frontLight = new THREE.DirectionalLight( 0xffeedd );
    frontLight.position.set( 1, 1, 0.5 ).normalize();
    scene.add( frontLight );

    var backLight = new THREE.DirectionalLight( 0xffeedd );
    backLight.position.set( -1, -1, 0.5 ).normalize();
    scene.add( backLight );

    // model

    var loader = new THREE.OBJMTLLoader();
    loader.load( 'examples/cow.obj', 'examples/cow.obj.mtl', function ( object ) {

        scene.add( object );

        var helper = new THREE.BoundingBoxHelper(object, 0xff0000);
        helper.update();
        // If you want a visible bounding box
        //scene.add(helper);
        // If you just want the numbers
        console.log(helper.box.min);
        console.log(helper.box.max);

    } );

    //

    container.appendChild( renderer.domElement );

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    window.addEventListener( 'resize', onWindowResize, false );

}

function onWindowResize() {

}

function onDocumentMouseMove( event ) {


}

//

function animate() {

    requestAnimationFrame( animate );
    render();

}

function render() {
    camera.lookAt( scene.position );
    controls.update(); //for cameras
    renderer.render( scene, camera );

}
