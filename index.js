/**
 * Created by gautier on 16/06/2014.
 */

var container, stats;

var camera, scene, renderer, controls;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var rotWorldMatrix;
var rotObjectMatrix;

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

    var callbackProgress = function( progress, result ) {

        var bar = 250,
            total = progress.totalModels + progress.totalTextures,
            loaded = progress.loadedModels + progress.loadedTextures;

        if ( total )
            bar = Math.floor( bar * loaded / total );

        $("bar" ).style.width = bar + "px";

        count = 0;
        for ( var m in result.materials ) count++;

        handle_update( result, Math.floor( count/total ) );

    }
    var callbackFinished = function ( result ) {

        loaded = result;

        document.getElementById("message").style.display = "none";

        handle_update( result, 1 );

    }

    // model
    var loader = new THREE.OBJMTLLoader();
    //loader.load( 'examples/rivergod/mesh.obj', 'examples/rivergod/mesh.mtl', function ( object ) {
    //loader.load( 'examples/cow.obj', 'examples/cow.obj.mtl', function ( object ) {
    loader.load( 'examples/maya/mesh.obj', 'examples/maya/mesh.mtl', function ( object ) {

        var zAxis = new THREE.Vector3(1,0,0);
        var xAxis = new THREE.Vector3(0,1,0);
        object.rotateOnAxis(zAxis, 90 * Math.PI/180);
        object.rotateOnAxis(xAxis, -90 * Math.PI/180);

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

    //var xAxis = new THREE.Vector3(1,0,0);
    //var zAxis = new THREE.Vector3(0,0,1);
    //rotateAroundWorldAxis(object, zAxis, Math.PI / 90);

    render();
}

function render() {
    camera.lookAt( scene.position );
    controls.update(); //for cameras
    renderer.render( scene, camera );

}


function rotateAroundObjectAxis(object, axis, radians) {
    rotObjectMatrix = new THREE.Matrix4();
    rotObjectMatrix.makeRotationAxis(axis.normalize(), radians);

    // old code for Three.JS pre r54:
    // object.matrix.multiplySelf(rotObjectMatrix);      // post-multiply
    // new code for Three.JS r55+:
    object.matrix.multiply(rotObjectMatrix);

    // old code for Three.js pre r49:
    // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
    // new code for Three.js r50+:
    object.rotation.setEulerFromRotationMatrix(object.matrix);
}


// Rotate an object around an arbitrary axis in world space
function rotateAroundWorldAxis(object, axis, radians) {
    rotWorldMatrix = new THREE.Matrix4();
    rotWorldMatrix.makeRotationAxis(axis.normalize(), radians);

    // old code for Three.JS pre r54:
    //  rotWorldMatrix.multiply(object.matrix);
    // new code for Three.JS r55+:
    rotWorldMatrix.multiply(object.matrix);                // pre-multiply

    object.matrix = rotWorldMatrix;

    // old code for Three.js pre r49:
    // object.rotation.getRotationFromMatrix(object.matrix, object.scale);
    // old code for Three.js pre r59:
    // object.rotation.setEulerFromRotationMatrix(object.matrix);
    // code for r59+:
    object.rotation.setFromRotationMatrix(object.matrix);
}
