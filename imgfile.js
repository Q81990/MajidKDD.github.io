import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component
export class ImageControl extends LitElement {
  
  static properties = {
    imageSrc: {type: String},
  };
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'Image Control',
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
        imageSrc: {
          type: 'string',
          title: 'Who',
          description: 'Who to say hello to'
        }
      }
    };
  }
  
  constructor() {
    super();
    this.imageSrc = '';
  }

  render() {
    return html`<img src="${this.imageSrc}" alt="Preview Image">`;
  }
}

// registering the web component
const elementName = 'mytube-control';
customElements.define(elementName, ImageControl);
