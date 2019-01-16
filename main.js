function init(){
  var scene = new THREE.Scene();
  var clock = new THREE.Clock();

  var camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    1,
    1000
  );
  camera.position.x = 10;
  camera.position.y = 15;
  camera.position.z = 25;
  camera.lookAt(new THREE.Vector3(0,0,0));

  var renderer = new THREE.WebGLRenderer();
  renderer.setClearColor('rgb(255, 255, 255)');
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("webgl").appendChild(renderer.domElement);

  var geometry = new THREE.CylinderGeometry(0, 3, 5, 4);
  var material = new THREE.MeshBasicMaterial({color: 0x000000, wireframe: false});
  var cylinder = new THREE.Mesh(geometry, material);
  scene.add(cylinder);

  var renderPass = new THREE.RenderPass(scene, camera);

  var effectGlitch = new THREE.GlitchPass(64);
  effectGlitch.renderToScreen = true;

  var composer = new THREE.EffectComposer(renderer);
  composer.addPass(renderPass);
  composer.addPass(effectGlitch);

  update(renderer, scene, camera, clock, composer, cylinder);

  return scene;
}

function update(renderer, scene, camera, clock, composer, cylinder){
  renderer.render(scene, camera);

  cylinder.rotation.y += .01;

  requestAnimationFrame(function(){
    update(renderer, scene, camera, clock, composer, cylinder);
  });
  composer.render(clock.getDelta());
}

var scene = init();
