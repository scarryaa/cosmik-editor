<script lang="ts">
import { onMount } from "svelte";
import AstroWrapper from "./components/AstroWrapper/AstroWrapper.svelte";
import { app } from "./stores/elements";

onMount(() => {
	// biome-ignore lint/style/noNonNullAssertion: It is loaded by now
	app.set(document.querySelector("#app")!);
});
</script>

<AstroWrapper />