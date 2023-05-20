// Importation des modules
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'lil-gui'
import { FontLoader } from 'three/addons/loaders/FontLoader.js';
import { TextGeometry } from 'three/addons/geometries/TextGeometry.js';

// Configuration de base
const gui = new dat.GUI() // Interface de débogage
const canvas = document.querySelector('canvas.webgl') // Sélectionne le canvas WebGL
const scene = new THREE.Scene() // Crée une nouvelle scène

// Chargement des textures
const textureLoader = new THREE.TextureLoader() // Chargeur de textures

const environmentMapTexture = new THREE.CubeTextureLoader().load([
  '/textures/environmentMaps/3/px.jpg',
  '/textures/environmentMaps/3/nx.jpg',
  '/textures/environmentMaps/3/py.jpg',
  '/textures/environmentMaps/3/ny.jpg',
  '/textures/environmentMaps/3/pz.jpg',
  '/textures/environmentMaps/3/nz.jpg'
]) // Texture de l'environnement

const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg') // Texture de metalness
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg') // Texture de roughness

// Chargement des polices
const fontLoader = new FontLoader() // Chargeur de polices

fontLoader.load('/fonts/Bruno Ace SC_Regular.json', (font) => {
  // Géométrie du texte
  const textGeometry = new TextGeometry('STUDIO CARRE', {
    font: font,
    size: 0.7,
    height: 0.6,
    curveSegments: 6,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegments: 4
  })

  textGeometry.center()

  // Matériau du texte
  const material = new THREE.MeshStandardMaterial()

  material.metalness = 0.8
  material.roughness = 0.05
  material.aoMapIntensity = 1
  material.envMap = environmentMapTexture
  material.displacementScale = 1

  // Ajout des propriétés au panneau de configuration
  gui.add(material, 'metalness').min(0).max(1).step(0.0001)
  gui.add(material, 'roughness').min(0).max(1).step(0.0001)
  gui.add(material, 'transparent').min(0).max(1).step(0.0001)

  // Création du maillage pour le texte
  const text = new THREE.Mesh(textGeometry, material)
  scene.add(text)

  // Géométrie du donut (boîte)
  const donutGeometry = new THREE.BoxGeometry(1, 1, 1, 1, 20, 45)

  // Création des maillages de donuts
  for (let i = 0; i < 100; i++) {
    const donut = new THREE.Mesh(donutGeometry, material)

    donut.position.x = (Math.random() - 0.5) * 10
    donut.position.y = (Math.random() - 0.5) * 10
    donut.position.z = (Math.random() - 0.5) * 10

    donut.rotation.x = Math.random() * Math.PI
    donut.rotation.y = Math.random() * Math.PI

    const scale = Math.random()

    donut.scale.x = scale
    donut.scale.y = scale
    donut.scale.z = scale

    scene.add(donut)
  }
})

// Tailles de la fenêtre
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

window.addEventListener('resize', () => {
  // Mise à jour des tailles
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // Mise à jour de la caméra
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // Mise à jour du rendu
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Caméra
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 2
scene.add(camera)

// Contrôles de la caméra
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Rendu
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Boucle d'animation
const clock = new THREE.Clock()

const tick = () => {
  const elapsedTime = clock.getElapsedTime()

  // Mise à jour des objets


  // Mise à jour des contrôles
  controls.update()

  // Rendu
  renderer.render(scene, camera)

  // Appel de tick à la prochaine frame
  window.requestAnimationFrame(tick)
}

tick()
