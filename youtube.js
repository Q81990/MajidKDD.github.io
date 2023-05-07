import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component
export class YoutubeControl extends LitElement {
  
  static properties = {
    videoUrl: {type: String},
  };
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'Image Control',
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
  
  constructor() {
    super();
    this.videoUrl = '';
  }

  render() {
    return html`<iframe width="560" height="315" src="${this.videoUrl}" frameborder="0" allowfullscreen></iframe>`;
  }
}

// registering the web component
const elementName = 'youtube-control';
customElements.define(elementName, YoutubeControl);
