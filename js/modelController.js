let container;
let camera;
let controls;
let renderer;
let scene;
let model;
let topLight, bottomLight;

const mixers = [];
const clock = new THREE.Clock();

function init() {
  container = document.querySelector("#scene-container");

  scene = new THREE.Scene();

  createCamera();
  createLights();
  loadModels();
  createControls();
  createRenderer();

  renderer.setAnimationLoop(() => {
    controls.update();
    update();
    render();
  });
}

function createCamera() {
  camera = new THREE.PerspectiveCamera(
    45,
    container.clientWidth / container.clientHeight,
    .1,
    1000
  );
  camera.position.x = -2;
  camera.position.y = 1.8;
  camera.position.z = 0;
}

function createLights() {
  var sphere = new THREE.SphereBufferGeometry(.1, 8, 8 );

  const ambientLight = new THREE.HemisphereLight(0xfffff0, 5);

  topLight = new THREE.PointLight(0x0040ff, 5, 100, 2);
  topLight.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0x0040ff})));
  topLight.castShadow = true;

  bottomLight = new THREE.PointLight(0x0040ff, 1, 100, 2);
  bottomLight.add(new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({color: 0x0040ff})));
  topLight.castShadow = true;

  scene.add(ambientLight, topLight, bottomLight);
}

function loadModels() {
  const loader = new THREE.GLTFLoader();

  // A reusable function to set up the models. Position parameter to move model
  const onLoad = (gltf, position) => {
    model = gltf.scene.children[0];
    model.position.copy(position);
    model.castShadow = true;

    scene.add(model);
  };

  const onProgress = () => {};
  const onError = errorMessage => {
    console.log(errorMessage);
  };

  // model is loaded asynchronously,
  const atlasPosition = new THREE.Vector3(0, 0, 0);
  loader.load(
    "/models/CDCase_CDCOVERV.glb",
    gltf => onLoad(gltf, atlasPosition),
    onProgress,
    onError
  );
}

function createControls() {
  controls = new THREE.OrbitControls(camera, container);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.7;
  // controls.enableZoom = false;
  controls.enableKeys = false;
  controls.enablePan = false;
  // controls.maxPolarAngle = 1.6;
}

function createRenderer() {
  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setClearColor( new THREE.Color( 0xff0000 ) );
  renderer.setClearAlpha( 0 );
  renderer.setSize(container.clientWidth, container.clientHeight);

  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  container.appendChild(renderer.domElement);
}

function update() {
  const delta = clock.getDelta();
  var time = Date.now() * 0.0005;
  
  topLight.position.x = (Math.sin( time * 0.7 ) * 20)/100;
  topLight.position.y = 1;
  topLight.position.z = (Math.cos( time * 0.3 ) * 30)/100;

  bottomLight.position.x = (Math.sin( time * 0.7 ) * 20)/100;
  bottomLight.position.y = -1;
  bottomLight.position.z = (Math.cos(  time * 0.3 ) * 30)/100;

  for (const mixer of mixers) {
    mixer.update(delta);
  }
}

function render() {
  renderer.render(scene, camera);
}

function onWindowResize() {
  camera.aspect = container.clientWidth / container.clientHeight;

  // update the camera's frustum
  camera.updateProjectionMatrix();

  renderer.setSize(container.clientWidth, container.clientHeight);
}

window.addEventListener("resize", onWindowResize);

init();
