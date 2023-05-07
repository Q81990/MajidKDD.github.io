import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
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
  
  constructor() {
    super();
    this.videoUrl = '';
  }

  render() {
    return html`<img src="${this.videoUrl}" alt="Preview Image">`;
  }
}

// registering the web component
const elementName = 'youtube-control';
customElements.define(elementName, YoutubeControl);
