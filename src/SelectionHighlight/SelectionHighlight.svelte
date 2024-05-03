<script>
    import { measureTextWidth } from "../util/text";
    import "./SelectionHighlight.scss";

    export let selectedText = '';
    export let offsetLeft = 0;
</script>

<span style={`--selection-left: ${measureTextWidth("a") + offsetLeft}px`} class="highlight">{selectedText}</span>