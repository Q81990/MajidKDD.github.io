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
  
  async load() {
  const userAction = async () => {
  const response = await fetch('https://api.zippopotam.us/us/90210');
  const myJson = await response.json();   
  }
     return html`<p>"${myJson.country}" </p>`;
  }
  
  constructor() {
    super();
   
  }

      async connectedCallback() {
        super.connectedCallback();
        this.videoUrl = this.load();
    }
  
 render() {
    return html`<button onclick="load()">Click me</button><p>"${this.videoUrl}" </p>`;
 }
       

}

// registering the web component
const elementName = 'youtube-control';
customElements.define(elementName, YoutubeControl);
