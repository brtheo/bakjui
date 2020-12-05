var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, html, css, property, LitElement } from 'lit-element';
let BkjRadio = class BkjRadio extends LitElement {
    constructor() {
        super(...arguments);
        this.checked = false;
    }
    connectedCallback() {
        super.connectedCallback();
        this.setAttribute('role', 'radio');
        this.addEventListener('click', () => {
            this.dispatchEvent(new CustomEvent('bkjRadio:clicked', { bubbles: true, composed: true }));
        });
    }
    updated() {
        this.checked
            ? this.setAttribute('aria-checked', 'true')
            : this.setAttribute('aria-checked', 'false');
    }
    static get styles() {
        return css `
      :host {
        --markerSize: 12px;
        --radioBg: var(--radiosBg);
        padding: 7px;
        display: flex;
        place-content:space-between;
        cursor: pointer;
        background-color: var(--radioBg);
        transition: filter .2s ease-out;      
      }
      :host(:hover) {
        filter: brightness(120%);
      }
      :host(:hover) i::before {
        transform: scale(.5);
        filter: opacity(.5);
      }
      :host  > * {
        display: flex;
        align-self: center;
        color: teal;
        font-family: 'Arial Rounded MT';
      }
      i {
        width: var(--markerSize);
        height: var(--markerSize);
        border: solid 2px teal;
        border-radius: 50%;
        box-sizing: border-box;
        position: relative;
        place-content: center;
        margin: 0 4.5px;
      }
      i::before {
        content: '';
        display: flex;
        align-self: center;
        width: calc(var(--markerSize) / 2 );
        height: calc(var(--markerSize) / 2 );
        border-radius: 50%;
        background-color: teal;
        transform: scale(0);
        transition: transform .2s ease-out, filter .2s ease-out;
      }
      :host([aria-checked="true"]) i::before {
        transform: scale(1)
      }
      :host([aria-checked="true"]:hover) i::before {
        filter: opacity(1)
      }
    `;
    }
    render() {
        return html `
      <span>
        <slot></slot>
      </span>
      <i></i>
      
    `;
    }
};
__decorate([
    property({ type: Boolean, reflect: true })
], BkjRadio.prototype, "checked", void 0);
__decorate([
    property({ type: String })
], BkjRadio.prototype, "value", void 0);
BkjRadio = __decorate([
    customElement('bkj-radio')
], BkjRadio);
export { BkjRadio };
