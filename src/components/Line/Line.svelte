<script lang="ts">
    export let lineContent: string;
    export let lineNumber: number;
    export let registerLineRef: (lineNumber: number, element: HTMLDivElement) => void;
  
    let lineElement: HTMLDivElement;
  
    $: if (lineElement) {
      registerLineRef(lineNumber, lineElement);
    }
  </script>
  
  <div bind:this={lineElement} data-line-number={lineNumber}>
    {lineContent === "" ? "\n" : lineContent}
  </div>