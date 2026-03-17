import * as THREE from 'three';
import { performance } from 'perf_hooks';

const position = new THREE.Vector3(1, 1, 1);

function oldWay() {
    const ring = new THREE.Object3D();
    const dot = new THREE.Object3D();
    const beam = new THREE.Object3D();

    ring.lookAt(position.clone().multiplyScalar(2));
    ring.position.copy(position.clone().multiplyScalar(1.01));

    dot.lookAt(position.clone().multiplyScalar(2));
    dot.position.copy(position.clone().multiplyScalar(1.01));

    beam.lookAt(position.clone().multiplyScalar(2));
    beam.position.copy(position);
}

function newWay() {
    const ring = new THREE.Object3D();
    const dot = new THREE.Object3D();
    const beam = new THREE.Object3D();

    const lookAtPos = position.clone().multiplyScalar(2);
    const surfacePos = position.clone().multiplyScalar(1.01);

    ring.lookAt(lookAtPos);
    ring.position.copy(surfacePos);

    dot.lookAt(lookAtPos);
    dot.position.copy(surfacePos);

    beam.lookAt(lookAtPos);
    beam.position.copy(position);
}

const ITERATIONS = 100000;

const startOld = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    oldWay();
}
const endOld = performance.now();

const startNew = performance.now();
for (let i = 0; i < ITERATIONS; i++) {
    newWay();
}
const endNew = performance.now();

console.log(`Old way: ${endOld - startOld}ms`);
console.log(`New way: ${endNew - startNew}ms`);
