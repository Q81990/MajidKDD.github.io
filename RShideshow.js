import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

// define the component
export class RSPlugIn extends LitElement {
  static properties = {
    videosrc: { type: String },
    hide: { type: Boolean, enum: [true, false] },
  };

  static getMetaConfig() {
    return {
      controlName: 'rs show',
      fallbackDisableSubmit: false,
      groupName: 'rs show',
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
    const buttonsWithdataE2E = = [];

    buttons.forEach((button) => {
      const dataE2E = button.getAttribute('data-e2e');
      const styleControlId = button.getAttribute('stylecontrolid');
      if (dataE2E  && dataE2E.includes(this.videosrc)) {
        buttonsWithdataE2E.push(button);
      }
    });

    return buttonsWithdataE2E;
  }


renderButtons() {
  const buttons = this.findButtonsWithStyleControlId();

  buttons.forEach((button) => {
    if (this.hide) {
      button.style.setProperty('display', 'none', 'important'); // Hide the button with !important
    } else {
      button.style.setProperty('display', '', 'important'); // Show the button with !important
    }
  });

  return buttons;
}

 
  constructor() {
    super();
    this.videosrc = this.collectStyleControlIds();
this.hide = false;
  }

render() {
    return html`
      <input type="text" value="${this.videosrc}">
      ${this.renderButtons()}
    `;
  }

}
  
// registering the web component
const elementName = 'demors1-plugin1';
customElements.define(elementName, RSPlugIn);
