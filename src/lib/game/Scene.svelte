<script>
	// @ts-nocheck

	import { T, useThrelte } from "@threlte/core";
	import { Sky, useTexture } from "@threlte/extras";
	import {
		BackSide,
		DoubleSide,
		NearestFilter,
		RepeatWrapping,
		SRGBColorSpace,
	} from "three";
	import { DEG2RAD } from "three/src/math/MathUtils.js";
	import TreeSpriteAtlas from "./TreeSpriteAtlas.svelte";
	import DudeSprites from "./DudeSprites.svelte";
	import Scorpion from "./Scorpion.svelte";
	import { push, pop, replace } from "svelte-spa-router";
	import { showOverlay } from "./store";

	export let plc;
	export let billboarding = false;
	export let fps;

	const { renderer } = useThrelte();
	renderer.outputColorSpace = SRGBColorSpace;

	let x = Math.random() * 100 - 50;
	let z = Math.random() * 100 - 50;

	const sand = useTexture("/textures/sprites/pixel-sand.png", {
		transform: (texture) => {
			texture.wrapS = texture.wrapT = RepeatWrapping;
			texture.colorSpace = SRGBColorSpace;
			texture.repeat.set(25, 25);
			texture.minFilter = NearestFilter;
			texture.magFilter = NearestFilter;
			texture.needsUpdate = true;
			return texture;
		},
	});

	const sky = useTexture("/textures/sprites/pixel-sky.png", {
		transform: (texture) => {
			texture.wrapS = texture.wrapT = RepeatWrapping;
			texture.colorSpace = SRGBColorSpace;
			texture.repeat.set(10, 2);
			texture.minFilter = NearestFilter;
			texture.magFilter = NearestFilter;
			texture.needsUpdate = true;
			return texture;
		},
	});

	const attr = {
		fallback: null,
		error: null,
		children: null,
		ref: null,
	};

	function handleClick(e) {
		e.stopPropagation();
		if (!$showOverlay) $showOverlay = true;
		plc.unlock();

	}
</script>

<slot />


<!-- <DudeSprites {billboarding} {fps} /> -->
<!-- Multiple trees in a spritesheet, 1 frame each animation - acting as atlas - not animated -->
<TreeSpriteAtlas />
<Scorpion position={[x, 0, z]} {...attr} onclick={handleClick}></Scorpion>

<!-- SCENE SETUP: grass, sky, lights -->

{#if $sky}
	<T.Mesh position.y={-10} scale.y={0.25}>
		<T.SphereGeometry args={[110]} />
		<T.MeshBasicMaterial map={$sky} side={BackSide} />
	</T.Mesh>
{/if}

{#if $sand}
	<T.Mesh rotation.x={-DEG2RAD * 90} receiveShadow>
		<T.CircleGeometry args={[110]} />
		<T.MeshLambertMaterial map={$sand} />
	</T.Mesh>
{/if}

<Sky elevation={13.35} />
<T.AmbientLight intensity={1} />
<T.DirectionalLight
	shadow.mapSize={[2048, 2048]}
	shadow.camera.far={128}
	shadow.camera.near={0.01}
	shadow.camera.left={-20}
	shadow.camera.right={20}
	shadow.camera.top={20}
	shadow.camera.bottom={-20}
	shadow.bias={-0.0001}
	position.x={0}
	position.y={50}
	position.z={30}
	intensity={3}
	castShadow
/>
