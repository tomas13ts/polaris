"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Props = { paused: boolean; onReady: (ready: boolean) => void };
const TAU = Math.PI * 2;
const clamp = (n: number, a = 0, b = 1) => Math.min(b, Math.max(a, n));

/** Four original, procedural worlds. All particle morphing happens on the GPU. */
export function OrbitScene({ paused, onReady }: Props) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pausedRef = useRef(paused);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      onReady(false);
      return;
    }
    const mobile = window.innerWidth < 760;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 80);
    camera.position.z = 10;
    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, mobile ? 1.5 : 1.8),
    );
    renderer.setClearColor(0x040908, 0);
    host.appendChild(renderer.domElement);
    renderer.domElement.setAttribute("aria-hidden", "true");
    const world = new THREE.Group();
    scene.add(world);
    const count = mobile ? 11500 : 26000;
    const positions = [0, 1, 2, 3].map(() => new Float32Array(count * 3));
    const seeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    let seed = 7341;
    const random = () => {
      seed = (seed * 16807) % 2147483647;
      return (seed - 1) / 2147483646;
    };
    const hubs = [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-1.65, 1.35, 0.1),
      new THREE.Vector3(1.7, 1.05, -0.35),
      new THREE.Vector3(2.05, -1.4, 0.3),
      new THREE.Vector3(-1.8, -1.35, -0.4),
      new THREE.Vector3(0.3, 2.35, -0.9),
    ];
    const set = (s: number, i: number, x: number, y: number, z: number) =>
      positions[s].set([x, y, z], i * 3);
    for (let i = 0; i < count; i++) {
      const a = random() * TAU;
      const u = random();
      const v = random();
      seeds[i] = random();
      sizes[i] = 0.7 + Math.pow(random(), 4) * 2.8;
      // A finely layered accretion disc with flowing spiral filaments.
      const arm = Math.floor(random() * 5);
      const r = 1.02 + Math.pow(u, 0.72) * 2.13;
      const angle = a * 0.19 + (arm * TAU) / 5 + r * 2.4;
      const thickness = (v - 0.5) * (0.06 + (r - 1) * 0.19);
      set(
        0,
        i,
        Math.cos(angle) * r,
        Math.sin(angle) * r * 0.62 + thickness,
        Math.sin(angle) * r * 0.6 + thickness,
      );
      // Neural constellation: a dense core, satellite minds, and synapses.
      const hub = i % hubs.length;
      const center = hubs[hub];
      const phi = Math.acos(2 * u - 1);
      const sphereR = (hub === 0 ? 0.95 : 0.38) * (0.8 + v * 0.2);
      if (i % 5 === 0 && hub > 0) {
        set(
          1,
          i,
          center.x * u,
          center.y * u + Math.sin(u * Math.PI) * 0.26,
          center.z * u + Math.sin(u * TAU + a) * 0.07,
        );
      } else {
        set(
          1,
          i,
          center.x + sphereR * Math.sin(phi) * Math.cos(a),
          center.y + sphereR * Math.cos(phi),
          center.z + sphereR * Math.sin(phi) * Math.sin(a),
        );
      }
      // Software takes shape as a layered, connected computational architecture.
      const box = i % 7;
      const bx = ((box % 3) - 1) * 1.65;
      const by = Math.floor(box / 3) * 1.35 - 0.9;
      let x = (u - 0.5) * 1.25,
        y = (v - 0.5) * 0.88,
        z = (random() - 0.5) * 0.9;
      const side = i % 3;
      if (side === 0) {
        x = (i % 2 ? 1 : -1) * 0.625;
        z = (i % 4 < 2 ? 1 : -1) * 0.45;
      }
      if (side === 1) {
        y = (i % 2 ? 1 : -1) * 0.44;
        x = (i % 4 < 2 ? 1 : -1) * 0.625;
      }
      if (side === 2) {
        z = (i % 2 ? 1 : -1) * 0.45;
        y = (i % 4 < 2 ? 1 : -1) * 0.44;
      }
      set(2, i, bx + x, by + y, z + (box % 2) * 0.45);
      // Commerce: three orbital product worlds inside a browser-shaped plane.
      if (i < count * 0.32) {
        const edge = i % 4;
        set(
          3,
          i,
          edge < 2 ? (edge ? 2.5 : -2.5) : (u - 0.5) * 5,
          edge >= 2 ? (edge === 2 ? 1.75 : -1.75) : (u - 0.5) * 3.5,
          -0.15 + (v - 0.5) * 0.04,
        );
      } else if (i < count * 0.4) {
        set(3, i, (u - 0.5) * 5, 1.25, -0.15);
      } else if (i < count * 0.49) {
        const product = i % 3;
        set(
          3,
          i,
          (product - 1) * 1.57 + (u - 0.5) * 0.85,
          -0.86 - (i % 2) * 0.18,
          -0.13,
        );
      } else if (i < count * 0.56) {
        const product = i % 3;
        const edge = i % 4;
        set(
          3,
          i,
          (product - 1) * 1.57 +
            (edge < 2 ? (edge ? 0.48 : -0.48) : (u - 0.5) * 0.96),
          edge >= 2 ? (edge === 2 ? -1.2 : -1.42) : -1.2 - u * 0.22,
          -0.13,
        );
      } else {
        const product = i % 3;
        if (product === 0) {
          const radius = 0.25 + 0.07 * Math.sin(v * Math.PI);
          set(
            3,
            i,
            -1.57 + radius * Math.cos(a),
            (v - 0.5) * 1.1,
            radius * Math.sin(a),
          );
        } else if (product === 1) {
          const ringR = 0.36 + 0.12 * Math.cos(v * TAU);
          set(
            3,
            i,
            ringR * Math.cos(a),
            ringR * Math.sin(a),
            0.12 * Math.sin(v * TAU),
          );
        } else {
          const radius = 0.24 + 0.12 * Math.sin(v * Math.PI * 1.7);
          set(
            3,
            i,
            1.57 + radius * Math.cos(a),
            (v - 0.5) * 1.2,
            radius * Math.sin(a),
          );
        }
      }
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions[0], 3),
    );
    geometry.setAttribute(
      "aNeural",
      new THREE.BufferAttribute(positions[1], 3),
    );
    geometry.setAttribute(
      "aSoftware",
      new THREE.BufferAttribute(positions[2], 3),
    );
    geometry.setAttribute(
      "aCommerce",
      new THREE.BufferAttribute(positions[3], 3),
    );
    geometry.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute("aSize", new THREE.BufferAttribute(sizes, 1));
    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      uniforms: {
        uTime: { value: 0 },
        uProgress: { value: 0 },
        uPixel: { value: renderer.getPixelRatio() },
        uPointer: { value: new THREE.Vector2() },
      },
      vertexShader: `
        attribute vec3 aNeural; attribute vec3 aSoftware; attribute vec3 aCommerce;
        attribute float aSeed; attribute float aSize;
        uniform float uTime; uniform float uProgress; uniform float uPixel; uniform vec2 uPointer;
        varying float vSeed; varying float vDepth; varying float vTwinkle;
        mat2 spin(float a) { return mat2(cos(a), -sin(a), sin(a), cos(a)); }
        void main() {
          float p = uProgress;
          vec3 galaxy = position;
          galaxy.xz = spin(uTime * 0.025) * galaxy.xz;
          vec3 neural = aNeural;
          neural.z += sin(uTime * 0.7 + aSeed * 25.) * 0.045;
          vec3 architecture = aSoftware;
          architecture.xz = spin(-0.35 + sin(uTime * 0.12) * 0.1) * architecture.xz;
          architecture.yz = spin(0.15) * architecture.yz;
          vec3 commerce = aCommerce;
          commerce.xz = spin(-0.18) * commerce.xz;
          vec3 pos = mix(galaxy, neural, smoothstep(0.12, 0.88, p));
          pos = mix(pos, architecture, smoothstep(1.12, 1.88, p));
          pos = mix(pos, commerce, smoothstep(2.12, 2.88, p));
          float transition = sin(fract(clamp(p, 0., 2.999)) * 3.14159);
          pos.z += sin(aSeed * 100. + uTime * 0.25) * transition * 0.36;
          pos.xy += uPointer * (0.035 + aSeed * 0.035);
          vec4 mv = modelViewMatrix * vec4(pos, 1.);
          gl_Position = projectionMatrix * mv;
          gl_PointSize = clamp(aSize * uPixel * (9. / -mv.z), 0.6, 5.5);
          vSeed = aSeed; vDepth = clamp(12. / -mv.z, .6, 1.5);
          vTwinkle = .68 + .32 * sin(aSeed * 90. + uTime * (0.4 + aSeed));
        }`,
      fragmentShader: `
        varying float vSeed; varying float vDepth; varying float vTwinkle;
        void main() {
          float d = length(gl_PointCoord - .5) * 2.;
          if(d > 1.) discard;
          vec3 color = mix(vec3(.22,.68,.54), vec3(.83,.95,.87), pow(vSeed, 2.));
          if(vSeed > .973) color = vec3(1.,.54,.22);
          float alpha = pow(1.-d, 1.5) * (.48 + vSeed * .62) * vTwinkle;
          gl_FragColor = vec4(color * vDepth, alpha);
        }`,
    });
    const points = new THREE.Points(geometry, material);
    points.frustumCulled = false;
    world.add(points);

    // The opaque core gives the galaxy a silhouette, not just a particle cloud.
    const coreMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: { uOpacity: { value: 1 }, uTime: { value: 0 } },
      vertexShader: `varying vec3 vNormal; varying vec3 vView; varying vec3 vPosition; void main(){ vec4 mv=modelViewMatrix*vec4(position,1.); vNormal=normalize(normalMatrix*normal); vView=normalize(-mv.xyz); vPosition=position; gl_Position=projectionMatrix*mv; }`,
      fragmentShader: `uniform float uOpacity; uniform float uTime; varying vec3 vNormal; varying vec3 vView; varying vec3 vPosition; void main(){ float edge=pow(1.-abs(dot(normalize(vNormal),normalize(vView))),4.); float bands=sin(vPosition.y*80.+uTime*.3)*.5+.5; vec3 color=vec3(.006,.014,.012)+edge*vec3(.32,.64,.49); color += edge*bands*.08; gl_FragColor=vec4(color,uOpacity); }`,
    });
    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.97, 64, 48),
      coreMaterial,
    );
    world.add(core);
    const filamentVertices: number[] = [];
    for (let strand = 0; strand < (mobile ? 24 : 48); strand++) {
      const base = 1.06 + strand * 0.039;
      for (let segment = 0; segment < 180; segment++) {
        for (let end = 0; end < 2; end++) {
          const a = ((segment + end) / 180) * TAU;
          const r = base + Math.sin(a * 3 + strand * 0.15) * 0.045;
          filamentVertices.push(
            Math.cos(a) * r,
            Math.sin(a) * r * 0.62,
            Math.sin(a) * r * 0.6,
          );
        }
      }
    }
    const filamentGeometry = new THREE.BufferGeometry();
    filamentGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(filamentVertices, 3),
    );
    const filamentMaterial = new THREE.LineBasicMaterial({
      color: 0xa7d2b9,
      transparent: true,
      opacity: 0.075,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const filaments = new THREE.LineSegments(
      filamentGeometry,
      filamentMaterial,
    );
    world.add(filaments);
    const ringMaterials: THREE.LineBasicMaterial[] = [];
    const rings: THREE.LineLoop[] = [];
    for (let j = 0; j < 7; j++) {
      const ringPoints = [];
      const radius = j === 0 ? 1.02 : 2.7 + j * 0.12;
      for (let k = 0; k < 256; k++) {
        const a = (k / 256) * TAU;
        ringPoints.push(
          new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0),
        );
      }
      const lineMaterial = new THREE.LineBasicMaterial({
        color: j === 0 ? 0xd9e9d2 : 0x59947c,
        transparent: true,
        opacity: j === 0 ? 0.7 : 0.1,
        depthWrite: false,
      });
      const ring = new THREE.LineLoop(
        new THREE.BufferGeometry().setFromPoints(ringPoints),
        lineMaterial,
      );
      ring.rotation.x = j === 0 ? 0.15 : 0.72 + j * 0.12;
      ring.rotation.y = j === 0 ? 0 : -0.25 + j * 0.1;
      world.add(ring);
      rings.push(ring);
      ringMaterials.push(lineMaterial);
    }
    // Quiet stars occupy the full viewport, independent of the central scene.
    const starPositions = new Float32Array(850 * 3);
    for (let i = 0; i < 850; i++)
      starPositions.set(
        [(random() - 0.5) * 30, (random() - 0.5) * 18, -3 - random() * 12],
        i * 3,
      );
    const starGeometry = new THREE.BufferGeometry();
    starGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(starPositions, 3),
    );
    const starMaterial = new THREE.PointsMaterial({
      color: 0x92b1a1,
      size: 0.015,
      transparent: true,
      opacity: 0.46,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeometry, starMaterial);
    scene.add(stars);
    const pointer = new THREE.Vector2();
    let width = 0,
      height = 0;
    const resize = () => {
      width = host.clientWidth;
      height = host.clientHeight;
      renderer.setSize(width, height);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      const small = width < 760;
      const worldWidth =
        2 * Math.tan(THREE.MathUtils.degToRad(21)) * 10 * camera.aspect;
      world.position.set(
        small ? 0 : worldWidth * 0.225,
        small ? -0.8 : 0.05,
        0,
      );
      world.scale.setScalar(small ? Math.min(worldWidth / 7.7, 0.78) : 1.02);
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    resize();
    const mouse = (event: PointerEvent) =>
      pointer.set(
        (event.clientX / width - 0.5) * 2,
        -(event.clientY / height - 0.5) * 2,
      );
    window.addEventListener("pointermove", mouse, { passive: true });
    let raf = 0,
      elapsed = 0,
      last = 0,
      progress = 0,
      visible = true,
      lost = false;
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
      },
      { rootMargin: "100px" },
    );
    observer.observe(host);
    const onLost = (event: Event) => {
      event.preventDefault();
      lost = true;
      onReady(false);
    };
    renderer.domElement.addEventListener("webglcontextlost", onLost);
    const render = (now: number) => {
      raf = requestAnimationFrame(render);
      const dt = Math.min((now - last) / 1000 || 0, 0.05);
      last = now;
      if (!visible || document.hidden || lost) return;
      if (!pausedRef.current && !reducedMotion.matches) elapsed += dt;
      const story = document.getElementById("journey");
      const top = story?.getBoundingClientRect().top ?? 0;
      const target = clamp(
        -top / ((story?.offsetHeight ?? window.innerHeight * 4) / 4),
        0,
        3,
      );
      progress +=
        (target - progress) * (reducedMotion.matches ? 1 : Math.min(1, dt * 6));
      material.uniforms.uProgress.value = progress;
      material.uniforms.uTime.value = elapsed;
      material.uniforms.uPointer.value.lerp(
        pausedRef.current || reducedMotion.matches
          ? new THREE.Vector2()
          : pointer,
        0.03,
      );
      coreMaterial.uniforms.uTime.value = elapsed;
      coreMaterial.uniforms.uOpacity.value = 1 - clamp(progress * 1.7);
      core.visible = progress < 0.6;
      filaments.visible = progress < 0.95;
      filamentMaterial.opacity = 0.075 * (1 - clamp(progress * 1.2));
      filaments.rotation.y = elapsed * 0.025;
      rings.forEach((ring, i) => {
        ringMaterials[i].opacity =
          (i === 0 ? 0.65 : 0.12) * (1 - clamp(progress));
        ring.visible = progress < 1;
        if (i > 0) ring.rotation.z = elapsed * 0.018 * (i % 2 ? 1 : -1);
      });
      stars.rotation.z = elapsed * 0.0015;
      renderer.render(scene, camera);
    };
    raf = requestAnimationFrame(render);
    onReady(true);
    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      observer.disconnect();
      window.removeEventListener("pointermove", mouse);
      renderer.domElement.removeEventListener("webglcontextlost", onLost);
      scene.traverse((object) => {
        if (
          object instanceof THREE.Mesh ||
          object instanceof THREE.Points ||
          object instanceof THREE.Line
        ) {
          object.geometry.dispose();
          const materials = Array.isArray(object.material)
            ? object.material
            : [object.material];
          materials.forEach((m) => m.dispose());
        }
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [onReady]);

  return <div ref={hostRef} className="orbit-canvas" aria-hidden="true" />;
}
