
import { customElement, html, css, property, LitElement, queryAssignedNodes } from 'lit-element'
import {BkjRadio} from './bkj-radio'

@customElement('bkj-radio-group')
export class BkjRadioGroup extends LitElement {
  @queryAssignedNodes('', true) _radios: NodeListOf<BkjRadio>
  connectedCallback() {
    super.connectedCallback()
    this.setAttribute('role', 'radiogroup')
  }
  get $radios() {
    return Array.from(this._radios).filter((node) => node.nodeType !== 3)
  }
  firstUpdated() {
    if(!this.$radios[0].checked) this.$radios[0].checked = true
    this.$radios.forEach(radio => {
      radio.addEventListener('click', (e: Event) => {
        e.stopImmediatePropagation()
        e.preventDefault()
        const radio: BkjRadio = (e.currentTarget as BkjRadio)
        if(!radio.checked) {
          this.$radios.find(r => r.checked).checked = false
          radio.checked = true
          this.dispatchEvent(new CustomEvent('bkjRadio:changed',
            {
              detail: {
                __Event: e,
                value: radio.value
              }
            }
          ))    
        }
      })
    })
  }
  static get styles() {
    return css`
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
    `
  }

  render() {  
    return html`
        <slot>
        </slot>
    `
  }
}