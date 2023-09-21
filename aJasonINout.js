import { html,css, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class JSonInOut extends LitElement {

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
    title: { type: String },
    value: { type: String }, // Change the type to Object for JSON data
    options: { type: String },
    readOnly: {},
    JSONvalue: { type: String },
  };


  static getMetaConfig() {
    return {
      controlName: 'JSonInOut Radio Buttons',
      iconUrl: "https://laketree.com/wp-content/themes/laketree/img/favicon/favicon-32x32.png",
      groupName : 'JSonInOut',
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


// Define a function for the API endpoint URL
apiEndpoint(assetTag) {
  return 'https://dev83014.service-now.com/api/now/table/alm_asset?asset_tag=${assetTag}';
}


async load(assetTag) {
  const snowvar =  'https://dev83014.service-now.com/api/now/table/alm_asset?asset_tag=P1000479'; //this.apiEndpoint(assetTag);
    const response = await fetch(snowvar, { method: "GET", headers: { "Authorization": "Basic QWRtaW46UU1iblRvOXAlMSFL" } }); 
  if (response.ok) {
    const myJson = await response.json();
    const result = myJson.result;
    return result;
  } else {
    return [];
  }
}

  // Add an event listener for radio button clicks
optionClicked(e) {
  const assetTag = e.target.value; // Get the asset_tag from the clicked radio button
  this.loadAndUpdateValue(assetTag);

  // Dispatch a custom event with the specified properties
  const args = {
    bubbles: true,
    cancelable: false,
    composed: true,
    detail: e.srcElement.innerText,
  };
  const event = new CustomEvent('ntx-value-change', args);
  this.dispatchEvent(event);
}

   async loadAndUpdateValue(assetTag) {
    // Call the load function with the selected asset tag
    this.value = await this.load(assetTag); // Assign JSON data to the "value" property
  }

 constructor() {
    super();
  }

async connectedCallback() {
    super.connectedCallback();

    // Add click event listeners to radio buttons
    this.shadowRoot.querySelectorAll('input[type="radio"]').forEach(radio => {
      radio.addEventListener('click', this.optionClicked.bind(this));
    });

    // Initially load data based on the default selected radio button
    const selectedOption = this._arrOptions.find(opt => opt.checked);
    if (selectedOption) {
      const assetTag = selectedOption.value;
      this.loadAndUpdateValue(assetTag);
    }
  }

 

      render() {

      this._arrOptions = [];  

      this._disabledStyle = this.readOnly ? "pointer-events: none;opacity:.5;" : "";  
      this._defaultValue = this._defaultValue ?? "";
      this.value = this.value ?? this._defaultValue;  //set the value to the default value if not set.

      this._options = this.options ?? "Yes,No,Maybe";  
      this._options.split(",").forEach((item, index) => {

        var opt = {};
        opt.id = index;
        opt.value = item;
        opt.checked = (this.value === item);
        this._arrOptions.push(opt);

        });

        return html`

                    <div class="lt-radio-buttons-wrapper" style="${this._disabledStyle}">
                        ${this._arrOptions.map((opt) => html`
                            <input type="radio" class="lt-radio-button" name="radioButtonTest" value="${opt.value}" id="${opt.id}" ?checked=${opt.checked} /><label @click=${this.optionClicked} for="${opt.id}">${opt.value}</label>
                        `)}

                    </div>
                    
        `;
    
                  }

}


const elementName = 'snow-json1';
customElements.define(elementName, JSonInOut);
