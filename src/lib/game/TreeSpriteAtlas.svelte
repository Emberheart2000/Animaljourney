<!--
	-	Example of using animations as a static sprite atlas
	- each frame is named and used as a different tree randomly
	- to achieve this playmode is "PAUSE" and autoUpdate={false}
	- the instanced sprite has to be updated once when initialized
		and then, each time the atlas changes
	- uses <Instance/> component instead of hook to set positions and frames
 -->

<script>
	import { InstancedSprite, buildSpritesheet } from "@threlte/extras";
	import { AdaptedPoissonDiscSample as Sampler } from "./util";
	import { log } from "three/src/nodes/TSL.js";

	const treeAtlasMeta = [
		{
			url: "/textures/sprites/desert-pixelart.png",
			type: "rowColumn",
			width: 5,
			height: 1,
			animations: [
				{ name: "stone", frameRange: [0, 0] },
				{ name: "termites", frameRange: [1, 1] },
				{ name: "tree", frameRange: [2, 2] },
				{ name: "bush", frameRange: [3, 3] },
				{ name: "cactus", frameRange: [4, 4] },
			],
		},
	];

	const treeAtlas = buildSpritesheet.from(treeAtlasMeta);

	// const treePositions = [];

	// for (let x = 0; x < 15; x++) {
	// 	for (let z = 0; z < 15; z++) {
	// 		treePositions.push([x, 0.5, z]);
	// 	}
	// }

	const REGION_W = 400;
	const REGION_Z = 400;

	const maxRadius = 50;
	const sampler = new Sampler(
		6,
		[REGION_W, REGION_Z],
		undefined,
		Math.random
	);

	const points = sampler.GeneratePoints().filter((v) => {
		return (
			Math.sqrt(
				(v[0] - REGION_W / 2) ** 2 + (v[1] - REGION_Z / 2) ** 2
			) <= maxRadius
		);
	});
	console.log(points.length);

	// Wahrscheinlichkeiten für die einzelnen Objekttypen:
	const PROBABILITIES = [
		0.25, // stone
		0.05, // termites
		0.5, // trees
		0.15, // bush
		0.05, // cactus
	];

	function getRandomIndex(probabilities) {
		let random = Math.random();
		let cumulative = 0;
		for (let i = 0; i < probabilities.length; i++) {
			cumulative += probabilities[i];
			if (random < cumulative) {
				return i;
			}
		}
		return probabilities.length - 1;
	}

	// Gesamtanzahl der Positionen (Punkte)
	const TOTAL_POSITIONS = points.length;
	const INDICES = [];

	// Für jeden Punkt einen Index entsprechend der Multinomialverteilung ziehen
	for (let i = 0; i < TOTAL_POSITIONS; i++) {
		INDICES.push(getRandomIndex(PROBABILITIES));
	}

	let sprite;
	$: {
		// manually update once to apply tree atlas
		// also, flip random trees on X axis for more variety
		if (sprite) {
			for (let i = 0; i < points.length; i++) {
				sprite.flipX.setAt(i, Math.random() > 0.125 ? true : false);
			}
			sprite.update();
		}
	}

	function getSpritesheet(spritesheet) {
		console.log(spritesheet);
		return spritesheet;
	}
</script>

{#await treeAtlas.spritesheet then spritesheet}
	{@const sS = getSpritesheet(spritesheet)}

	<InstancedSprite
		bind:ref={sprite}
		count={points.length}
		autoUpdate={false}
		playmode={"PAUSE"}
		billboarding={true}
		{spritesheet}
		castShadow
	>
		{#snippet children({ Instance })}
			{#each points as [x, z], i}
				<Instance
					position={[x - REGION_W / 2, 1.5, z - REGION_Z / 2]}
					id={i}
					scale={[3, 3]}
					frameId={INDICES[i]}
				/>
			{/each}
		{/snippet}
	</InstancedSprite>
{/await}
