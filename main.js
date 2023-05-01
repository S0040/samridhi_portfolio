import './style.css'

import * as THREE from 'three';
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#background"),
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(31);

renderer.render(scene, camera);
const geometry = new THREE.TorusGeometry(11,5,15, 100)
const material = new THREE.MeshStandardMaterial({ color: 0xff6347 });
// const torus = new THREE.Mesh(geometry, material);
// scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);
function Stars() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

// Call the Stars() function 1300 times to create the star field
Array(1300).fill().forEach(Stars);

// Load the space texture and set it as the scene background
const spaceTexture = new THREE.TextureLoader().load('./sky.png');
scene.background = spaceTexture;



function animateStars() {
  requestAnimationFrame(animateStars);
  // Loop through all the stars in the scene and update their positions
  scene.children.forEach((star) => {
    star.position.z += 0.5;
    // Reset the position of stars that have moved too far away
    if (star.position.z > 100) {
      star.position.z = THREE.MathUtils.randFloatSpread(-100);
    }
  });
  renderer.render(scene, camera);
}
animateStars();

// moon

const moonTexture = new THREE.TextureLoader().load('./moon.jpg');
const moonMaterial = new THREE.MeshStandardMaterial({ map: moonTexture });


const moonGeometry = new THREE.SphereGeometry(3, 32, 32);
const moonMesh = new THREE.Mesh(moonGeometry, moonMaterial);
scene.add(moonMesh);


moonMesh.position.set(-10, 0, 30);
const light = new THREE.PointLight(0xffffff, 1);
light.position.set(0, 0, 30);
scene.add(light);

camera.position.z = 50;

// define variables for the circular motion
const center = new THREE.Vector3(0, 0, 30); // center of the circle
const radius = 10; // radius of the circle
let angle = 0; // current angle of rotation

// move the moon in a circular path
function moveMoon() {
  const x = center.x + radius * Math.sin(angle);
  const y = center.y + radius * Math.cos(angle);
  const z = center.z;

  moonMesh.position.set(x, y, z);
  angle += 0.01; // increment the angle
}

// rotate the moon
function rotateMoon() {
  moonMesh.rotation.x += 0.01;
  moonMesh.rotation.y += 0.01;
  moonMesh.rotation.z += 0.01;

}



function animate() {
	requestAnimationFrame( animate );
  rotateMoon();
  moveMoon();

	

	renderer.render( scene, camera );
}

animate();
