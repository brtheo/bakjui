var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, LitElement, property, html, css, query } from "lit-element";
let BkjButton = class BkjButton extends LitElement {
    constructor() {
        super(...arguments);
        this.round = false;
    }
    connectedCallback() {
        super.connectedCallback();
        this.setAttribute('role', 'button');
        this.setAttribute('tabindex', '0');
        if (this.disabled) {
            this.addEventListener('click', e => {
                e.preventDefault();
                e.stopImmediatePropagation();
            });
        }
    }
    firstUpdated() {
        if (this.round)
            this.$button.classList.add('round');
        if (this.flat)
            this.$button.classList.add('flat');
        if (this.icon === "before")
            this.$button.classList.add('reverse');
        if (this.disabled)
            this.$button.classList.add('disabled');
    }
    static get styles() {
        return css `
      :host {
        display: flex;
        width: max-content;
        height: max-content;
      }
      :host(:focus) {
        outline: none;
       /* outline: 1px solid var(--buttonFocusOutline, #6dffda2f); */
      }
      #button {
        place-content: center;
        align-items: center;
        border: 0px;
        outline: unset;
        cursor: pointer;
        font-weight: 500;
        text-transform: capitalize;
        letter-spacing: .02rem;
        color: var(--buttonFC, teal);
        font-family: var(--regularFont, "Arial Rounded MT");
        background-color: var(--buttonBC, #fafafa);
        width: var(--buttonW, max-content);
        height: var(--buttonH, max-content);
        box-sizing: border-box;
        border-radius: var(--buttonRadius, 10px);
        display: flex;
        padding: var(--buttonPadding, 7px 10px);
        /* border: solid 1px var(--buttonFocusOutline, #6dffda2f); */
        transition: filter .2s;
        font-size: var(--buttonFS, 1rem)
      }
      #button:hover {
        filter: contrast(150%) drop-shadow(0 0 2px var(--buttonFC, teal))
      }
      #button.reverse {flex-direction: row-reverse}
      #button.round {padding: 10px; border-radius: 50%}
      #button.flat {background-color: transparent; transition: background-color .2s, color .2s}
      #button.flat:hover {
        filter: contrast(150%);
        background-color: var(--buttonHoverBG, teal);
        color: var(--buttonHoverFC, #fafafa)
      }
      #button.flat:hover slot[name="icon"] {
        fill: var(--buttonHoverIC, #fafafa)
      }
      #button.disabled {
        cursor: not-allowed;
        filter: grayscale(1) invert(.2);
      }
      #button:not(.round) > slot[name="icon"]::slotted(*) {
        margin: 0 0 0 5px;
      }
      #button.reverse:not(.round) > slot[name="icon"]::slotted(*) {
        margin: 0 5px 0 0;
      }
      slot[name="icon"] {
        fill: var(--buttonIC, cadetblue);
        transition: fill .2s;
      }
    `;
    }
    render() {
        return html `
      <section id="button">
        <slot></slot>
        <slot name="icon"></slot>
      </section>
    `;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], BkjButton.prototype, "round", void 0);
__decorate([
    property({ type: String, reflect: true })
], BkjButton.prototype, "icon", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], BkjButton.prototype, "flat", void 0);
__decorate([
    property({ type: Boolean, reflect: true })
], BkjButton.prototype, "disabled", void 0);
__decorate([
    query('#button')
], BkjButton.prototype, "$button", void 0);
BkjButton = __decorate([
    customElement('bkj-button')
], BkjButton);
export { BkjButton };
