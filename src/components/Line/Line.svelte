<script lang="ts">
    export let lineContent: string;
    export let lineNumber: number;
    export let registerLineRef: (lineNumber: number, element: HTMLElement) => void;
  
    let lineElement: HTMLElement;
  
    $: if (lineElement) {
      registerLineRef(lineNumber, lineElement);
    }
  </script>
  
  <div bind:this={lineElement} data-line-number={lineNumber}>
    {lineContent === "" ? "\n" : lineContent}
  </div>