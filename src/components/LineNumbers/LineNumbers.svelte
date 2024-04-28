<script lang="ts">
    import "./LineNumbers.scss";
    
    export let lineCount: number;
  </script>
  
  <div class="line-numbers">
    {#each Array(lineCount).fill(0) as _, index}
      <div>{index + 1}</div>
    {/each}
  </div>