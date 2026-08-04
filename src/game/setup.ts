import * as THREE from 'three';

/** 舞台场景底：比页面渐变更深一档，读成「窗口」 */
export const SCENE_SKY = 0x1f6fa8;

export function createScene(canvas: HTMLCanvasElement): {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.OrthographicCamera;
  cameraPivot: THREE.Group;
  resize: () => void;
} {
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(SCENE_SKY);
  scene.fog = new THREE.Fog(SCENE_SKY, 22, 38);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: false,
    powerPreference: 'high-performance',
    failIfMajorPerformanceCaveat: false,
  });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  const frustum = 6.5;
  const camera = new THREE.OrthographicCamera(-frustum, frustum, frustum, -frustum, 1, 40);
  camera.position.set(8, 6, 6);
  camera.lookAt(0, 0, 0);

  const cameraPivot = new THREE.Group();
  cameraPivot.add(camera);
  cameraPivot.rotation.set(0, -Math.PI / 2, 0);
  scene.add(cameraPivot);

  // 半球光：天空冷蓝 / 地面微暖，形成体积
  const hemi = new THREE.HemisphereLight(0x9fd4ff, 0xc4a574, 0.42);
  scene.add(hemi);

  const ambient = new THREE.AmbientLight(0xffffff, 0.38);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xfff5e6, 1.05);
  sun.position.set(5, 14, 6);
  sun.castShadow = true;
  sun.shadow.mapSize.set(1024, 1024);
  sun.shadow.camera.left = -9;
  sun.shadow.camera.right = 9;
  sun.shadow.camera.bottom = -9;
  sun.shadow.camera.top = 9;
  sun.shadow.camera.near = 1;
  sun.shadow.camera.far = 32;
  sun.shadow.bias = -0.0008;
  sun.shadow.normalBias = 0.04;
  scene.add(sun);

  // 极淡阴影承接面：浮空路径落地
  const catcher = new THREE.Mesh(
    new THREE.PlaneGeometry(48, 48),
    new THREE.ShadowMaterial({ opacity: 0.28 }),
  );
  catcher.rotation.x = -Math.PI / 2;
  catcher.position.y = -0.28;
  catcher.receiveShadow = true;
  scene.add(catcher);

  const resize = () => {
    const wrap = canvas.parentElement;
    const cw = wrap?.clientWidth ?? 0;
    const ch = wrap?.clientHeight ?? 0;
    // 始终按正方形缓冲绘制；取 wrap 较短边，避免非方容器下被 CSS 纵向拉伸
    const side = Math.min(cw || Infinity, ch || Infinity);
    const s = Math.max(
      120,
      Math.floor(Number.isFinite(side) ? side : Math.min(650, window.innerWidth)),
    );
    renderer.setSize(s, s, false);
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.aspectRatio = '1 / 1';
  };

  resize();
  window.addEventListener('resize', resize);
  if (typeof ResizeObserver !== 'undefined' && canvas.parentElement) {
    new ResizeObserver(resize).observe(canvas.parentElement);
  }

  document.addEventListener('dblclick', (e) => e.preventDefault());

  return { scene, renderer, camera, cameraPivot, resize };
}
