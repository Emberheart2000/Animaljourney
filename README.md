# Animaljourney

Animaljourney ist ein interaktives Tierquiz in einer dreidimensionalen Umgebung. Die Spieler können verschiedene Tiermodelle entdecken und Quartettkarten sammeln.

## Installation

Führe die folgenden Befehle aus, um das Projekt lokal zu installieren und zu starten:

```sh
npm i three svelte threlte
npm run dev
```

## Features

- Interaktive 3D-Umgebung
- Realistische Tiermodelle
- Quartettkarten zum Sammeln

## Technologien

Dieses Projekt nutzt folgende Technologien:

- [Three.js](https://threejs.org/)
- [Svelte](https://svelte.dev/)
- [Threlte](https://threlte.xyz/)

## Beispielcode

```javascript
import { Scene, WebGLRenderer, PerspectiveCamera } from 'three';

const scene = new Scene();
const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

animate();
```

## Lizenz

Dieses Projekt ist nicht Open Source.

