        // Basic setup
        const container = document.getElementById('container');
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Add controls
        const controls = new THREE.OrbitControls(camera, renderer.domElement);
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.minPolarAngle = Math.PI / 2; // Lock vertical rotation
        controls.maxPolarAngle = Math.PI / 2; // Lock vertical rotation

        // Add a sphere to map the 360 image onto
        const geometry = new THREE.SphereGeometry(500, 60, 40);
        geometry.scale(-1, 1, 1);

        let sphere; // Declare sphere outside of the loader function

        // Load your 360 image
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load('assets/images/tomas-cocacola-CSho4ziiwLo-unsplash.jpg', function (texture) {
            const material = new THREE.MeshBasicMaterial({ map: texture });
            sphere = new THREE.Mesh(geometry, material);
            scene.add(sphere);
        });

        camera.position.set(0, 0, 0.1);

        function animate() {
            requestAnimationFrame(animate);
            if (sphere) {
                sphere.rotation.y += 0.003; // Adjust this value to control the rotation speed
            }
            controls.update();
            renderer.render(scene, camera);
        }

        animate();