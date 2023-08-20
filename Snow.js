import {css, html, LitElement, styleMap, until} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component
export class abnControl extends LitElement {
  
  static properties = {
    videoUrl: {type: String},
selectedOption: { type: String }
  };
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'abn Control',
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
        videoUrl: {
          type: 'string',
          title: 'abnURL',
          // isValueField: true,
          description: 'Type the YouTube URL here'
        }
      }
    };
  }
  
  
  renderCountry(country) {
    this.videoUrl =  html `  <div>Country: ${country}</div>  `;
  }
  
  
  async load() {
const apiUrl = 'https://dev160993.service-now.com/api/now/table/incident?sysparm_fields=number&caller_id=majid';
const headers=
    {"Content-Type": "application/json",      
      "Authorization": "Basic YWRtaW46dmJKYWRASCpUNlc5"}
      
    


const abnvar =   'https://dev160993.service-now.com/api/now/table/incident?sysparm_fields=number&caller_id=majid';
 const response = await fetch(abnvar,{ method: "GET", headers: { "Authorization": "Basic YWRtaW46dmJKYWRASCpUNlc5"}});
if (response.ok) {
        
          const myJson = await response.json();
      const numbers = myJson.result.map(item => item.number);

      return numbers;
    } else {
        return "hellhhNOeeb";
    }
  }
  
 
  constructor() {
    super();
   
  }

      async connectedCallback() {
        super.connectedCallback();
         this.videoUrl = await this.load();
        //await this.load();
    }

 render() {
 const dropdownOptions = this.videoUrl.map(number => html`<option value="${number}">${number}</option>`);

  return html`
    <label for="numberDropdown">Select a Number:</label>
    <select id="numberDropdown" @change="${this.handleDropdownChange}">
      ${dropdownOptions}
    </select>
    <label for="selectedValue">Selected Value:</label>
    <input id="selectedValue" type="text" .value="${this.selectedOption}" readonly>
  `;
     
}
  
handleDropdownChange(event) {
  const selectedValue = event.target.value;
  this.selectedOption = selectedValue;
}

}

// registering the web component
const elementName = 'abn-control';
customElements.define(elementName, abnControl);
