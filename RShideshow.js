//ver 1.3
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

  
    ShowHide() {
  // Get the value of the input text with id "rsctrlid"
  const inputTextValue = document.querySelector('#rsctrlid').value;

  // Construct the data-e2e attribute selector
  const buttonSelector = `button[data-e2e="btn-new-row_${inputTextValue}"]`;

  // Find the button using the constructed selector
  const buttonToHide = document.querySelector(buttonSelector);

  if (buttonToHide) {
    buttonToHide.style.display = 'none';
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

render() {
    return html`
      <input type="text" id="rsctrlid" value="${this.videosrc}">
      <button @click="${this.ShowHide}">Click Me</button>      
    `;
  }

}
  
// registering the web component
const elementName = 'demors1-plugin1';
customElements.define(elementName, RSPlugIn);
