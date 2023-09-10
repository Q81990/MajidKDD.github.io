//ver 10.1 WORKING HIDING ADD NEW ROW 0.1 adding check box hide
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

  toggleHide(event) {
  this.hide = event.target.checked;
}

    ShowHide() {
          //  alert('Hello 2222444423');  
  // Get the input element with id="ctrlid" 
    const updatedValue = "btn-new-row"+this.videosrc;  
    const buttonsz = this.renderButtons();
    console.error('Majidcczcz Input element with id "ctrlid" not found.');
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
this.hide = true;
  }

render() {
    return html`
        <input type="text" id="ctrlid" style="width: 840px;" value="${this.videosrc}">
<label for="hideCheckbox">Hide Video</label>
    <input type="checkbox" id="hideCheckbox"  @change="${this.toggleHide}"?checked="${this.hide}">
    <button @click="${this.ShowHide}">Click Me</button>      
    `;
  }

}
  
// registering the web component
const elementName = 'demors1-plugin1';
customElements.define(elementName, RSPlugIn);
