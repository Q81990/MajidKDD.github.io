/*
    Media Player Plugin
    This PlugIn can be used to show videos on the form plugin
*/

import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';


// define the component
export class RSPlugIn extends LitElement {
  static properties = {
    videosrc: { type: String },
    hide: { type: Boolean, enum: [true, false] },
  };

  static getMetaConfig() {
    return {
      controlName: 'Media Player1',
      fallbackDisableSubmit: false,
      groupName: 'Media Player',
      version: '1.2',
      properties: {
        videosrc: {
          type: 'string',
          enum: [true, false], // Enum values for hide property
          title: 'Media Source',
          description: 'Imported YouTube embedded link is needed (e.g., https://www.youtube.com/embed/vpKcM4MxPzc)',
        },
        hide: {
          type: 'boolean',
          title: 'Hide Video',
          description: 'Set to true to hide the video, false to display it.',
        },
      },
    };
  }


  checkAdress() {
          if(this.videosrc) {
                    return html`                          
            <iframe id="ntxFormContainer-f8b4ec53-cd09-4fe2-85b6-a5e5a66326cd" scrolling="no" style="width:100%; border:none;" height="100%"
                src="${this.videosrc}
            ></iframe>  
      `;
    
    }
    else {      
      return html`
        <p>ok Please enter a source </p>  
      `;   
    }
  }     
  
  collectStyleControlIds() {
    const divsWithClass = document.querySelectorAll('.nx-repeating-section-container');
    const styleControlIds = [];
    
    divsWithClass.forEach((div) => {
      const styleControlId = div.getAttribute('stylecontrolid');
      if (styleControlId) {
        styleControlIds.push(styleControlId);
      }
    });

    return styleControlIds.join(';');
  }
  findButtonsWithStyleControlId() {
    const buttons = document.querySelectorAll('button[data-e2e^="btn-new-row"]');
    const buttonsWithStyleControlId = [];

    buttons.forEach((button) => {
      const styleControlId = button.getAttribute('stylecontrolid');
      if (styleControlId) {
        buttonsWithStyleControlId.push(button);
      }
    });

    return buttonsWithStyleControlId;
  }

  renderButtons() {
    const buttons = this.findButtonsWithStyleControlId();

    buttons.forEach((button) => {
      if (this.hide) {
        button.style.display = 'none'; // Hide the button if hide is true
      } else {
        button.style.display = ''; // Show the button if hide is false
      }
    });

    return buttons;
  }
  constructor() {
    super();
    this.videosrc = this.collectStyleControlIds();
this.hide = false;
  }


  
  headerTemplate() {
    return html` <link rel="stylesheet" href="https://cdn.plyr.io/3.7.3/plyr.css">                  
                  <script src="https://ntx-apacsuccess.workflowcloud.com/embedform/iframe/ntx-embed-iframe.js" data-id="ntxFormContainer-f8b4ec53-cd09-4fe2-85b6-a5e5a66326cd"></script>   
                
                `;
  }

  footerTemplate() {
    return html` </div> `;
  }
  

render() {
    return html`
      ${this.headerTemplate()}
      ${this.hide ? '' : this.checkAdress()}
      ${this.renderButtons()} <!-- Render the buttons based on hide property -->
    `;
  }
}
  
}

// registering the web component
const elementName = 'RS-plugin1';
customElements.define(elementName, RSPlugIn);
