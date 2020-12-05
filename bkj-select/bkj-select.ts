import {customElement, html, css, property, LitElement} from 'lit-element'


@customElement('bkj-select')
export class BkjSelect extends LitElement {
  @property({type: String}) placeholder: string = "Select..."
  @property({type: Boolean, reflect: true}) open: boolean = false

  private handleToggle({currentTarget}:{currentTarget: HTMLDetailsElement}) {
    currentTarget.open ? this.open = true : this.open = false
  }
  connectedCallback() {
    super.connectedCallback() 
    this.addEventListener('bkjRadio:clicked', (e: CustomEvent) => {
      e.stopImmediatePropagation()
      this.open = false
    })
  }
  static get styles() {
    return css`
      :host {
        width: 100%;
      }
      :host * {
        -webkit-touch-callout: none;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        -webkit-tap-highlight-color: transparent; 
        cursor: pointer;
      }
      :host :focus {
        outline: none;
      }
      :host summary::-webkit-details-marker {
        display: none;
      }
      details {
        max-width: 100%;
      }
      details:not([open]) > summary:hover {
        filter: brightness(120%);
      }
      details[open] > summary {
        border-radius: var(--selectOpenedRadius, 10px 10px 0 0 )
      }
      summary {
        display: flex;
        place-content: space-between;
        position: relative;
        background-color: #fafafa;
        color: teal;
        font-family: "Arial Rounded MT";
        padding: 8px;
        max-width: 100%;
        transition: filter .2s ease-out, border-radius .2s ease-out;
        border-radius: var(--radius, 10px);
        z-index: 50;
      }
      summary > * {
        align-self: center;
        fill: teal;
      }
      nav {
        position: absolute;
        left:0;
        top:0px;
        padding-top:18%;
        width: 100%;
        transform: scaleY(0);
        filter: opacity(0);
        transform-origin: top center;
        transition: transform .2s ease-out, filter .2s ease-out;
        z-index: 10;

      }
      details[open] summary > nav {
        transform: scaleY(1);
        filter: opacity(1)
      }

    `
  }
  render() {
    return html`
      <details ?open=${this.open} @toggle=${this.handleToggle}>
        <summary>
          <span>${this.placeholder}</span>
          <bkj-icon name="unfold-less-horizontal" size="20px"></bkj-icon>
          <nav>
            <slot></slot>
          </nav>
        </summary>
      </details>
    `
  }
}