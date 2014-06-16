/**
 * Created by gautier on 16/06/2014.
 */

var container, stats;

var camera, scene, renderer, controls, boundingbox, cameratarget;

var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var rotWorldMatrix;
var rotObjectMatrix;

init();
animate();

function buildAxes( length ) {
    var axes = new THREE.Object3D();

    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z

    return axes;

}
function buildAxis( src, dst, colorHex, dashed ) {
    var geom = new THREE.Geometry(),
        mat;

    if(dashed) {
        mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
    } else {
        mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
    }

    geom.vertices.push( src.clone() );
    geom.vertices.push( dst.clone() );
    geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

    var axis = new THREE.Line( geom, mat, THREE.LinePieces );

    return axis;

}

function init() {

    container = document.createElement( 'div' );
    document.body.appendChild( container );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );

    scene = new THREE.Scene();

    // Add axes
    axes = buildAxes( 1000 );

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );

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
        console.log (progress);
/*
        var bar = 250,
            total = progress.totalModels + progress.totalTextures,
            loaded = progress.loadedModels + progress.loadedTextures;

        if ( total )
            bar = Math.floor( bar * loaded / total );

        $("bar" ).style.width = bar + "px";

        count = 0;
        for ( var m in result.materials ) count++;

        handle_update( result, Math.floor( count/total ) );
*/
    }
    var callbackFinished = function ( result ) {
        loaded = result;
        handle_update( result, 1 );

    }


    // model
    var loader = new THREE.OBJMTLLoader();
    loader.callbackProgress = callbackProgress();
    loader.callbackSync = callbackProgress();

    //loader.load( 'examples/rivergod/mesh.obj', 'examples/rivergod/mesh.mtl', function ( object ) {
    loader.load( 'examples/cow.obj', 'examples/cow.obj.mtl', function ( object ) {
    //loader.load( 'examples/mask/mesh.obj', 'examples/mask/tex.mtl', function ( object ) {

        var zAxis = new THREE.Vector3(1,0,0);
        var xAxis = new THREE.Vector3(0,1,0);

        // Rotation on X Axis to reflect front face as shown in Meshlab
        object.rotateOnAxis(xAxis, 90 * Math.PI/180);

        object.rotateOnAxis(zAxis, -90 * Math.PI/180);


        scene.add( object );

        boundingbox = new THREE.BoundingBoxHelper(object, 0xff0000);
        boundingbox.update();

        // If you just want the numbers
        console.log(boundingbox.box.min);
        console.log(boundingbox.box.max);

        camera.position.z = 0;
        camera.position.y = boundingbox.box.max.y / 2;
        camera.position.x = 5;

        var cameratarget =  new THREE.Vector3( 0, 0, 0 );

        cameratarget.z = 0;
        cameratarget.y = boundingbox.box.max.y /2;
        cameratarget.x = 0;
    } );


    container.appendChild( renderer.domElement );
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );

    camera.lookAt(new THREE.Vector3(0,-1,0));
    console.log(camera);
}

function onWindowResize() {
}

function onDocumentMouseMove( event ) {
}

function animate() {
    requestAnimationFrame( animate );
    render();
}

function render() {
    //console.log(scene.position);
    //controls.target(cameratarget);
    controls.update(); //for cameras
    renderer.render( scene, camera );


}

function buildAxes( length ) {
    var axes = new THREE.Object3D();

    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( length, 0, 0 ), 0xFF0000, false ) ); // +X
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( -length, 0, 0 ), 0xFF0000, true) ); // -X
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, length, 0 ), 0x00FF00, false ) ); // +Y
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, -length, 0 ), 0x00FF00, true ) ); // -Y
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, length ), 0x0000FF, false ) ); // +Z
    axes.add( buildAxis( new THREE.Vector3( 0, 0, 0 ), new THREE.Vector3( 0, 0, -length ), 0x0000FF, true ) ); // -Z

    return axes;

}

function buildAxis( src, dst, colorHex, dashed ) {
    var geom = new THREE.Geometry(),
        mat;

    if(dashed) {
        mat = new THREE.LineDashedMaterial({ linewidth: 3, color: colorHex, dashSize: 3, gapSize: 3 });
    } else {
        mat = new THREE.LineBasicMaterial({ linewidth: 3, color: colorHex });
    }

    geom.vertices.push( src.clone() );
    geom.vertices.push( dst.clone() );
    geom.computeLineDistances(); // This one is SUPER important, otherwise dashed lines will appear as simple plain lines

    var axis = new THREE.Line( geom, mat, THREE.LinePieces );

    return axis;

}

jQuery(document).ready(function() {
    jQuery(".buttons-detail").hide();
    jQuery(".buttons-header").click(function() {
        jQuery(this).next().slideToggle();
    });
    jQuery("#face-buttons .buttons-detail").show();
});