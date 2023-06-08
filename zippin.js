import {css, html, LitElement, styleMap, until} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class EmbeddedAssureSign extends LitElement {
 
    static properties = {
        src: { type: String }
    }
    
    static getMetaConfig() {
        // plugin contract information
        return {
            controlName: 'zipcode',
            fallbackDisableSubmit: false,
            description: 'IFrame component which can render zipcode',
            iconUrl: "pen",
            groupName: 'address',
            version: '1.3',
            properties: {
                height: {
                    type: 'string',
                    title: 'Height',
                    description: 'Height of the component',
                }
            },
            standardProperties: {
                readOnly: true,
                description: true,
            }
        };
    }
    
    async load() {
                
        const signingLinks = await fetch('https://api.zippopotam.us/us/90210',
            {
                method: 'GET',
                headers: {                    
                    'Content-Type': 'application/json'
                }
            }
        );

        const jsonSigningLinks = await signingLinks.json();
        
        let styles = {height: this.height};
        return html`
            <b>${jsonSigningLinks}
            ></b>`;
    }
    
    constructor() {
        super();        
        this.height = '900px'
    }

    async connectedCallback() {
        super.connectedCallback();
        this.content = this.load();
    }

    // Render the UI as a function of component state
    render() {
        return html`${jsonSigningLinks}`
    }
}

// registering the web component.
const elementName = 'post-code';
customElements.define(elementName, EmbeddedAssureSign);
