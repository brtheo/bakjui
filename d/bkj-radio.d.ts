import { LitElement } from 'lit-element';
export declare class BkjRadio extends LitElement {
    checked: boolean;
    value: string;
    connectedCallback(): void;
    updated(): void;
    static get styles(): import("lit-element").CSSResult;
    render(): import("lit-element").TemplateResult;
}
