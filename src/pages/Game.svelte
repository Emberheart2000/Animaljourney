<script>
	import { Canvas, T, extend } from "@threlte/core";
	import Scene from "../lib/game/Scene.svelte";
	import PLC from "../lib/game/PLC.svelte";
	import { PointerLockControls } from "three/examples/jsm/Addons.js";
	import { showOverlay } from "../lib/game/store";
	import { fly } from "svelte/transition";
	import { quintInOut } from "svelte/easing";
	import { onMount } from "svelte";

	let plc;
	let currentHintIndex = -1;
	let billboarding = true;
	let fps = 10;
	const STEP = 0.33333;
	let hints = [
    "Hint 1: This animal is known for its ability to survive in harsh environments.",
    "Hint 2: It is primarily nocturnal and prefers to hunt at night.",
    "Hint 3: It has a segmented body and multiple pairs of legs.",
    "Hint 4: It possesses pincers and a venomous sting.",
    "Hint 5: It is often found in deserts and has a distinctive curved tail."
  ];

	extend({ PointerLockControls });

	/**
	 * @type {[number, number, number]}
	 */
	let position = $state([0, 1, 5]);
	/**
	 * @type {[number, number, number]}
	 */
	let rotation = $state([0, 0, 0]);

	function handleKeyDown(event) {
		switch (event.key) {
			case "w":
				plc.moveForward(STEP);
				break;
			case "s":
				plc.moveForward(-STEP);
				break;
			case "a":
				plc.moveRight(-STEP);
				break;
			case "d":
				plc.moveRight(STEP);
				break;
		}
	}

	function handleClick() {
		$showOverlay = false;
		plc.lock();
	}
	function collectScorpionCard() {
		$showOverlay = false;
		window.location.href = '/#/cards';
	}

	function nextHint() {
    currentHintIndex = (currentHintIndex + 1) % hints.length;
	document.querySelector('.hint').innerHTML = `
		<p>${hints[currentHintIndex]}</p>
	`;
	console.log("next Hint requested");
  }

function prevHint() {
	currentHintIndex = (currentHintIndex - 1 + hints.length) % hints.length;
	document.querySelector('.hint').innerHTML = `
		<p>${hints[currentHintIndex]}</p>
	`;
	console.log("previous Hint requested");
}

	onMount(() => {
		handleClick();
		nextHint();
		$showOverlay = true;
	});
</script>

<svelte:body on:keydown={handleKeyDown} />

<div class="container">
	<Canvas>
		<T.PerspectiveCamera
			makeDefault
			fov={75}
			near={0.1}
			far={1000}
			{position}
			{rotation}
		>
			<!-- <OrbitControls /> -->
			<PLC bind:this={plc} />
		</T.PerspectiveCamera>

		<Scene {plc} {billboarding} {fps} />
	</Canvas>
	<!-- <Settings bind:billboarding bind:fps /> -->
</div>

{#if $showOverlay}
	<div
		id="overlay"
		transition:fly={{ y: 50, easing: quintInOut, opacity: 0 }}
	>
		<button class="button close" onclick={handleClick}>X</button>
		<h1>This was the right animal!</h1>
		<button class="button collect" onclick={collectScorpionCard}>Collect Scorpion Card</button>
	</div>
{/if}

<div class="hint-box">
	<p class="hint"></p>
	<button class="button prev-hint" onclick={prevHint}>Previous Hint</button>
	<button class="button next-hint" onclick={nextHint}>Next Hint</button>
  </div>

<style>
	.container {
		position: fixed;
		inset: 0;
		height: 100%;
		width: 100%;
	}

	#overlay {
		position: fixed;
		background-color: rgba(0, 0, 0, 0.5);
		backdrop-filter: blur(5px);
		border: 1px solid rgba(255, 255, 255, 0.5);
		width: calc(100% - 1rem);
		max-width: 560px;
		left: 50%;
		bottom: 0.5rem;
		transform: translateX(-50%);
		height: 240px;
		margin: 5rem;
		text-align: center;
	}
	h1{
		font-size: 10rem;
		margin: 0;
		padding: 4rem;
		color: white;
		position: absolute;
		top: 30%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.collect{
		position: absolute;
		bottom: 4rem;
		left: 50%;
		transform: translateX(-50%);
	}
	.close {
		position: absolute;
		top: 0;
		right: 0;
	}
	.hint-box {
    position: fixed;
    top: 1rem;
    right: 1rem;
    background-color: rgba(0, 0, 0, 0.7);
    color: white;
    padding: 1rem;
    border-radius: 0.5rem;
    width: 300px;
    text-align: center;
	border-radius: 4rem;
  }

  .hint-box p {
    margin: 0;
    padding: 0.5rem 0;
  }

  .button.next-hint, .button.prev-hint {
    margin-top: 0.5rem;
    background-color: #333;
    color: #fff;
    border: none;
    padding: 0.5rem 1rem;
    cursor: pointer;
    border-radius: 0.5rem;
  }

  .button.next-hint:hover, .button.prev-hint:hover {
    background-color: #555;
  }

  .button{
	padding-top: 4rem;
	color: white
  }
</style>
