import * as THREE from 'three';

export function createScene(canvas: HTMLCanvasElement): {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.OrthographicCamera;
  cameraPivot: THREE.Group;
  resize: () => void;
} {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x3498db);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.shadowMap.enabled = true;

  const frustum = 6.5;
  const camera = new THREE.OrthographicCamera(-frustum, frustum, frustum, -frustum, 1, 40);
  camera.position.set(8, 6, 6);
  camera.lookAt(0, 0, 0);

  const cameraPivot = new THREE.Group();
  cameraPivot.add(camera);
  cameraPivot.rotation.set(0, -Math.PI / 2, 0);
  scene.add(cameraPivot);

  const ambient = new THREE.AmbientLight(0xffffff, 0.65);
  scene.add(ambient);

  const dir = new THREE.DirectionalLight(0xffffff, 0.65);
  dir.position.set(0, 12, 0);
  dir.castShadow = true;
  dir.shadow.camera.left = -7;
  dir.shadow.camera.right = 7;
  dir.shadow.camera.bottom = -7;
  dir.shadow.camera.top = 7;
  dir.shadow.mapSize.set(256, 256);
  scene.add(dir);

  const resize = () => {
    const wrap = canvas.parentElement;
    const size = wrap
      ? Math.floor(Math.min(wrap.clientWidth, wrap.clientHeight))
      : Math.min(650, window.innerWidth);
    const s = Math.max(120, size);
    renderer.setSize(s, s, false);
  };

  resize();
  window.addEventListener('resize', resize);
  if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
    new ResizeObserver(resize).observe(canvas.parentElement);
  }

  document.addEventListener('dblclick', (e) => e.preventDefault());

  return { scene, renderer, camera, cameraPivot, resize };
}
