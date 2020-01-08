import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var manager = new THREE.LoadingManager();
new MTLLoader(manager).setPath('models/male02/')
               .load('male02.mtl',function(materials) {
		       materials.preload();
		       new OBJLoader(manager).setPath('models/male02/')
		                  .setMaterials(materials)
			          .load('male02.obj',function (object) {
					  object.position.y = - 95;
					  scene.add(object);
				  });
	       });

var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

var controls = new OrbitControls(camera, renderer.domElement)

camera.position.z = 250;
controls.update();

function animate() {
	requestAnimationFrame( animate );
	//cube.rotation.x += 0.01;
	//cube.rotation.y += 0.01;
	renderer.render( scene, camera );
	controls.update();
}
animate();
