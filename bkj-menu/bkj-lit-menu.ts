import { customElement, html, css, property, queryAssignedNodes, LitElement, query } from 'lit-element'


class MenuHistory extends Array {
  constructor(...args) {
    super(...args)
  }
  get pathBackward(): Array<string> {
    return this.length > 1 ? this[this.length - 2].split('/') : null
  }
  reset() {
    this.length = 0
  }
}
@customElement('bkj-menu')
export class BkjMenu extends LitElement {
  @property({type: String, reflect: true}) path: string = "root"
  @queryAssignedNodes('root') $root: NodeListOf<HTMLUListElement>
  @queryAssignedNodes('parts') $parts: NodeListOf<HTMLUListElement>
  @query('nav') $nav: HTMLElement
  @query('#_root') $_root: HTMLElement
  @query('#_parts') $_parts: HTMLElement
  
  history: MenuHistory = new MenuHistory()
  menuViews: Map<string, HTMLUListElement>
  constructor() {
    super()
    //this.createOuterStyle()
    this.handleToggle.bind(this)
  }

  /**
   * Definition of the  DOM elements needed for all the manipulations.
   * Merging of all the UL in one Map object.
   * Hides all the necessary elements to be hidden
   */
  firstUpdated() {
    this.menuViews = new Map(
      Array.from(this.$root)
      .concat(Array.from(this.$parts))
      .map((ul: HTMLUListElement) => [ul.dataset.path.split('/')[1], ul])
    )
    this.$_parts.remove()
    this.$_root.remove()
    this.menuViews.forEach((ul: HTMLUListElement, key: string) => {
      ul.classList.add('bkj-list')
      if(key === 'root') ul.classList.add('root')
      else ul.classList.add('parts')
      ul.removeAttribute('slot')
      this.$nav.insertAdjacentElement('beforeend',ul)
    })
    this.updateMenu()
  }
  private handleToggle({currentTarget}: {currentTarget: HTMLDetailsElement}) {
    //if(currentTarget.open) this.menuViews.forEach(ul => ul.style.animation = "")
  }

  /**
   * Render loop, re-update the menu when the sole attribute "path", changed.
   */
  /*attributeChangedCallback(name, old, path) {
    const [from, to] = this.path.split('/')
    this.updateMenu(to)
  }*/
  /*update(prop) {
   // prop.forEach((old, newd) => console.log(old, newd))
  }*/

  /**
   * Get the menu partial to be displayed from the map object holding all the views
   * @param part Name of the menu partial to diplay at the moment
   */
  private updateMenu(part: string = 'root') {
    Array.from(this.menuViews.get(part).children)
      .filter((li: HTMLElement) => li.hasAttribute('data-path') && li.dataset.path.includes('/'))
      .forEach((li: HTMLElement) => {
        li.addEventListener('click', (e: Event) => {
          e.preventDefault()
          e.stopImmediatePropagation()
          this.path = (e.currentTarget as HTMLElement).dataset.path
          this.history.push(this.path)
          const [from, to] = this.path.split('/')
          const [fromBack, toBack] = this.history.pathBackward !== null ? this.history.pathBackward : [null, null]
          const duration = 5
          if (to === 'root' || to === fromBack) {
            this.menuViews.get(from).style.animation = `menu-slide-to-right .${duration}s forwards`
            this.menuViews.get(to).style.animation = `menu-slide-from-left .${duration}s forwards`
          } else {
            this.menuViews.get(from).style.animation = `menu-slide-to-left .${duration}s forwards`
            this.menuViews.get(to).style.animation = `menu-slide-from-right .${duration}s forwards`
          }
          if (to === 'root') this.history.reset()
        })
      })
      this.requestUpdate()
  }

  /**
   * Create a global style tag in head holding animations related code
   */
  private createOuterStyle(): void {
    const outerStyles = document.createElement('style')
    outerStyles.innerHTML = this.outerStyles
    document.head.insertAdjacentElement('beforeend', outerStyles)
  }
  static get styles() {
    return css`
            :host {
                --bkj-menu-heading-backcolor: rgba(var(--md-grey-600));
                --bkj-menu-heading-size: 48px;
                --bkj-menu-heading-rad: var(--bkj-menu-heading-size);

                --bkj-menu-backcolor: rgba(var(--md-grey-900), 79);
                --bkj-menu-color: rgb(0,0,0);
                --bkj-menu-width: max-content;
                --bkj-menu-height: auto;
                --bkj-menu-rad: 0px;
                
                width: 100%;
            }
            :host * {cursor: pointer}
            :host details {
                max-width: 100%;
                z-index: 0;
            }
            :host summary{
                height: var(--bkj-menu-heading-size);
                width: var(--bkj-menu-heading-size);
                background-color: var(--bkj-menu-heading-backcolor);
                border-radius: var(--bkj-menu-heading-rad);
                display:flex;
                justify-content: center;
                align-items: center; 
                outline: none;
                position: relative;
                max-width: 100%;
                z-index: 30;
            }
            :host summary::-webkit-details-marker {
                display: none;
            }
            summary > nav {
                transition: transform .2s ease;
                transform: scale(0);
                position: absolute;
                background: var(--bkj-menu-backcolor);
                color: var(--bkj-menu-color);
                border-radius: var(--bkj-menu-rad);
                width: var(--bkj-menu-width);
                height: var(--bkj-menu-height);
                padding: 10px;
                font-size: 1.2rem;
                overflow: hidden;
                transform-origin: top right;
                top: 50px;
                right: 0;
                z-index: 50;
            }
            :host details[open] summary > nav {
                transform: scale(1)
            }
            @keyframes menu-appear {
                from {transform: translateX(calc(-100% + var(--bkj-menu-heading-size))) translateY(-5px);opacity: 0;}
                to {transform: translateX(calc(-100% + var(--bkj-menu-heading-size))) translateY(5px);opacity: 1; }
            }
            @-webkit-keyframes menu-appear {
                from {transform: translateX(calc(-100% + var(--bkj-menu-heading-size))) translateY(-5px);opacity: 0;}
                to {transform: translateX(calc(-100% + var(--bkj-menu-heading-size))) translateY(5px);opacity: 1; }
            }

            ul.bkj-list {
                list-style:none;
                padding: 0;
                margin: 0px;
                visibility: visible;
                transform: translateX(0px);
                opacity: 1;
                position: unset;
            }
            ul.bkj-list.parts {                
            visibility: hidden;
            position: absolute;
            opacity: 0;
        }
            ul.bkj-list > li{
                padding: 5px 10px;
                border-radius: 20px;
                transition: opacity .2s, color .2s;
            }
            ul.bkj-list > li:hover{
                opacity: .8;
                color: rgb(var(--md-light-blue-a700));
               
            } 
            @-webkit-keyframes menu-slide-from-right{
                from{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;
                    
                    -webkit-transform: translateX(100%);
                    
                            transform: translateX(100%);
                }
                to{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
            }
            @keyframes menu-slide-from-right{
                from{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;
                    
                    -webkit-transform: translateX(100%);
                    
                            transform: translateX(100%);
                }
                to{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
            }
            @-webkit-keyframes menu-slide-to-right {
                from{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
                to{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;
                    
                    -webkit-transform: translateX(100%);
                    
                            transform: translateX(100%);
                }
            }
            @keyframes menu-slide-to-right {
                from{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
                to{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;
                    
                    -webkit-transform: translateX(100%);
                    
                            transform: translateX(100%);
                }
            }
            @-webkit-keyframes menu-slide-from-left {
                from{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;
                    
                    -webkit-transform: translateX(-100%);
                    
                            transform: translateX(-100%);
                }
                to{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
            }
            @keyframes menu-slide-from-left {
                from{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;
                    
                    -webkit-transform: translateX(-100%);
                    
                            transform: translateX(-100%);
                }
                to{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
            }
            @-webkit-keyframes menu-slide-to-left {
                from{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
                to{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;   
                    -webkit-transform: translateX(-100%);   
                            transform: translateX(-100%);
                }
            }
            @keyframes menu-slide-to-left {
                from{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
                to{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;   
                    -webkit-transform: translateX(-100%);   
                            transform: translateX(-100%);
                }
            }
        `
  }
  get outerStyles() {
    return /*css*/`
        ul.bkj-list[slot="parts"] {                
            visibility: hidden;
            position: absolute;
            opacity: 0;
        }
        ul.bkj-list.parts {                
            visibility: hidden;
            position: absolute;
            opacity: 0;
        }
            ul.bkj-list {
                list-style:none;
                padding: 0;
                margin: 0px;
                visibility: visible;
                transform: translateX(0px);
                opacity: 1;
                position: unset;
            }
            ul.bkj-list > li{
                padding: 5px 10px;
                border-radius: 20px;
                transition: opacity .2s, color .2s;
            }
            ul.bkj-list > li:hover{
                opacity: .8;
                color: rgb(var(--md-light-blue-a700));
               
            } 
            @-webkit-keyframes menu-slide-from-right{
                from{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;
                    
                    -webkit-transform: translateX(100%);
                    
                            transform: translateX(100%);
                }
                to{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
            }
            @keyframes menu-slide-from-right{
                from{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;
                    
                    -webkit-transform: translateX(100%);
                    
                            transform: translateX(100%);
                }
                to{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
            }
            @-webkit-keyframes menu-slide-to-right {
                from{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
                to{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;
                    
                    -webkit-transform: translateX(100%);
                    
                            transform: translateX(100%);
                }
            }
            @keyframes menu-slide-to-right {
                from{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
                to{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;
                    
                    -webkit-transform: translateX(100%);
                    
                            transform: translateX(100%);
                }
            }
            @-webkit-keyframes menu-slide-from-left {
                from{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;
                    
                    -webkit-transform: translateX(-100%);
                    
                            transform: translateX(-100%);
                }
                to{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
            }
            @keyframes menu-slide-from-left {
                from{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;
                    
                    -webkit-transform: translateX(-100%);
                    
                            transform: translateX(-100%);
                }
                to{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
            }
            @-webkit-keyframes menu-slide-to-left {
                from{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
                to{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;   
                    -webkit-transform: translateX(-100%);   
                            transform: translateX(-100%);
                }
            }
            @keyframes menu-slide-to-left {
                from{
                    visibility: visible;
                    position: unset;
                    opacity: 1;
                    -webkit-transform: translateX(0px);
                            transform: translateX(0px);
                }
                to{
                    visibility: hidden;
                    position: absolute;
                    opacity: 0;   
                    -webkit-transform: translateX(-100%);   
                            transform: translateX(-100%);
                }
            }
        `
  }
  render() {
    return html`
      <details @toggle=${this.handleToggle}>
        <summary>
          <slot name="heading"></slot>
          <nav>
            <slot name="root" id="_root"></slot>
            <slot name="parts" id="_parts"></slot>    
          </nav>
        </summary>
      </details>
    `
  }
}
