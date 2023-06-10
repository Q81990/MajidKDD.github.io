import {css, html, LitElement, styleMap, until} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component
export class YoutubeControl extends LitElement {
  
  static properties = {
    videoUrl: {type: String},
  };
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'YouTube Control',
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
        videoUrl: {
          type: 'string',
          title: 'YouTubeURL',
          description: 'Type the YouTube URL here'
        }
      }
    };
  }
  
  
  renderCountry(country) {
    this.videoUrl =  html `  <div>Country: ${country}</div>  `;
  }
  
  
  async load() {
  const response = await fetch('https://api.zippopotam.us/us/90210');
  const myJson = await response.text();   
  const country = myJson;
  this.country = country;    
  }
  
  constructor() {
    super();
   
  }

      async connectedCallback() {
        super.connectedCallback();
        // this.videoUrl = this.load();
        await this.load();
    }
  
// render() {
//    return html`<button onclick="load()">Click ccme</button><p>"${this.videoUrl}" </p>`;
// }
  render() {
    return html`
      <div>
        <b>Country:</b>  html`${this.country}` 
      </div>
    `;
  }     

}

// registering the web component
const elementName = 'youtube-control';
customElements.define(elementName, YoutubeControl);
