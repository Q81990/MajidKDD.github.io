import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
import { html, render} from 'https://unpkg.com/lit-html?module';

export class ImageUpload extends LitElement {
  
  static get properties() {
    return {
      myimageUrl: { type: String }
    };
  }
  
   // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'ImageUpload',
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
        myimageUrl: {
          type: 'string',
          title: 'Who',
          description: 'Who to say hello to'
        }
      }
    };
  }


  constructor() {
    super();
    this.myimageUrl = '';
  }

  render() {
    return html`<div> <input type="text" placeholder="Enter image URL" @change="${this.handleUrlChange}"> <img src="${this.imageUrl}" alt="Uploaded image"> </div> `;
    
  }

  handleUrlChange(e) {
    const imageUrl = e.target.value;
    if (imageUrl !== '') {
      this.myimageUrl = imageUrl;
    }
  }
}

const elementName = 'image-upload';
customElements.define(elementName, ImageUpload);
