export declare class BkjIcon extends HTMLElement {
    static get observedAttributes(): string[];
    constructor();
    get size(): string;
    get provider(): string;
    attributeChangedCallback(name: any, old: any, iconName: any): Promise<void>;
    render(fragment: any): void;
}
