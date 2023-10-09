
import { html,css, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class LakeTreeRadioButtons extends LitElement {

  static styles = css` 
  
  html {
    box-sizing: border-box;
  }
  
  *,
  *:before,
  *:after {
    box-sizing: inherit;
  }
  
  body { 
    font-family: 'Open Sans', sans-serif;
  }
  
  .lt-radio-buttons-wrapper {
    clear: both;
    display: inline-block;
  }
  
  .lt-radio-button {
    position: absolute;
    left: -9999em;
    top: -9999em;
    cursor: pointer;
    
    & + label {
      float: left;
      padding: .5em 1em;
      cursor: pointer;
      border: 1px solid var(--ntx-form-theme-color-border);
      margin-right: -1px;
      color: var(--ntx-form-theme-color-primary);
      background-color: var(--ntx-form-theme-color-form-background);
                                        
      &:first-of-type {
        border-radius: .7em 0 0 .7em;
      }
      
      &:last-of-type {
        border-radius: 0 .7em .7em 0;
      }
    }
    
    &:checked + label {
      background-color: var(--ntx-form-theme-color-primary);
      color: var(--ntx-form-theme-color-form-background);
    }

    &:hover + label {
        background-color: var(--ntx-form-theme-color-primary);
        color: var(--ntx-form-theme-color-form-background);
        opacity: 0.8;
    }
  }

  
  `
  static properties = {
    title: {type: String },
    value: {type: String },
    options: {type: String },
    readOnly: { },
  };

  static getMetaConfig() {
    return {
      controlName: 'LakeTree Radio Buttons',
      iconUrl: "https://laketree.com/wp-content/themes/laketree/img/favicon/favicon-32x32.png",
      groupName : 'LakeTree',
      fallbackDisableSubmit: false,
      version: '1.0',
      standardProperties : {
        description: true,
        defaultValue: true,
        fieldLabel: true,
        readOnly: true,
        required: true,
        visibility: true
      },
      properties: {
        options: {
          type: 'string',
          title: 'Options',
          defaultValue: "Yes,No,Maybe",
          description: 'Comma separated list of options'
        },
        value: {
            type: 'string',
            title: 'Value',
            isValueField: true,
        }
      },
      events: ["ntx-value-change"],
    };
  }

  constructor() {
    super();
  }


  optionClicked(e)  {

  const args = {
    bubbles: true,
    cancelable: false,
    composed: true,
    detail: e.srcElement.innerText,
  };
 const event = new CustomEvent('ntx-value-change', args);
 this.dispatchEvent(event);

}

   
  render() {
    // Convert the options string into an array and remove duplicates
    const uniqueOptions = [...new Set(this._options.split(","))];

    this._arrOptions = [];

    this._disabledStyle = this.readOnly ? "pointer-events: none;opacity:.5;" : "";
    this._defaultValue = this._defaultValue ?? "";
    this.value = this.value ?? this._defaultValue; // Set the value to the default value if not set.

    uniqueOptions.forEach((item, index) => {
      var opt = {};
      opt.id = index;
      opt.value = item;
      opt.checked = this.value === item;
      this._arrOptions.push(opt);
    });

    return html`
      <div class="lt-radio-buttons-wrapper" style="${this._disabledStyle}">
        ${this._arrOptions.map(
          (opt) => html`
            <input
              type="radio"
              class="lt-radio-button"
              name="radioButtonTest"
              value="${opt.value}"
              id="${opt.id}"
              ?checked=${opt.checked}
            /><label @click=${this.optionClicked} for="${opt.id}"
              >${opt.value}</label
            >
          `
        )}
      </div>
    `;
  }
}

}


const elementName = 'laketree-radios';
customElements.define(elementName, LakeTreeRadioButtons);
