<script>
    import Editor from "./Editor.svelte";
    import LineNumbers from "./LineNumbers.svelte";

    let editorContent = "<div data-line-number='1'></div>";

    $: lineNumbers = editorContent.split('</div>').length - 1;
</script>

<style lang="scss">
    #editor-wrapper {
        display: flex;
        overflow: auto;
        height: calc(100vh - var(--status-pane-height));
    }
</style>

<div id="editor-wrapper">
    <LineNumbers lineCount={lineNumbers}/>
    <Editor bind:content={editorContent} />
</div>