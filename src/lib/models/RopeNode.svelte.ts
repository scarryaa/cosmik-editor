export class RopeNode {
    left: RopeNode | null = $state(null);
    right: RopeNode | null = $state(null);
    weight: number = $state(0);
    text: string | null = $state(null);

    constructor(text?: string) {
        this.text = text || null;
        this.weight = text?.length || 0;
    }
}