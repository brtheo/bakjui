var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { customElement, LitElement, property, html, css, query, queryAssignedNodes } from "lit-element";
CSS.paintWorklet.addModule('./insetBottomBar.js');
CSS.registerProperty({
    name: '--alignedPosition',
    syntax: '<percentage>',
    inherits: false,
    initialValue: '50%'
});
let BkjBottomBar = class BkjBottomBar extends LitElement {
    constructor() {
        super();
        this.position = 0;
    }
    firstUpdated() {
        this.style.setProperty('--alignedPosition', `${this.position}%`);
        this.update();
    }
    static get styles() {
        return css `
      @property --alignedPosition {
        syntax: "<percentage>";
        inherits: false;
        initial-value: 50%
      }
      @property --dropPosition {
        syntax: "<percentage>";
        inherits: false;
        initial-value: 50%
      }
      :host {
        --navWidth: 100vw;
        --navHeight: 60px;
        --alignedPosition: 50%;
        width: var(--navWidth);
        height: var(--navHeight);
        margin-top: auto ;
        display: flex;
        position: relative;
        place-content: center;
        box-sizing: border-box;
      }

      nav {
        filter: drop-shadow(0px 0px 10px black);
        display: flex;
        flex-flow: column-reverse;
        align-self: center;
        height: var(--navHeight);
        width: var(--navWidth);
        border-radius: var(--navHeight);
        backdrop-filter: saturate(110%) blur(20px);
        background-image: paint(inset-bottom-bar, #984ac5);
        --dropPosition: var(--alignedPosition);
        transition: --dropPosition .3s ease-in-out;
      }
      slot[name="fab"] {
        width: var(--navHeight);
        height: var(--navHeight);
        --buttonH: var(--navHeight);
        --buttonW: var(--navHeight);
        --buttonFC: black;
        border-radius: var(--navHeight);
        filter: drop-shadow(0px 0px 3px black);
        background: black;
        position: absolute;
        left: var(--alignedPosition);
        transform: translate(-50%, -30px); /*22*/
        display: flex;
        place-items: center;
        place-content: center;
        cursor: pointer;
        z-index: 2;
        -webkit-tap-highlight-color: transparent;
        transition: left .3s ease-in-out, transform .15s ease-in-out
      }
    `;
    }
    transition(call) {
        const fab = this.shadowRoot.querySelector("#fab");
        let pos = getComputedStyle(this).getPropertyValue('--alignedPosition');
        call(this, pos);
        pos = getComputedStyle(this).getPropertyValue('--alignedPosition');
        this.shadowRoot.querySelector("nav").style.setProperty('--dropPosition', pos);
        fab.style.setProperty('transform', "translate(-50%, -30px) scale(0)");
        fab.addEventListener('transitionend', (e) => {
            e.preventDefault();
            fab.style.setProperty('transform', "translate(-50%, -30px) scale(1)");
        });
        fab.style.setProperty('left', pos);
    }
    render() {
        return html `
      <slot name="fab">
      </slot>
      <nav>
        <slot name="menu-items">
        </slot>
      </nav>
    `;
    }
};
__decorate([
    queryAssignedNodes('fab')
], BkjBottomBar.prototype, "$fab", void 0);
__decorate([
    query('nav')
], BkjBottomBar.prototype, "$nav", void 0);
__decorate([
    property({ type: Number, reflect: true })
], BkjBottomBar.prototype, "position", void 0);
BkjBottomBar = __decorate([
    customElement('bkj-bottom-bar')
], BkjBottomBar);
export { BkjBottomBar };
