import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;
document.body.appendChild( renderer.domElement );

var meshFloor = new THREE.Mesh(
	new THREE.BoxGeometry(500, 0.1, 500),
	new THREE.MeshStandardMaterial({ color: 0x808080, roughness: 0.0 })
);
meshFloor.receiveShadow = true;
scene.add(meshFloor);

var manager = new THREE.LoadingManager();
new MTLLoader(manager).setPath('models/male02/')
               .load('male02.mtl',function(materials) {
		       materials.preload();
		       new OBJLoader(manager).setPath('models/male02/')
		                  .setMaterials(materials)
			          .load('male02.obj',function (object) {
					  object.castShadow = true;
					  scene.add(object);
				  });
	       });

var sphere = new THREE.Mesh(
                  new THREE.SphereGeometry(50, 100, 100),
                  new THREE.MeshPhongMaterial({
                     color: 0x0000ff
                       }));
sphere.castShadow = true;
scene.add(sphere);

var directionalLight = new THREE.DirectionalLight(0xFFFFFF);
directionalLight.position.set(-150, 150, 0);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 2048;
directionalLight.shadow.mapSize.height = 2048;
directionalLight.shadow.camera.position.set(0, 100, 0);
directionalLight.shadow.camera.right = 200;
directionalLight.shadow.camera.left = -200;
directionalLight.shadow.camera.top = 200;
directionalLight.shadow.camera.bottom = -200;
scene.add(directionalLight);

let cameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera);
scene.add(cameraHelper);

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
