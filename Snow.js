import {css, html, LitElement, styleMap, until} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
// define the component
export class snowControl extends LitElement {
  
  static styles = css`
    .selcls {
      padding: 9px;
      border: solid 5px #c9302c;
      outline: 0;
      background: -webkit-gradient(
        linear,
        left top,
        left 25,
        from(#ffffff),
        color-stop(4%, #e78f8d),
        to(#ffffff)
      );
      background: -moz-linear-gradient(
        top,
        #ffffff,
        #e78f8d 1px,
        #ffffff 25px
      );
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
      -moz-box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
      -webkit-box-shadow: rgba(0, 0, 0, 0.1) 0px 0px 8px;
      border-radius: 13px;
      width: 150px;
    }
  `;
  
  
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
    const dropdownOptions = this.incnum.map(
      (number) => html`<option class="selcls" value="${number}">${number}</option>`
    );

    return html`
      <label for="numberDropdown">Select a Number:</label>
      <select id="numberDropdown" @change="${this.handleDropdownChange}">
        ${dropdownOptions}
      </select>
      <label for="selectedValue">Selected Value:</label>
      <input id="selectedValue" type="text" .value="${this.selectedOption}" readonly />
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
