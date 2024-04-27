<script lang="ts">
    export let lineCount: number;
  </script>
  
  <style lang="scss">
    .line-numbers {
        flex-shrink: 0;
        width: 50px;
        background: var(--line-number-bg-color);
        padding-top: 5px;
        padding-right: 10px;
        text-align: right;
        user-select: none;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        -o-user-select: none;
        min-height: fit-content;
        padding-bottom: 93vh;
        z-index: 99;

        >* {
            min-height: 20px;
        }
    }
  </style>
  
  <div class="line-numbers">
    {#each Array(lineCount).fill(0) as _, index}
      <div>{index + 1}</div>
    {/each}
  </div>