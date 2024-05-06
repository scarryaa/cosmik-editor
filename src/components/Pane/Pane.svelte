<script lang="ts">
import { dragContext } from "../../stores/dragContext";
import { moveTabToPane, tabs } from "../../stores/tabs";
import "./Pane.scss";

let paneId = "uniquePaneId";

function onDragOver(event: DragEvent) {
	event.preventDefault();
	console.log(event.dataTransfer);
	if (event.dataTransfer) event.dataTransfer.dropEffect = "move";
}

function onDrop(event: DragEvent) {
	event.preventDefault();

	dragContext.update(({ draggingTab, originPaneId }) => {
		if (draggingTab && originPaneId !== paneId) {
			moveTabToPane(draggingTab.id, paneId);
		}
		return { draggingTab: null, originPaneId: null };
	});
}
</script>
  
<div class="pane" on:dragover={onDragOver} on:drop={onDrop}>
    <slot />
</div>