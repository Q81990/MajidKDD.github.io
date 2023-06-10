import {css, html, LitElement, styleMap, until} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class EmbeddedAssureSign extends LitElement {
    // Define scoped styles right with your component, in plain CSS
    static styles = css`
      :host {
        height: 100%;
        width: 100%;
        display: block;
      }

      .frame {
        display: inline-block;
        height: 100%;
        width: 100%;
        background-color: transparent;
        border: none;
      }
    `;
    
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

     
        const signingLinks = await fetch('https://api.zippopotam.us/us/90210');    
        const jsonSigningLinks = await signingLinks.json();
        
        let styles = {height: this.height};
        return    return html`
        <p>${jsonSigningLinks.country} </p>  
      `;   
            
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
        return html`${until(this.content, html`<span>Loading...</span>`)}`
    }
}

// registering the web component.
const elementName = 'zip-zap';
customElements.define(elementName, EmbeddedAssureSign);
