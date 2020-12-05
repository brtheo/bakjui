import { LitElement } from 'lit-element';
declare class MenuHistory extends Array {
    constructor(...args: any[]);
    get pathBackward(): Array<string>;
    reset(): void;
}
export declare class BkjMenu extends LitElement {
    path: string;
    $root: NodeListOf<HTMLUListElement>;
    $parts: NodeListOf<HTMLUListElement>;
    $nav: HTMLElement;
    $_root: HTMLElement;
    $_parts: HTMLElement;
    history: MenuHistory;
    menuViews: Map<string, HTMLUListElement>;
    constructor();
    /**
     * Definition of the  DOM elements needed for all the manipulations.
     * Merging of all the UL in one Map object.
     * Hides all the necessary elements to be hidden
     */
    firstUpdated(): void;
    private handleToggle;
    /**
     * Render loop, re-update the menu when the sole attribute "path", changed.
     */
    /**
     * Get the menu partial to be displayed from the map object holding all the views
     * @param part Name of the menu partial to diplay at the moment
     */
    private updateMenu;
    /**
     * Create a global style tag in head holding animations related code
     */
    private createOuterStyle;
    static get styles(): import("lit-element").CSSResult;
    get outerStyles(): string;
    render(): import("lit-element").TemplateResult;
}
export {};
