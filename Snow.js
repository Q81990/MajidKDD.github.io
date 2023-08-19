import {css, html, LitElement, styleMap, until} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component
export class snowControl extends LitElement {
  
  static properties = {
    incnum: {type: String},
    selectedOption: { type: String }
  };
  
  // return a promise for contract changes.
  static getMetaConfig() {
    return {
      controlName: 'SNow Control',
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
        incnum: {
          type: 'string',
          title: 'IncidentNumber',
          // isValueField: true,
          description: 'Type the Inncident number here'
        }
      }
    };
  }
  
  
  renderCountry(country) {
    this.incnum =  html `  <div>Country: ${country}</div>  `;
  }
  
  
async load() {
const snowvar =   'https://dev160993.service-now.com/api/now/table/incident?sysparm_fields=number&caller_id=majid';
  const response = await fetch(snowvar,{ method: "GET", headers: { "Authorization": "Basic YWRtaW46dmJKYWRASCpUNlc5"}});
if (response.ok) {
         const myJson = await response.json();
      const numbers = myJson.result.map(item => item.number);

      return numbers;
      } else {
        return "Error";
    }
  
  }  
 
  constructor() {
    super();
   
  }

      async connectedCallback() {
        super.connectedCallback();
         this.incnum = await this.load();
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
const elementName = 'snow-control';
customElements.define(elementName, snowControl);
