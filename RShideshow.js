//ver 3
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
          title: 'ctrl id',
          description: 'RS ctrl id',
        },
        hide: {
          type: 'boolean',
          title: 'Hide ctrl',
          description: 'Set to true to hide the ctrl, false to display it.',
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

    buttons.forEach((button) => {
      const styleControlId = button.getAttribute('stylecontrolid');
      if (styleControlId) {
        buttonsWithStyleControlId.push(button);
      }
    });

    return buttons; //buttonsWithStyleControlId;
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

render() {
    return html`
      <input type="text" style="width: 840px; value="${this.videosrc}">      
      ${this.renderButtons()}
    `;
  }

}
  
// registering the web component
const elementName = 'demors1-plugin1';
customElements.define(elementName, RSPlugIn);
