<script>
import AstroEditor from "../AstroEditor/AstroEditor.svelte";
</script>

<style lang="scss">
    #astro-wrapper {
        display: flex;
        height: calc(100vh - var(--status-pane-height));
    }
</style>

<div id="astro-wrapper">
    <AstroEditor />
</div>