if(!globalThis.hasOwnProperty('bkj')) globalThis.bkj = {iconProvider:{default : 'https://raw.githubusercontent.com/Templarian/MaterialDesign-SVG/master/svg/'}}
globalThis.bkj.iconProvider.default = 'https://raw.githubusercontent.com/Templarian/MaterialDesign-SVG/master/svg/'
export class BkjIcon extends HTMLElement {
    static get observedAttributes() {
        return ['name']
    }
    constructor(){
        super()
        this.attachShadow({mode:'open'})
    }
    get size() {
        return this.hasAttribute('size')
            ? this.getAttribute('size')
            : '24px'
    }
    get provider() {
        return this.hasAttribute('provider') 
            ? this.getAttribute('provider') 
            : 'default'
    }

    async attributeChangedCallback(name,old,iconName){ 
        if(localStorage.getItem(`icon_${iconName}`) === null ) {
            const iconProvider = globalThis.bkj.iconProvider[this.provider] 
            const res = await fetch(`${iconProvider}${iconName}.svg`)
            const iconSvg = await res.text()
            localStorage.setItem(`icon_${iconName}`,iconSvg)
            this.render(iconSvg)
        }
        else this.render(localStorage.getItem(`icon_${iconName}`))
        const $svg = this.shadowRoot.querySelector('svg')
        $svg.setAttribute('height',this.size)
        $svg.setAttribute('width',this.size)
    }
    render(fragment) {
        this.shadowRoot.innerHTML =  /*html*/`
            <style>
                :host {
                    width: ${this.size};
                    height: ${this.size};
                }
            </style>
            ${fragment}
        `
    }
}
customElements.define('bkj-icon', BkjIcon)
