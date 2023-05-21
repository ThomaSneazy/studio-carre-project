// Importation des modules
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import * as dat from 'lil-gui';
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

//color
const parameters = {
  color: 66000000
}

// Configuration de base
const gui = new dat.GUI(); // Interface de débogage
const canvas = document.querySelector('.webgl'); // Sélectionne le canvas WebGL
const scene = new THREE.Scene(); // Crée une nouvelle scène
const sceneBackground = { color: '#000000' }


// Chargement des textures
const textureLoader = new THREE.TextureLoader(); // Chargeur de textures

const environmentMapTexture = new THREE.CubeTextureLoader().load([
  '/textures/environmentMaps/10/px.png',
  '/textures/environmentMaps/10/nx.png',
  '/textures/environmentMaps/10/py.png',
  '/textures/environmentMaps/10/ny.png',
  '/textures/environmentMaps/10/pz.png',
  '/textures/environmentMaps/10/nz.png'
]); // Texture de l'environnement

// Texture de metalness
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
// Texture de roughness
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

// Chargement des polices
const fontLoader = new FontLoader(); // Chargeur de polices

// Material
const material = new THREE.MeshStandardMaterial();

material.metalness = 0.8;
material.roughness = 0.05;
material.aoMapIntensity = 1;
material.envMap = environmentMapTexture;
material.displacementScale = 1;




fontLoader.load('/fonts/Bruno Ace SC_Regular.json', (font) => {
  // Géométrie du texte
  const textGeometry = new TextGeometry('STUDIO CARRE', {
    font: font,
    size: 0.7,
    height: 0.6,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.09,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4
  });

  textGeometry.center();

  // Création du maillage pour le texte
  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);
}
);

// Géométrie de la sphère
const sphereGeometry = new THREE.SphereGeometry(0.5, 64, 64);
material

// Création des maillages de sphere
for (let i = 0; i < 10; i++) {
  const sphere = new THREE.Mesh(sphereGeometry, material);

  sphere.position.x = (Math.random() - 0.5) * 10;
  sphere.position.y = (Math.random() - 0.5) * 10;
  sphere.position.z = (Math.random() - 0.5) * 10;

  sphere.rotation.x = Math.random() * Math.PI;
  sphere.rotation.y = Math.random() * Math.PI;

  const scale = Math.random();

  sphere.scale.x = scale;
  sphere.scale.y = scale;
  sphere.scale.z = scale;

  scene.add(sphere);
}
// Géométrie de la sphère
const tetraGeometry = new THREE.TetrahedronGeometry(3);
material

// Création des maillages de tetra
for (let i = 0; i < 5; i++) {
  const tetra = new THREE.Mesh(tetraGeometry, material);

  tetra.position.x = (Math.random() - 0.5) * 10;
  tetra.position.y = (Math.random() - 0.5) * 10;
  tetra.position.z = (Math.random() - 0.5) * 10;

  tetra.rotation.x = Math.random() * Math.PI;
  tetra.rotation.y = Math.random() * Math.PI;

  const scale = Math.random();

  tetra.scale.x = scale;
  tetra.scale.y = scale;
  tetra.scale.z = scale;

  scene.add(tetra);
}


// Géométrie du cube
const cubeGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 20, 45);
material

// Création des maillages de cube
for (let i = 0; i < 35; i++) {
  const cube = new THREE.Mesh(cubeGeometry, material);

  cube.position.x = (Math.random() - 0.5) * 10;
  cube.position.y = (Math.random() - 0.5) * 10;
  cube.position.z = (Math.random() - 0.5) * 10;

  cube.rotation.x = Math.random() * Math.PI;
  cube.rotation.y = Math.random() * Math.PI;

  const scale = Math.random();

  cube.scale.x = scale;
  cube.scale.y = scale;
  cube.scale.z = scale;

  scene.add(cube);
}

//Lights
const ambienLights = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambienLights)

const pointLight = new THREE.PointLight(0xffffff, 1)
pointLight.position.x = 1
pointLight.position.y = 2
pointLight.position.z = 3
scene.add(pointLight)

// Tailles de la fenêtre
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.addEventListener('resize', () => {
  // Mise à jour des tailles
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Mise à jour de la caméra
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Mise à jour du rendu
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Caméra
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 1000);
camera.position.x = 2;
camera.position.y = 1;
camera.position.z = 5;

scene.add(camera);

 // Ajout des propriétés au panneau de configuration
const cameraFolder = gui.addFolder('Camera Position');
cameraFolder.add(camera.position, 'x', 0, 10).step(0.1).name('Position X');
cameraFolder.add(camera.position, 'y', 0, 10).step(0.1).name('Position Y');
cameraFolder.add(camera.position, 'z', 0, 10).step(0.1).name('Position Z');

const materialFolder = gui.addFolder('Material')
materialFolder.add(material, 'metalness').min(0).max(1).step(0.0001);
materialFolder.add(material, 'roughness').min(0).max(1).step(0.0001);
materialFolder.add(material, 'wireframe').min(0).max(1)
materialFolder.addColor(parameters, 'color')
    .onChange(() =>
    {
        material.color.set(parameters.color)
    })
    .name('Color material')

const ambienLightsFolder = gui.addFolder('Ambient Light');
ambienLightsFolder.add(ambienLights, 'intensity').min(0).max(10).step(0.1).name('Intensity');
ambienLightsFolder.add(pointLight.position, 'x', 0, 10).step(0.1).name('Position X');
ambienLightsFolder.add(pointLight.position, 'y', 0, 10).step(0.1).name('Position Y');
ambienLightsFolder.add(pointLight.position, 'z', 0, 10).step(0.1).name('Position Z');

const sceneFolder = gui.addFolder('Scene background color');
sceneFolder.addColor(sceneBackground, 'color')
  .onChange(() => {
    const color = new THREE.Color(sceneBackground.color);
    scene.background = color;
  })
  .name('Color');
    // console.log(scene.background);

// Contrôles de la caméra
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Rendu
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Boucle d'animation
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Animation des cubes
  scene.children.forEach((child) => {
    if (child instanceof THREE.Mesh && child.geometry instanceof THREE.BoxGeometry && THREE.SphereGeometry && THREE.TetrahedronGeometry) {
      child.rotation.z = 0.03 * elapsedTime;
      child.rotation.x = 0.06 * elapsedTime;
    }
  });

  scene.children.forEach((child) => {
    if (child instanceof THREE.Mesh && child.geometry instanceof THREE.TetrahedronGeometry) {
      child.rotation.z = 0.07 * elapsedTime;
      child.rotation.x = 0.02 * elapsedTime;
    }
  });

  scene.children.forEach((child) => {
    if (child instanceof THREE.Mesh && child.geometry instanceof THREE.SphereGeometry) {
      child.rotation.z = 0.02 * elapsedTime;
      child.rotation.x = 0.02 * elapsedTime;
      child.rotation.y = 0.02 * elapsedTime;
    }
  });

  // Mise à jour des contrôles
  controls.update();

  // Rendu
  renderer.render(scene, camera);

  // Appel de tick à la prochaine frame
  window.requestAnimationFrame(tick);
};


tick();
