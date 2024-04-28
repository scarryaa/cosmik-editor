<script lang="ts">
    import EditorWrapper from "./components/EditorWrapper.svelte";
    document.querySelector("#app")?.setAttribute("aria-role", "application");
</script>

<EditorWrapper />