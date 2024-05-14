<script>
import { Editor } from "../../models/Editor.svelte"
import AstroEditor from "../AstroEditor/AstroEditor.svelte";
import AstroPresenter from "../AstroPresenter/AstroPresenter.svelte";
import StatusPane from "../StatusPane/StatusPane.svelte";

const editor = $state(new Editor(""));
let shouldFocus = $state(false);
const isMultiCursor = $derived(editor.cursors.length > 1);
const cursorCount = $derived(editor.cursors.length);

const handleClick = () => {
	shouldFocus = true;
	setTimeout(() => {
		shouldFocus = false;
	});
};
</script>

<div class="meteor-composite">
    <AstroEditor {shouldFocus} {editor} />
    <AstroPresenter {handleClick} {editor} />
    <StatusPane {cursorCount} {isMultiCursor} currentCharacter={editor.cursors[0].column} currentLine={editor.cursors[0].line} selectionLength={0}/>
</div>

<style lang="scss">
    .meteor-composite {
        display: flex;
        flex-direction: row;
        height: 100%;
        width: 100%;
        overflow: hidden;
    }
</style>
