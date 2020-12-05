import { LitElement } from "lit-element";
export declare class BkjSwitch extends LitElement {
    pressed: Boolean;
    $switch: HTMLElement;
    connectedCallback(): void;
    firstUpdated(): void;
    static get styles(): import("lit-element").CSSResult;
    render(): import("lit-element").TemplateResult;
}
