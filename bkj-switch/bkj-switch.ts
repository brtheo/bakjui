import { customElement, LitElement, property, html, css, query} from "lit-element"

@customElement('bkj-switch')
export class BkjSwitch extends LitElement {
  @property({type: Boolean, reflect: true}) pressed: Boolean = false
  @query('#switch') $switch: HTMLElement

  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role','button')
    this.setAttribute('tabindex','0')
    this.setAttribute('aria-pressed', this.pressed.toString())

    this.addEventListener('click', (e: Event) => {
      if(!this.pressed) {
        this.setAttribute('aria-pressed', 'true')
        this.pressed = true
        this.$switch.classList.add('on')
      } else {
        this.setAttribute('aria-pressed', 'false')
        this.pressed = false
        this.$switch.classList.remove('on')
      }
    })
  }
  firstUpdated() {
    if(this.pressed) this.$switch.classList.add('on')
  }
  static get styles() {
    return css`
      :host {
        display: flex;
        width: max-content;
        height: max-content;
        cursor: pointer;
        --switchSize: 20px;
        --switchOffset: 2px;
        --_padding_: calc(var(--switchOffset) / 2)
      }
      :host(:focus) {
       outline: unset;
      }
      #switch {
        
        display: flex;
        width: calc(var(--switchSize) * 2);
        height: calc(var(--switchSize) + var(--switchOffset));
        border-radius: 20px;
        background-color: var(--switchBaseBC, #fafafa);
        position: relative;
        box-sizing: border-box;
        justify-content: space-around;
        transition: background-color .2s ease-out;
      }
      #switch::before {
        content: '';
        position: absolute;
        left: 0;
        box-sizing: border-box;
        place-self: center;
        width: var(--switchSize);
        height: var(--switchSize);
        border-radius: 50px;
        background-color: var(--switchBC, #d6d6d6);
        border: 2px solid var(--switchBorder, teal);
        transition: border-color .2s ease-out, background-color .2s ease-out;
        animation: moveleft .3s ease-out forwards;
        transform-origin: top right;
      }
      #switch.on::before {
        transform-origin: bottom right;
        border-color: var(--switchBorder, crimson);
        animation: moveright .3s ease-out forwards;
      }

      #switch.on > slot[name="off"] {
        filter: opacity(0);
        transform: scale(0);
      }
      #switch:not(.on) > slot[name="on"] {
        filter: opacity(0);
        transform: scale(0);
      }

      slot {
        display: flex;
        place-content: center;
        fill: gray;
        filter: opacity(1);
        transition: filter .2s ease, transform .2s ease-out;
      }
      slot::slotted(*) {
        display: flex;
        place-self: center;      
      }

      @keyframes moveleft{
        0% {
          transform:scaleX(1.2) translateX( var(--_padding_));
        }
        35% {
          height: calc(var(--switchSize)/2);
        }
        100% {
          transform: scaleX(1) translateX(calc(100% - var(--_padding_)));
        }
      }
      @keyframes moveright{
        0% {
          transform: scaleX(1.2) translateX(calc(100% - var(--_padding_)));
        }
        35% {
          height: calc(var(--switchSize)/2);
        }
        100% {
          transform: scaleX(1) translateX( var(--_padding_));
        }
      }
    `
  }
  render() {
    return html`
      <section id="switch">
        <slot name="off"></slot>
        <slot name="on"></slot>
      </section>
    `
  }
}