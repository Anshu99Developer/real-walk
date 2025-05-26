/**
 * dat.globe Javascript WebGL Globe Toolkit
 * https://github.com/dataarts/webgl-globe
 *
 * Copyright 2011 Data Arts Team, Google Creative Lab
 *
 * Licensed under the Apache License, Version 2.0 (the 'License');
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */

var DAT = DAT || {};
DAT.Globe = function (container, opts) {
  opts = opts || {};

  var colorFn =
    opts.colorFn ||
    function (x) {
      const baseHue = 24 / 360; // THREE.js expects hue in [0,1]
      const baseSaturation = 0.61;
      const baseLightness = 0.58;

      const saturation = baseSaturation; // or tweak like: baseSaturation - x * 0.2
      const lightness = Math.max(0, Math.min(1, baseLightness - x * 0.3));

      const c = new THREE.Color();
      c.setHSL(baseHue, saturation, lightness);
      return c;
    };
  var imgDir = opts.imgDir || "/globe/";

  var Shaders = {
    earth: {
      uniforms: {
        globeTexture: { type: "t", value: null },
      },
      vertexShader: [
        "varying vec3 vNormal;",
        "varying vec2 vUv;",
        "void main() {",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "vNormal = normalize( normalMatrix * normal );",
        "vUv = uv;",
        "}",
      ].join("\n"),
      fragmentShader: [
        "uniform sampler2D globeTexture;",
        "varying vec3 vNormal;",
        "varying vec2 vUv;",
        "void main() {",
        "  vec4 texColor = texture2D(globeTexture, vUv);",
        "  if (texColor.a < 0.01) discard;", // Discard fully transparent pixels
        "  gl_FragColor = texColor;", // Use full RGBA from texture
        "}",
      ].join("\n"),
    },
    atmosphere: {
      uniforms: {},
      vertexShader: [
        "varying vec3 vNormal;",
        "void main() {",
        "vNormal = normalize( normalMatrix * normal );",
        "gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );",
        "}",
      ].join("\n"),
      fragmentShader: [
        "varying vec3 vNormal;",
        "void main() {",
        // "float intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );",
        // "gl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;",
        // "gl_FragColor = vec4( 1.0, 0.784, 0.39, 0.2 ) * intensity;", // Updated to #ffc864 with 30% opacity
        "float intensity = pow( 0.6 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 2.0 );",
        "gl_FragColor = vec4( 1.0, 0.784, 0.39, 0.2 ) * intensity;", // Updated to #ffc864 with 30% opacity
        "}",
      ].join("\n"),
    },
  };

  var camera, scene, renderer, w, h;
  var mesh, atmosphere, point;
  var outerGlobe;

  var overRenderer;

  var curZoomSpeed = 0;
  var zoomSpeed = 50;

  var mouse = { x: 0, y: 0 },
    mouseOnDown = { x: 0, y: 0 };
  var rotation = { x: 0, y: 0 },
    target = { x: (Math.PI * 3.4) / 2, y: Math.PI / -10.0 },
    targetOnDown = { x: 0, y: 0 };

  var distance = 100000,
    distanceTarget = 100000;
  var padding = 40;
  var PI_HALF = Math.PI / 2;

  function init() {
    container.style.color = "#fff";
    container.style.font = "13px/20px Arial, sans-serif";

    var shader, uniforms, material;
    w = container.offsetWidth || window.innerWidth;
    h = container.offsetHeight || window.innerHeight;

    camera =
      window.innerWidth < 992
        ? new THREE.PerspectiveCamera(60, w / h, 1, 10000)
        : new THREE.PerspectiveCamera(40, w / h, 1, 10000);
    camera.position.z = distance;

    scene = new THREE.Scene();

    // Add a light source so MeshPhongMaterial is visible
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
    scene.add(ambientLight);

    // Optionally, add a directional light for more effect
    // const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    // directionalLight.position.set(1, 1, 1).normalize();
    // scene.add(directionalLight);

    var geometry =
      window.innerWidth < 992
        ? new THREE.SphereGeometry(230, 40, 50)
        : new THREE.SphereGeometry(230, 40, 50);

    shader = Shaders["earth"];
    uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    uniforms["globeTexture"].value = new THREE.TextureLoader().load(
      imgDir + "Glob-Map.png"
    );

    material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      transparent: true, // Ensure PNG transparency is respected
      alphaTest: 0.01,   // Discard fully transparent pixels
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.rotation.y = Math.PI;
    scene.add(mesh);

    shader = Shaders["atmosphere"];
    uniforms = THREE.UniformsUtils.clone(shader.uniforms);

    material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader: shader.vertexShader,
      fragmentShader: shader.fragmentShader,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
    });

    mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(1.2, 1.2, 1.2);
    scene.add(mesh);

    // Add "inner" transparent globe with wave2.png as texture (between earth and atmosphere)
    const outerTexture = new THREE.TextureLoader().load("/globe/Glob-BG-1.png");
    const outerMaterial = new THREE.MeshPhongMaterial({
      map: outerTexture, // Use wave2.png as the texture
      // color: 0xffffff,
      transparent: true,
      opacity: 1, // Adjust for desired transparency
      shininess: 100,
      side: THREE.FrontSide,
    });
    outerGlobe = new THREE.Mesh(geometry, outerMaterial);
    outerGlobe.scale.set(0.98, 0.98, 0.98); // Slightly larger than earth, smaller than atmosphere
    scene.add(outerGlobe);

    geometry = new THREE.BoxGeometry(0.75, 0.75, 1);
    geometry.applyMatrix(new THREE.Matrix4().makeTranslation(0, 0, -0.5));

    point = new THREE.Mesh(geometry);

    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setClearColor(0x000000, 0); // transparent background
    renderer.setSize(w, h);

    renderer.domElement.style.position = "absolute";
    container.appendChild(renderer.domElement);

    // Add mousemove event for slight globe movement following mouse direction
    let lastMouseMove = { x: null, y: null };
    let mouseMoveActive = false;

    container.addEventListener("mousemove", function (event) {
      // Only apply if not dragging (i.e., mouse is not down)
      if (!mouseMoveActive) {
        if (lastMouseMove.x !== null && lastMouseMove.y !== null) {
          const dx = event.clientX - lastMouseMove.x;
          const dy = event.clientY - lastMouseMove.y;
          // Apply a small fraction to the target rotation for subtle effect
          target.x += dx * 0.00005;
          target.y += dy * 0.00005;
          // Clamp target.y to avoid flipping
          target.y = Math.max(-PI_HALF, Math.min(PI_HALF, target.y));
        }
        lastMouseMove.x = event.clientX;
        lastMouseMove.y = event.clientY;
      }
    });

    container.addEventListener("mousedown", function () {
      mouseMoveActive = true;
    });
    container.addEventListener("mouseup", function () {
      mouseMoveActive = false;
      lastMouseMove.x = null;
      lastMouseMove.y = null;
    });
    container.addEventListener("mouseout", function () {
      mouseMoveActive = false;
      lastMouseMove.x = null;
      lastMouseMove.y = null;
    });

    container.addEventListener("mousedown", onMouseDown, false);

    // Remove the mouse wheel event listener to disable zooming
    // container.addEventListener("mousewheel", onMouseWheel, false);

    document.addEventListener("keydown", onDocumentKeyDown, false);

    window.addEventListener("resize", onWindowResize, false);

    container.addEventListener(
      "mouseover",
      function () {
        overRenderer = true;
      },
      false
    );

    container.addEventListener(
      "mouseout",
      function () {
        overRenderer = false;
      },
      false
    );

    // Add touch event listenersz
    container.addEventListener("touchstart", onTouchStart, false);
    container.addEventListener("touchmove", onTouchMove, false);
    container.addEventListener("touchend", onTouchEnd, false);
    container.addEventListener("touchmove", onPinchZoom, false);
    container.addEventListener("touchend", onTouchEndPinch, false);

    // Add click event to detect country
    container.addEventListener("click", (event) => {
      const intersected = getIntersectedObject(
        event.clientX,
        event.clientY,
        camera,
        scene
      );
    });
  }

  function addData(data, opts) {
    var lat, lng, size, color, i, step, colorFnWrapper;

    opts.animated = opts.animated || false;
    this.is_animated = opts.animated;
    opts.format = opts.format || "magnitude"; // other option is 'legend'
    if (opts.format === "magnitude") {
      step = 3;
      colorFnWrapper = function (data, i) {
        return colorFn(data[i + 2]);
      };
    } else if (opts.format === "legend") {
      step = 4;
      colorFnWrapper = function (data, i) {
        return colorFn(data[i + 3]);
      };
    } else {
      throw "error: format not supported: " + opts.format;
    }

    if (opts.animated) {
      if (this._baseGeometry === undefined) {
        this._baseGeometry = new THREE.Geometry();
        for (i = 0; i < data.length; i += step) {
          lat = data[i];
          lng = data[i + 1];
          color = colorFnWrapper(data, i);
          size = 0;
          addPoint(lat, lng, size, color, this._baseGeometry, opts.countryName);
        }
      }
      if (this._morphTargetId === undefined) {
        this._morphTargetId = 0;
      } else {
        this._morphTargetId += 1;
      }
      opts.name = opts.name || "morphTarget" + this._morphTargetId;
    }
    var subgeo = new THREE.Geometry();
    for (i = 0; i < data.length; i += step) {
      lat = data[i];
      lng = data[i + 1];
      color = colorFnWrapper(data, i);
      size = data[i + 2];
      size = size * 200;
      addPoint(lat, lng, size, color, subgeo, opts.countryName);
    }
    if (opts.animated) {
      this._baseGeometry.morphTargets.push({
        name: opts.name,
        vertices: subgeo.vertices,
      });
    } else {
      this._baseGeometry = subgeo;
    }
  }

  this.zoomToLocation = (lat, lng, callback) => {
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((180 - lng) * Math.PI) / 180;

    const targetX = 1000 * Math.sin(phi) * Math.cos(theta);
    const targetY = 1000 * Math.cos(phi);
    const targetZ = 1000 * Math.sin(phi) * Math.sin(theta);

    this._cameraTarget = { x: targetX, y: targetY, z: targetZ };
    this._onZoomComplete = callback; // Store the callback
  };

  function createPoints() {
    if (this._baseGeometry !== undefined) {
      if (this.is_animated === false) {
        this.points = new THREE.Mesh(
          this._baseGeometry,
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            vertexColors: THREE.FaceColors,
            morphTargets: false,
          })
        );
      } else {
        if (this._baseGeometry.morphTargets.length < 8) {
          var padding = 8 - this._baseGeometry.morphTargets.length;
          for (var i = 0; i <= padding; i++) {
            this._baseGeometry.morphTargets.push({
              name: "morphPadding" + i,
              vertices: this._baseGeometry.vertices,
            });
          }
        }
        this.points = new THREE.Mesh(
          this._baseGeometry,
          new THREE.MeshBasicMaterial({
            color: 0xffffff,
            vertexColors: THREE.FaceColors,
            morphTargets: true,
          })
        );
      }
      scene.add(this.points);
    }
  }

  function addPoint(lat, lng, size, color, subgeo, countryName) {
    var phi = ((90 - lat) * Math.PI) / 180;
    var theta = ((180 - lng) * Math.PI) / 180;

    var x = 150 * Math.sin(phi) * Math.cos(theta);
    var y = 150 * Math.cos(phi);
    var z = 150 * Math.sin(phi) * Math.sin(theta);

    var dir = new THREE.Vector3(x, y, z).normalize();
    var end = new THREE.Vector3().copy(dir).multiplyScalar(220 + size); // line extends out

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(x, y, z)); // from surface
    geometry.vertices.push(end); // to extended end

    var line = new THREE.Line(
      geometry,
      new THREE.LineBasicMaterial({ color: color })
    );

    // Add userData with country name
    line.userData = { country: countryName, lat, lng }; // Add lat/lng to userData

    scene.add(line);
  }

  function getIntersectedObject(mouseX, mouseY, camera, scene) {
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    // Convert mouse position to normalized device coordinates
    mouse.x = (mouseX / window.innerWidth) * 2 - 1;
    mouse.y = -(mouseY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    const intersects = raycaster.intersectObjects(scene.children, true);
    return intersects.length > 0 ? intersects[0] : null;
  }

  // Expose the method
  this.getIntersectedObject = (mouseX, mouseY) =>
    getIntersectedObject(mouseX, mouseY, camera, scene);

  function isLocationIndia(lat, lng) {
    return lat > 5 && lat < 35 && lng > 65 && lng < 90; // Rough bounding box for India
  }

  function isLocationDubai(lat, lng) {
    return lat > 24.5 && lat < 25.5 && lng > 54.5 && lng < 55.5; // Adjusted bounding box for Dubai
  }

  function showPopup(x, y, locations) {
    let popup = document.getElementById("location-popup");
    if (!popup) {
      popup = document.createElement("div");
      popup.id = "location-popup";
      popup.style.position = "absolute";
      popup.style.background = "white";
      popup.style.border = "1px solid black";
      popup.style.padding = "10px";
      popup.style.zIndex = 1000;
      document.body.appendChild(popup);
    }

    popup.style.left = `${x}px`;
    popup.style.top = `${y}px`;
    popup.innerHTML = `<strong>Locations:</strong><ul>${locations
      .map((loc) => `<li>${loc}</li>`)
      .join("")}</ul>`;
    popup.style.display = "block";
  }

  function hidePopup() {
    const popup = document.getElementById("location-popup");
    if (popup) {
      popup.style.display = "none";
    }
  }

  function onMouseDown(event) {
    event.preventDefault();

    container.addEventListener("mousemove", onMouseMove, false);
    container.addEventListener("mouseup", onMouseUp, false);
    container.addEventListener("mouseout", onMouseOut, false);

    mouseOnDown.x = -event.clientX;
    mouseOnDown.y = event.clientY;

    targetOnDown.x = target.x;
    targetOnDown.y = target.y;

    container.style.cursor = "grabbing";
  }

  function onMouseMove(event) {
    mouse.x = -event.clientX;
    mouse.y = event.clientY;

    var zoomDamp = distance / 1000;

    target.x = targetOnDown.x + (mouse.x - mouseOnDown.x) * 0.005 * zoomDamp;
    target.y = targetOnDown.y + (mouse.y - mouseOnDown.y) * 0.005 * zoomDamp;

    target.y = target.y > PI_HALF ? PI_HALF : target.y;
    target.y = target.y < -PI_HALF ? -PI_HALF : target.y;
  }

  function onMouseUp(event) {
    container.removeEventListener("mousemove", onMouseMove, false);
    container.removeEventListener("mouseup", onMouseUp, false);
    container.removeEventListener("mouseout", onMouseOut, false);
    container.style.cursor = "grab";
  }

  function onMouseOut(event) {
    container.removeEventListener("mousemove", onMouseMove, false);
    container.removeEventListener("mouseup", onMouseUp, false);
    container.removeEventListener("mouseout", onMouseOut, false);
  }

  function onMouseWheel(event) {
    event.preventDefault();
    if (overRenderer) {
      zoom(event.wheelDeltaY * 0.3);
    }
    return false;
  }

  function onTouchStart(event) {
    if (event.touches.length === 1) {
      event.preventDefault();
      mouseOnDown.x = -event.touches[0].clientX;
      mouseOnDown.y = event.touches[0].clientY;

      targetOnDown.x = target.x;
      targetOnDown.y = target.y;

      container.style.cursor = "grabbing";
    }
  }

  function onTouchMove(event) {
    if (event.touches.length === 1) {
      event.preventDefault();
      mouse.x = -event.touches[0].clientX;
      mouse.y = event.touches[0].clientY;

      var zoomDamp = distance / 1000;

      target.x = targetOnDown.x + (mouse.x - mouseOnDown.x) * 0.005 * zoomDamp;
      target.y = targetOnDown.y + (mouse.y - mouseOnDown.y) * 0.005 * zoomDamp;

      target.y = target.y > PI_HALF ? PI_HALF : target.y;
      target.y = target.y < -PI_HALF ? -PI_HALF : target.y;
    }
  }

  function onTouchEnd(event) {
    container.style.cursor = "grab";
  }

  function onPinchZoom(event) {
    if (event.touches.length === 2) {
      const dx = event.touches[0].clientX - event.touches[1].clientX;
      const dy = event.touches[0].clientY - event.touches[1].clientY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (this._lastPinchDistance) {
        const delta = distance - this._lastPinchDistance;
        zoom(delta * 0.1);
      }
      this._lastPinchDistance = distance;
    }
  }

  function onTouchEndPinch(event) {
    this._lastPinchDistance = null;
  }

  function onDocumentKeyDown(event) {
    switch (event.keyCode) {
      case 38:
        zoom(100);
        event.preventDefault();
        break;
      case 40:
        zoom(-100);
        event.preventDefault();
        break;
    }
  }

  function onWindowResize(event) {
    camera.aspect = container.offsetWidth / container.offsetHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.offsetWidth, container.offsetHeight);
  }

  function zoom(delta) {
    distanceTarget -= delta;
    distanceTarget = distanceTarget > 1000 ? 1000 : distanceTarget;
    distanceTarget = distanceTarget < 350 ? 350 : distanceTarget;
  }

  function addAnimatedSprite(
    lat,
    lng,
    texturePath,
    scale = 10,
    key,
    speed = 0.5
  ) {
    const spriteMap = new THREE.TextureLoader().load(texturePath);
    const spriteMaterial = new THREE.SpriteMaterial({
      map: spriteMap,
      transparent: true,
    });
    const sprite = new THREE.Sprite(spriteMaterial);

    sprite.userData.baseScale = scale;
    sprite.userData.key = key;
    sprite.scale.set(scale, scale, 1);

    const radius = window.innerWidth < 992 ? 170 + 1 : 200 + 1;
    const phi = ((90 - lat) * Math.PI) / 180;
    const theta = ((180 - lng) * Math.PI) / 180;

    sprite.position.x = radius * Math.sin(phi) * Math.cos(theta);
    sprite.position.y = radius * Math.cos(phi);
    sprite.position.z = radius * Math.sin(phi) * Math.sin(theta);

    // Remove the line that makes the sprite face the camera
    // sprite.lookAt(mesh.position);

    scene.add(sprite);

    // Add to global sprite list for animation
    if (!this._animatedSprites) this._animatedSprites = [];
    this._animatedSprites.push({
      sprite,
      speed,
      phase: Math.random() * Math.PI * 2,
      key,
    });
  }

  function render() {
    zoom(curZoomSpeed);

    rotation.x += (target.x - rotation.x) * 0.1;
    rotation.y += (target.y - rotation.y) * 0.1;
    distance += (distanceTarget - distance) * 0.3;

    camera.position.x = distance * Math.sin(rotation.x) * Math.cos(rotation.y);
    camera.position.y = distance * Math.sin(rotation.y);
    camera.position.z = distance * Math.cos(rotation.x) * Math.cos(rotation.y);

    // Smoothly interpolate the camera position
    if (this._cameraTarget) {
      camera.position.x += (this._cameraTarget.x - camera.position.x) * 0.1;
      camera.position.y += (this._cameraTarget.y - camera.position.y) * 0.1;
      camera.position.z += (this._cameraTarget.z - camera.position.z) * 0.1;

      const distanceToTarget = Math.sqrt(
        Math.pow(this._cameraTarget.x - camera.position.x, 2) +
          Math.pow(this._cameraTarget.y - camera.position.y, 2) +
          Math.pow(this._cameraTarget.z - camera.position.z, 2)
      );

      if (distanceToTarget < 1) {
        this._cameraTarget = null;
        if (this._onZoomComplete) {
          this._onZoomComplete(); // Execute the callback
          this._onZoomComplete = null; // Clear the callback
        }
      }
    }

    camera.lookAt(mesh.position);
       
    renderer.render(scene, camera);
  }
  init();
  this.animate = animate;

  function animate() {
    requestAnimationFrame(animate);
    // Animate sprites
    if (this._animatedSprites) {
      this._animatedSprites.forEach((item, idx) => {
        // update phase
        item.phase += item.speed * 0.02;
        // spin the sprite's texture
        item.sprite.material.rotation = item.phase;
      });
    }

    render(scene, camera);
  }

  this.__defineGetter__("time", function () {
    return this._time || 0;
  });

  this.__defineSetter__("time", function (t) {
    var validMorphs = [];
    var morphDict = this.points.morphTargetDictionary;
    for (var k in morphDict) {
      if (k.indexOf("morphPadding") < 0) {
        validMorphs.push(morphDict[k]);
      }
    }
    validMorphs.sort();
    var l = validMorphs.length - 1;
    var scaledt = t * l + 1;
    var index = Math.floor(scaledt);
    for (i = 0; i < validMorphs.length; i++) {
      this.points.morphTargetInfluences[validMorphs[i]] = 0;
    }
    var lastIndex = index - 1;
    var leftover = scaledt - index;
    if (lastIndex >= 0) {
      this.points.morphTargetInfluences[lastIndex] = 1 - leftover;
    }
    this.points.morphTargetInfluences[index] = leftover;
    this._time = t;
  });

  this.addData = addData;
  this.createPoints = createPoints;
  this.addAnimatedSprite = addAnimatedSprite;
  this.renderer = renderer;
  this.scene = scene;

  return this;
};
