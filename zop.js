import {css, html, LitElement, styleMap, until} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class EmbeddedAssureSign extends LitElement {
    
    static properties = {
        content: { type : String }      
    }
    
    static getMetaConfig() {
        // plugin contract information
        return {
            controlName: 'UPN',
            fallbackDisableSubmit: false,
            description: 'upn',
            iconUrl: "pen",
            groupName: 'AUS UPN',
            version: '1.3',
            standardProperties: {
                readOnly: true,
                description: true,
            }
        };
    }  
    async load() {
        const signingLinks = await fetch('https://api.zippopotam.us/us/90210');    
        const jsonSigningLinks = await signingLinks.json();     
        return    return html`  <p>${jsonSigningLinks.country} </p>  `;               
    }
    
    constructor() {
        super();        
    }

    async connectedCallback() {
        super.connectedCallback();
        this.content = this.load();
    }

    // Render the UI as a function of component state
    render() {
        return html`${until(this.content, html`<span>Loading...</span>`)}`
    }
}

// registering the web component.
const elementName = 'zip-zap';
customElements.define(elementName, EmbeddedAssureSign);
