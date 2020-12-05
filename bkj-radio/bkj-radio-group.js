var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, html, css, LitElement, queryAssignedNodes } from 'lit-element';
let BkjRadioGroup = class BkjRadioGroup extends LitElement {
    connectedCallback() {
        super.connectedCallback();
        this.setAttribute('role', 'radiogroup');
    }
    get $radios() {
        return Array.from(this._radios).filter((node) => node.nodeType !== 3);
    }
    firstUpdated() {
        if (!this.$radios[0].checked)
            this.$radios[0].checked = true;
        this.$radios.forEach(radio => {
            radio.addEventListener('click', (e) => {
                e.stopImmediatePropagation();
                e.preventDefault();
                const radio = e.currentTarget;
                if (!radio.checked) {
                    this.$radios.find(r => r.checked).checked = false;
                    radio.checked = true;
                    this.dispatchEvent(new CustomEvent('bkjRadio:changed', {
                        detail: {
                            __Event: e,
                            value: radio.value
                        }
                    }));
                }
            });
        });
    }
    static get styles() {
        return css `
      :host {
        --radiosBg: #fafafa;
        display: flex;
        flex-direction: column;
        place-content: flex-start;
        width: 100%;
      }
      ::slotted(bkj-radio:last-child) {
        border-radius: var(--lastRadioRadius, 0 0 10px 10px)
      }
      ::slotted(bkj-radio:first-child) {
        border-radius: var(--firstRadioRadius, 10px 10px 0 0)
      }
    `;
    }
    render() {
        return html `
        <slot>
        </slot>
    `;
    }
};
__decorate([
    queryAssignedNodes('', true)
], BkjRadioGroup.prototype, "_radios", void 0);
BkjRadioGroup = __decorate([
    customElement('bkj-radio-group')
], BkjRadioGroup);
export { BkjRadioGroup };
