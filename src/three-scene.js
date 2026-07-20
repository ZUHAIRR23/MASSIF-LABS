import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function initThreeScene() {
    const container = document.querySelector('#canvas-container');
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = null;

    // Camera settings
    const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // WebGL Renderer with High Precision settings
    const renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: "high-performance",
        precision: "highp"
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap; // soft shadow mapping
    renderer.toneMapping = THREE.ACESFilmicToneMapping; // Photo-realistic tone-mapping
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // 1. PROCEDURAL STUDIO ENVIRONMENT MAP (High realism reflections for mirror chrome)
    const envMapWidth = 256;
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(envMapWidth, {
        generateMipmaps: true,
        minFilter: THREE.LinearMipmapLinearFilter
    });
    const cubeCamera = new THREE.CubeCamera(0.1, 10, cubeRenderTarget);
    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0x1a1917); // Dark ambient studio room

    // Simulate soft overhead neon light boxes
    const panelGeo = new THREE.BoxGeometry(4, 8, 0.2);
    const panelMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    const lightPanel1 = new THREE.Mesh(panelGeo, panelMat);
    lightPanel1.position.set(6, 4, 3);
    lightPanel1.lookAt(0, 0, 0);
    envScene.add(lightPanel1);

    const lightPanel2 = new THREE.Mesh(panelGeo, panelMat);
    lightPanel2.position.set(-6, -3, -5);
    lightPanel2.lookAt(0, 0, 0);
    envScene.add(lightPanel2);

    const lightPanel3 = new THREE.Mesh(new THREE.BoxGeometry(8, 2, 0.2), panelMat);
    lightPanel3.position.set(0, 8, -2);
    lightPanel3.lookAt(0, 0, 0);
    envScene.add(lightPanel3);

    // Render cubemap once to capture environment textures
    cubeCamera.update(renderer, envScene);
    scene.environment = cubeRenderTarget.texture;

    // 2. DETAILED STUDIO LIGHTING LAYOUT
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    // Strong Over-shoulder spotlight for dramatic shadows
    const keyLight = new THREE.SpotLight(0xffffff, 4.5);
    keyLight.position.set(4, 8, 6);
    keyLight.angle = Math.PI / 6;
    keyLight.penumbra = 0.8;
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0008;
    keyLight.shadow.radius = 5.0; // soft shadow blur
    scene.add(keyLight);

    // Cool white Rim light highlighting metal borders
    const rimLight = new THREE.DirectionalLight(0xdbe9ff, 1.5);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // Warmer terracotta filled ambient light
    const terracottaFill = new THREE.DirectionalLight(0xc4583d, 0.8);
    terracottaFill.position.set(-4, -2, 4);
    scene.add(terracottaFill);

    // MAIN OBJECT CONTAINERS
    const chairGroup = new THREE.Group();
    scene.add(chairGroup);

    const cushionGroup = new THREE.Group();
    const frameGroup = new THREE.Group();
    const legsGroup = new THREE.Group();

    chairGroup.add(cushionGroup);
    chairGroup.add(frameGroup);
    chairGroup.add(legsGroup);

    // 3. ENHANCED PROCEDURAL LEATHER GRAIN TEXTURING (High contrast & cellular texture)
    function generateLeatherBumpMap() {
        const canvas = document.createElement('canvas');
        canvas.width = 512;
        canvas.height = 512;
        const ctx = canvas.getContext('2d');

        // Grey background representing base height (128, 128, 128)
        ctx.fillStyle = '#808080';
        ctx.fillRect(0, 0, 512, 512);

        // Draw cellular noise pores
        for (let i = 0; i < 40000; i++) {
            const x = Math.random() * 512;
            const y = Math.random() * 512;
            const size = Math.random() * 1.5 + 0.5;
            const grayVal = 128 + (Math.random() - 0.5) * 45; // high variation
            ctx.fillStyle = `rgb(${grayVal},${grayVal},${grayVal})`;
            ctx.fillRect(x, y, size, size);
        }

        // Draw fine natural skin wrinkles (overlapping Bezier tracks)
        ctx.strokeStyle = 'rgba(100, 100, 100, 0.18)';
        ctx.lineWidth = 0.8;
        for (let i = 0; i < 60; i++) {
            ctx.beginPath();
            ctx.moveTo(Math.random() * 512, Math.random() * 512);
            ctx.bezierCurveTo(
                Math.random() * 512, Math.random() * 512,
                Math.random() * 512, Math.random() * 512,
                Math.random() * 512, Math.random() * 512
            );
            ctx.stroke();
        }

        const tex = new THREE.CanvasTexture(canvas);
        tex.wrapS = THREE.RepeatWrapping;
        tex.wrapT = THREE.RepeatWrapping;
        tex.repeat.set(8, 8); // Tile texture fine mapping
        tex.anisotropy = 4; // sharp filter at steep angles
        return tex;
    }

    // DEFINING ENHANCED MATERIAL SHADERS
    const chromeMaterial = new THREE.MeshStandardMaterial({
        color: 0xeeeeee,
        metalness: 1.0,
        roughness: 0.05, // highly polished finish
        envMapIntensity: 1.2
    });

    const leatherBump = generateLeatherBumpMap();
    const leatherMaterial = new THREE.MeshStandardMaterial({
        color: 0xc4583d, // Terracotta saddle shade
        metalness: 0.05,
        roughness: 0.65,
        bumpMap: leatherBump,
        bumpScale: 0.055, // Increased significantly for visible grain
        roughnessMap: leatherBump, // Micro-roughness matching grain
        clearcoat: 0.15, // subtle protective shine coat
        clearcoatRoughness: 0.5
    });

    const woodMaterial = new THREE.MeshStandardMaterial({
        color: 0x1f1d18, // rich smoked black walnut
        metalness: 0.02,
        roughness: 0.85
    });

    // 4. BUILDING PROCEDURALLY ROUNDED CUSHIONS (Beveled shape extrusions)
    function createRoundedRectShape(w, h, r) {
        const shape = new THREE.Shape();
        const x = -w / 2;
        const y = -h / 2;

        shape.moveTo(x, y + r);
        shape.lineTo(x, y + h - r);
        shape.quadraticCurveTo(x, y + h, x + r, y + h);
        shape.lineTo(x + w - r, y + h);
        shape.quadraticCurveTo(x + w, y + h, x + w, y + h - r);
        shape.lineTo(x + w, y + r);
        shape.quadraticCurveTo(x + w, y, x + w - r, y);
        shape.lineTo(x + r, y);
        shape.quadraticCurveTo(x, y, x, y + r);

        return shape;
    }

    // Rounded Seat Cushion
    const seatShape = createRoundedRectShape(2.4, 2.2, 0.4);
    const seatExtrudeSettings = {
        depth: 0.25,
        bevelEnabled: true,
        bevelSegments: 6,
        steps: 1,
        bevelSize: 0.08,
        bevelThickness: 0.08
    };

    const seatGeo = new THREE.ExtrudeGeometry(seatShape, seatExtrudeSettings);
    seatGeo.rotateX(-Math.PI / 2); // Rotate to layout flat horizontal
    const seatCushion = new THREE.Mesh(seatGeo, leatherMaterial);
    seatCushion.position.set(0, 0.15, 0);
    seatCushion.castShadow = true;
    seatCushion.receiveShadow = true;
    cushionGroup.add(seatCushion);

    // Rounded Backrest Cushion
    const backShape = createRoundedRectShape(2.4, 1.4, 0.3);
    const backExtrudeSettings = {
        depth: 0.20,
        bevelEnabled: true,
        bevelSegments: 6,
        steps: 1,
        bevelSize: 0.06,
        bevelThickness: 0.06
    };
    const backGeo = new THREE.ExtrudeGeometry(backShape, backExtrudeSettings);
    const backCushion = new THREE.Mesh(backGeo, leatherMaterial);
    backCushion.position.set(0, 1.25, -0.85);
    backCushion.rotation.x = -Math.PI / 12; // tilt backrest cushion
    backCushion.castShadow = true;
    backCushion.receiveShadow = true;
    cushionGroup.add(backCushion);

    // 5. CHROMED TUBULAR FRAME (Detail collars and caps)
    const tubeRadius = 0.075;
    const radialSegments = 24;

    const buildDetailTube = (h, x, y, z, rx, ry, rz) => {
        const geo = new THREE.CylinderGeometry(tubeRadius, tubeRadius, h, radialSegments);
        const mesh = new THREE.Mesh(geo, chromeMaterial);
        mesh.position.set(x, y, z);
        mesh.rotation.set(rx, ry, rz);
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        frameGroup.add(mesh);

        // End caps for tubes
        const capGeo = new THREE.SphereGeometry(tubeRadius, radialSegments, 12, 0, Math.PI * 2, 0, Math.PI / 2);
        const capTop = new THREE.Mesh(capGeo, chromeMaterial);
        capTop.position.set(0, h / 2, 0);
        mesh.add(capTop);

        return mesh;
    };

    // Construct frame tubes
    // Left Arm structure loops
    buildDetailTube(1.4, -1.2, -0.65, 0.9, 0, 0, 0); // FL leg vertical
    buildDetailTube(1.2, -1.2, -0.75, -0.9, 0, 0, 0); // RL leg vertical
    buildDetailTube(1.8, -1.2, -0.05, 0, Math.PI / 2, Math.PI / 2); // left long rails connecting front-back
    buildDetailTube(0.8, -1.2, 0.55, 0.45, Math.PI / 2, 0, 0); // armrest left horizontal

    // Right Arm structure loops
    buildDetailTube(1.4, 1.2, -0.65, 0.9, 0, 0, 0); // FR leg vertical
    buildDetailTube(1.2, 1.2, -0.75, -0.9, 0, 0, 0); // RR leg vertical
    buildDetailTube(1.8, 1.2, -0.05, 0, Math.PI / 2, Math.PI / 2); // right long rails connecting front-back
    buildDetailTube(0.8, 1.2, 0.55, 0.45, Math.PI / 2, 0, 0); // armrest right horizontal

    // Horizontal Cross stabilizing connectors (with joint rings)
    const buildCrossConnector = (len, x, y, z, rx, ry, rz) => {
        const mesh = buildDetailTube(len, x, y, z, rx, ry, rz);
        const ringGeo = new THREE.TorusGeometry(tubeRadius + 0.005, 0.015, 12, 24);

        const ring1 = new THREE.Mesh(ringGeo, chromeMaterial);
        ring1.position.set(0, -len / 2 + 0.1, 0);
        ring1.rotation.x = Math.PI / 2;
        mesh.add(ring1);

        const ring2 = new THREE.Mesh(ringGeo, chromeMaterial);
        ring2.position.set(0, len / 2 - 0.1, 0);
        ring2.rotation.x = Math.PI / 2;
        mesh.add(ring2);
    };

    buildCrossConnector(2.4, 0, -0.05, 0.9, 0, 0, Math.PI / 2); // front top cross bar
    buildCrossConnector(2.4, 0, -0.05, -0.9, 0, 0, Math.PI / 2); // rear top cross bar
    buildCrossConnector(2.4, 0, -1.3, 0.0, 0, 0, Math.PI / 2); // bottom floor base cross bar
    buildCrossConnector(2.4, 0, 1.85, -0.85, 0, 0, Math.PI / 2); // top back support cross bar

    // 6. DETAILED WOOD ANCHORS (Stable blocks linking bases)
    const woodenBlockGeo = new THREE.BoxGeometry(0.32, 0.28, 0.42);

    const createWoodLink = (x, y, z) => {
        const mesh = new THREE.Mesh(woodenBlockGeo, woodMaterial);
        mesh.position.set(x, y, z);
        mesh.castShadow = true;
        legsGroup.add(mesh);
        return mesh;
    };

    const blockFL = createWoodLink(-1.2, -1.40, 0.9);
    const blockFR = createWoodLink(1.2, -1.40, 0.9);
    const blockRL = createWoodLink(-1.2, -1.40, -0.9);
    const blockRR = createWoodLink(1.2, -1.40, -0.9);

    // Position chair offset correctly
    chairGroup.position.set(0, -0.1, 0);

    // 7. CATCHER SHADOW FLOOR PLANE (Realistic grounding)
    const shadowPlaneGeo = new THREE.PlaneGeometry(20, 20);
    const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.24 }); // subtle grounding floor shadow
    const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -1.55;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // Camera dynamic viewport framing mouse-interactivity coordinates
    let mouseX = 0;
    let mouseY = 0;

    window.addEventListener('mousemove', (e) => {
        mouseX = (e.clientX / window.innerWidth) - 0.5;
        mouseY = (e.clientY / window.innerHeight) - 0.5;
    });

    // SCROLL DECONSTRUCTION GSAP ENGINE TIMELINE
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: ".section-product-experience",
            start: "top top",
            end: "bottom bottom",
            scrub: 0.8,
            onUpdate: (self) => {
                const progress = self.progress;

                // FADE OUT COORDINATE OVERLAY ON SCROLL PAST SHOWCASE
                const overlay = document.querySelector('.blueprint-tech-overlay');
                if (overlay) {
                    if (progress > 0.02 && progress < 0.95) {
                        overlay.style.opacity = '1';
                        overlay.style.pointerEvents = 'auto';
                    } else {
                        overlay.style.opacity = '0';
                        overlay.style.pointerEvents = 'none';
                    }
                }

                const labels = ['#spec-cushion', '#spec-frame', '#spec-legs'];
                labels.forEach(selector => {
                    const el = document.querySelector(selector);
                    if (el) {
                        if (progress > 0.16 && progress < 0.88) {
                            el.classList.add('active');
                        } else {
                            el.classList.remove('active');
                        }
                    }
                });
            }
        }
    });

    // Bind smooth timelines
    tl.to(chairGroup.rotation, { y: Math.PI * 2, ease: "none" }, 0);
    tl.to(cushionGroup.position, { y: 2.1, ease: "power2.inOut" }, 0);
    tl.to(legsGroup.position, { y: -1.7, ease: "power2.inOut" }, 0);
    tl.to(frameGroup.position, { z: 1.0, x: 0.25, ease: "power2.inOut" }, 0);

    // Rendering & projection update loop
    const tempV = new THREE.Vector3();

    function animate() {
        requestAnimationFrame(animate);

        // Apply interactive hover float drifts when scroll trigger is idle
        if (ScrollTrigger.getAll().length > 0) {
            const isPinned = ScrollTrigger.getAll()[0].isActive;
            if (!isDraggingActive() && !isPinned) {
                chairGroup.rotation.y += (mouseX * 0.45 - chairGroup.rotation.y) * 0.05;
                chairGroup.rotation.x += (mouseY * 0.25 - chairGroup.rotation.x) * 0.05;
            }
        }

        // Keep specifications labels coordinates tracked with the respective sub-meshes
        if (cushionGroup && frameGroup && legsGroup) {
            updateLabelCoordinates('#spec-cushion', seatCushion);
            updateLabelCoordinates('#spec-frame', frameGroup);
            updateLabelCoordinates('#spec-legs', blockFL);
        }

        renderer.render(scene, camera);
    }

    function updateLabelCoordinates(elSelector, targetMesh) {
        const el = document.querySelector(elSelector);
        if (!el || !el.classList.contains('active')) return;

        targetMesh.getWorldPosition(tempV);
        tempV.project(camera);

        const x = (tempV.x * 0.5 + 0.5) * container.clientWidth;
        const y = (tempV.y * -0.5 + 0.5) * container.clientHeight;

        // Position labels offset from mesh positions smoothly with widened offsets
        if (elSelector === '#spec-cushion') {
            el.style.left = `${x - 290}px`; // Shifted left to prevent overlap
            el.style.top = `${y - 130}px`;  // Shifted up
        } else if (elSelector === '#spec-frame') {
            el.style.left = `${x + 130}px`; // Shifted right to prevent overlap
            el.style.top = `${y - 45}px`;
        } else if (elSelector === '#spec-legs') {
            el.style.left = `${x - 270}px`; // Shifted left
            el.style.top = `${y + 80}px`;   // Shifted down
        }
    }

    function isDraggingActive() {
        return document.querySelector('.custom-cursor').classList.contains('drag');
    }

    animate();

    // Resize handler
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}
