import { LitElement } from "lit-element";
export declare class BkjButton extends LitElement {
    round: boolean;
    icon: 'before' | 'after';
    flat: false;
    disabled: false;
    $button: HTMLElement;
    connectedCallback(): void;
    firstUpdated(): void;
    static get styles(): import("lit-element").CSSResult;
    render(): import("lit-element").TemplateResult;
}
