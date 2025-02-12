<script>
	import { Checkbox, Pane, Slider, ThemeUtils } from "svelte-tweakpane-ui";

	export let billboarding;
	export let fps;
</script>

<Pane theme={ThemeUtils.presets.light} position="fixed" title="InstancedSprite">
	<Checkbox bind:value={billboarding} label="billboarding" />

	<Slider label="fps" min={1} max={30} step={1} bind:value={fps} />
</Pane>
