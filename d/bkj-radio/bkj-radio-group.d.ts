import { LitElement } from 'lit-element';
import { BkjRadio } from './bkj-radio';
export declare class BkjRadioGroup extends LitElement {
    _radios: NodeListOf<BkjRadio>;
    connectedCallback(): void;
    get $radios(): BkjRadio[];
    firstUpdated(): void;
    static get styles(): import("lit-element").CSSResult;
    render(): import("lit-element").TemplateResult;
}
