import { customElement, LitElement, property, html, css, query} from "lit-element"

@customElement('bkj-field')
export class BkjField extends LitElement {
  @property({type: String, reflect: true}) type: 'text' | 'password' | 'email' = 'text'
  @property({type: String, reflect: true}) label: string = 'Label'
  @query('#input') $input: HTMLInputElement
  connectedCallback() {
    super.connectedCallback()
    
  }
  firstUpdated() {
  }
  public get value() {
    return this.$input.value
  }
  static get styles() {
    return css`
      :host {
        display: flex;
        width: max-content;
        height: max-content;
        --fieldFont: 'Arial Rounded MT';
        --labelFont: var(--fieldFont);
      }
      #field {
        display: flex;
        flex-direction: column;
      }
      #field > * {
        margin: 2px
      }
      #input {
        font-family: var(--fieldFont);   
        outline: none;
        padding: 5px;
        border-radius: 10px;
        border: none;
        box-sizing: border-box;
        width: 100%;
        color: var(--inputColor, black);
        background: var(--inputBC, #fafafa);
        transition: filter .3s ease-in-out;
      }
      #input:focus {
        filter: drop-shadow(0px 0px 3px var(--fieldFocusOutline, teal))
      }
      label {
        font-family: var(--fieldFont);   
        color: var(--labelColor, #fafafa);
        font-size: 14px;
      }
    `
  }
  render() {
    const {type, label} = this
    return html`
      <section id="field">
        <label for="input">${label}</label>
        <input type=${type} id="input" />
      </section>
    `
  }
}