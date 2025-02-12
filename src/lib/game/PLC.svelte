<script>
	import { T, extend, useThrelte } from "@threlte/core";
	import { onMount } from "svelte";
	import { PointerLockControls } from "three/examples/jsm/Addons.js";

	let plc;
	const { renderer, camera } = useThrelte();

	export function moveForward(distance) {
		plc.moveForward(distance);
	}
	export function moveRight(distance) {
		plc.moveRight(distance);
	}
	export function lock() {
		plc.lock();
	}
	export function unlock() {
		plc.unlock();
	}

	onMount(() => {
		plc = new PointerLockControls($camera, renderer.domElement);
		plc.addEventListener("lock", (e) => {
			console.log("Locked");
		});

		return () => {
			plc.removeEventListener("lock");
			plc.dispose();
		};
	});
	extend({
		PointerLockControls,
	});

	function handleClick() {
		plc.lock();
	}
</script>

<svelte:document on:click={handleClick} />
