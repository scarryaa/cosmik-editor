<script>
    export let left = 0;
    export let top = 0;
</script>

<div class="cursor" style="left: {left}px; top: {top}px;"></div>

<style>
    .cursor {
        position: absolute;
        width: 1px;
        height: 19px;
        background-color: black;
        pointer-events: none;
    }
</style>