import * as THREE from 'three';

/** 舞台场景底：清透的玩具蓝，与页面天空同属一个世界 */
export const SCENE_SKY = 0x2f8fd0;

export function createScene(canvas: HTMLCanvasElement): {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  camera: THREE.OrthographicCamera;
  cameraPivot: THREE.Group;
  frameBoard: (cols: number, rows: number) => void;
  setHighAltitude: (enabled: boolean) => void;
  resize: () => void;
} {
  const scene = new THREE.Scene();
  const skyColor = new THREE.Color(SCENE_SKY);
  const sceneFog = new THREE.Fog(SCENE_SKY, 22, 38);
  scene.background = skyColor;
  scene.fog = sceneFog;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'high-performance',
    failIfMajorPerformanceCaveat: false,
  });
  renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.08;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.setClearColor(SCENE_SKY, 1);

  const frustum = 6.5;
  const camera = new THREE.OrthographicCamera(-frustum, frustum, frustum, -frustum, 1, 40);
  camera.position.set(8, 6, 6);
  camera.lookAt(0, 0, 0);

  const cameraPivot = new THREE.Group();
  cameraPivot.add(camera);
  cameraPivot.rotation.set(0, -Math.PI / 2, 0);
  scene.add(cameraPivot);

  // 半球光：天空清蓝 / 地面微暖，托出软质树脂的体积
  const hemi = new THREE.HemisphereLight(0xbce9ff, 0xc69b72, 0.56);
  scene.add(hemi);

  const ambient = new THREE.AmbientLight(0xffffff, 0.46);
  scene.add(ambient);

  const sun = new THREE.DirectionalLight(0xfff8ed, 1.22);
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

  // 极淡阴影承接面：托盘下方仍保留一层软阴影，不抢舞台本身的层次。
  const catcherMaterial = new THREE.ShadowMaterial({ opacity: 0.22 });
  const catcher = new THREE.Mesh(
    new THREE.PlaneGeometry(48, 48),
    catcherMaterial,
  );
  catcher.rotation.x = -Math.PI / 2;
  catcher.position.y = -0.82;
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

  const frameBoard = (cols: number, rows: number) => {
    const projectedSpan = Math.max(1, cols + rows);
    camera.zoom = THREE.MathUtils.clamp(12 / projectedSpan, 0.76, 1.35);
    camera.updateProjectionMatrix();
  };

  const setHighAltitude = (enabled: boolean) => {
    scene.background = enabled ? null : skyColor;
    scene.fog = enabled ? null : sceneFog;
    renderer.setClearColor(SCENE_SKY, enabled ? 0 : 1);
    // 高空没有地面，高空模式彻底关闭接影面；物体自身受光与砖面遮挡仍保留。
    catcher.visible = !enabled;
    sun.position.set(enabled ? 3 : 5, enabled ? 18 : 14, enabled ? 4 : 6);
    sun.shadow.radius = enabled ? 3 : 1;
  };

  return { scene, renderer, camera, cameraPivot, frameBoard, setHighAltitude, resize };
}
