import * as THREE from 'three';

/** 晴空游乐场：浅天蓝场景底，偏暖主光 */
export const SCENE_SKY = 0x8fd3f4;

export function createScene(canvas: HTMLCanvasElement): {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.OrthographicCamera;
  cameraPivot: THREE.Group;
  resize: () => void;
} {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(SCENE_SKY);

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.shadowMap.enabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const frustum = 6.5;
  const camera = new THREE.OrthographicCamera(-frustum, frustum, frustum, -frustum, 1, 40);
  camera.position.set(8, 6, 6);
  camera.lookAt(0, 0, 0);

  const cameraPivot = new THREE.Group();
  cameraPivot.add(camera);
  cameraPivot.rotation.set(0, -Math.PI / 2, 0);
  scene.add(cameraPivot);

  const ambient = new THREE.AmbientLight(0xfff6e8, 0.92);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xfff2d6, 1.05);
  sun.position.set(4, 14, 6);
  sun.castShadow = true;
  sun.shadow.camera.left = -7;
  sun.shadow.camera.right = 7;
  sun.shadow.camera.bottom = -7;
  sun.shadow.camera.top = 7;
  sun.shadow.mapSize.set(512, 512);
  scene.add(sun);

  const fill = new THREE.DirectionalLight(0xb8e4ff, 0.45);
  fill.position.set(-6, 6, -4);
  scene.add(fill);

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
