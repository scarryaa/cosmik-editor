<script>
import { Editor } from "../../models/Editor.svelte"
import AstroEditor from "../AstroEditor/AstroEditor.svelte";
import AstroPresenter from "../AstroPresenter/AstroPresenter.svelte";
import StatusPane from "../StatusPane/StatusPane.svelte";

const editor = $state(new Editor(""));
let shouldFocus = $state(false);

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
    <StatusPane currentCharacter={editor.cursor.column} currentLine={editor.cursor.line} selectionLength={0}/>
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
