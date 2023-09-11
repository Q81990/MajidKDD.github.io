//ver 11 WORKING HIDING ADD NEW ROW 11 adding check box hide11
import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

// define the component
export class RSPlugIn extends LitElement {
  static properties = {
    videosrc: { type: String },
    hide: { type: Boolean, enum: [true, false] },
    _hide : { type: Boolean},
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
          title: 'RS Source',
          description: 'RS list',
        },
        hide: {
          type: 'boolean',
          title: 'Hide new row',
          description: 'Set to true to hide the RS btn, false to display it.',
        },
      },
    };
  }

   // Property setter for 'hide' property
  set hide(value) {
    const oldValue = this._hide;
    this._hide = value;

    if (oldValue !== value) {
      this.renderButtons(); // Call renderButtons when '_hide' changes
    }
  }
  toggleHide(event) {
  this.hide = event.target.checked;
    this.ShowHide();
}

    ShowHide() {
     const updatedValue = "btn-new-row"+this.videosrc;  
    const buttonsz = this.renderButtons();
    console.error('TESTing Input element with id "ctrlid" not found.');
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
      const styleControlId = button.getAttribute('data-e2e');
      if (styleControlId) {
        buttonsWithStyleControlId.push(button);
      }
    });

    return buttonsWithStyleControlId;
  }

  renderButtons() {
    const buttons = this.findButtonsWithStyleControlId();
    buttons.forEach((button) => {
      if (this._hide) {
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
    this._hide = false;
  }

/*
//  <input type="text" id="ctrlid" style="width: 840px;" value="${this.videosrc}">
//  <label for="hideCheckbox">Hide Video</label>
//  <input type="checkbox" id="hideCheckbox"  @change="${this.toggleHide}"?checked="${this.hide}">
//  <button @click="${this.ShowHide}">Click Me</button> 
*/
  
render() {
    return html`           
    `;
  }

}
  
// registering the web component
const elementName = 'demors1-plugin1';
customElements.define(elementName, RSPlugIn);
