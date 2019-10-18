let container;
let camera;
let controls;
let renderer;
let scene;

const mixers = [];
const clock = new THREE.Clock();

function init() {
  container = document.querySelector("#scene-container");

  scene = new THREE.Scene();

  createCamera();
  createControls();
  createLights();
  loadModels();
  createRenderer();

  renderer.setAnimationLoop(() => {
    controls.update();
    update();
    render();
  });
}

function createCamera() {
  camera = new THREE.PerspectiveCamera(
    10,
    container.clientWidth / container.clientHeight,
    1,
    1000
  );
  camera.position.set(.5, 3, -1);
}

function createControls() {
  controls = new THREE.OrbitControls(camera, container);
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.7;
  controls.enableZoom = false;
  controls.enableKeys = false;
  controls.enablePan = false;
  // controls.maxPolarAngle = 1.6;
}

function createLights() {
  const ambientLight = new THREE.HemisphereLight(0xddeeff, 0x0f0e0d, 5);

  const mainLight = new THREE.DirectionalLight(0xffffff, 5);
  mainLight.position.set(10, 10, 10);

  scene.add(ambientLight, mainLight);
}

function loadModels() {
  const loader = new THREE.GLTFLoader();

  // A reusable function to set up the models. Position parameter to move model
  const onLoad = (gltf, position) => {
    const model = gltf.scene.children[0];
    model.position.copy(position);

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

function createRenderer() {
  // create a WebGLRenderer and set its width and height
  renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setClearColor( new THREE.Color( 0xff0000 ) );
  renderer.setClearAlpha( 0 );
  renderer.setSize(container.clientWidth, container.clientHeight);

  renderer.setPixelRatio(window.devicePixelRatio);

  renderer.gammaFactor = 2.2;
  renderer.gammaOutput = true;

  renderer.physicallyCorrectLights = true;

  container.appendChild(renderer.domElement);
}

function update() {
  const delta = clock.getDelta();

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
