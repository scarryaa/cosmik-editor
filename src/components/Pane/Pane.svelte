<script lang="ts">
import { dragContext } from "../../stores/dragContext";
import { moveTabToPane } from "../../stores/tabs";
import "./Pane.scss";

const { paneId }: { paneId: string } = $props();

function onDragOver(event: DragEvent) {
	event.preventDefault();
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
  
<div role="presentation" class="pane" on:dragover={onDragOver} on:drop={onDrop}>
    <slot />
</div>