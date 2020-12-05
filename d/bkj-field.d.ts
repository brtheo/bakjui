import { LitElement } from "lit-element";
export declare class BkjField extends LitElement {
    type: 'text' | 'password' | 'email';
    label: string;
    $input: HTMLInputElement;
    connectedCallback(): void;
    firstUpdated(): void;
    get value(): string;
    static get styles(): import("lit-element").CSSResult;
    render(): import("lit-element").TemplateResult;
}
