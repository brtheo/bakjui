declare class MenuHistory extends Array {
    constructor(...args: any[]);
    get pathBackward(): Array<string>;
    reset(): void;
}
export declare class BkjMenu extends HTMLElement {
    history: MenuHistory;
    menuViews: Map<string, HTMLUListElement>;
    constructor();
    /**
     * Definition of the  DOM elements needed for all the manipulations.
     * Merging of all the UL in one Map object.
     * Hides all the necessary elements to be hidden
     */
    connectedCallback(): void;
    /**
     * Render loop, re-update the menu when the sole attribute "path", changed.
     */
    attributeChangedCallback(name: any, old: any, path: any): void;
    static get observedAttributes(): string[];
    get path(): string;
    set path(v: string);
    /**
     * Get the menu partial to be displayed from the map object holding all the views
     * @param part Name of the menu partial to diplay at the moment
     */
    private updateMenu;
    /**
     * Create a global style tag in head holding animations related code
     */
    private createOuterStyle;
    get styles(): string;
    get outerStyles(): string;
}
export {};
