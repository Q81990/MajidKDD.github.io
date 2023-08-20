import { css, html, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class snowControl extends LitElement {

  static styles = css`
    .selcls {
      background: #A0CFCF;
      height: 75px;
      width: 250px;
      border: solid 8px #517B97;
      border-radius: 33px;
      padding: 20px;
      color: #fff;
    }
.expandable_input{
    min-width: 100px;
    
   border: 2px solid #ddd;
   
   margin: 1px 1px 2px 10px;
}
  `;

  static properties = {
    incnum: { type: Array },
    callerid: { type: String },
    selectedOption: { type: String }
  };

  static getMetaConfig() {
    return {
      controlName: 'SNow Control',
      fallbackDisableSubmit: false,
      version: '1.2',
      properties: {
        incnum: {
          type: 'string',
          title: 'IncidentNumber',
          description: 'Type the Incident number here'
        }
      }
    };
  }

  async load() {
    const snowvar = 'https://dev160993.service-now.com/api/now/table/incident?sysparm_fields=number,short_description&caller_id=' + this.callerid;
    const response = await fetch(snowvar, { method: "GET", headers: { "Authorization": "Basic YWRtaW46dmJKYWRASCpUNlc5" } });
    if (response.ok) {
      const myJson = await response.json();
      const result = myJson.result;
      return result;
    } else {
      return [];
    }
  }

  constructor() {
    super();
    this.incnum = [];
    this.selectedOption = "";
  }

  async connectedCallback() {
    super.connectedCallback();
    this.callerid = 'David.Miller';
    this.incnum = await this.load();
  }

  render() {
    const dropdownOptions = this.incnum.map(
      (item) => html`
        <option class="selcls" value="${item.short_description}">${item.number}</option>
      `
    );

    return html`
      <label for="numberDropdown">Select a Number:</label>
      <select id="numberDropdown" @change="${this.handleDropdownChange}">
        ${dropdownOptions}
      </select>
      <label for="selectedValue">Selected Value:</label>
      <input
        id="selectedValue"
        type="text"
        .value="${this.selectedOption}"
        @input="${this.handleInput}"
        class="expandable_input"
      />
    `;
  }

  handleDropdownChange(event) {
    const selectedValue = event.target.value;
    this.selectedOption = selectedValue;
    const selectedValueInput = this.shadowRoot.querySelector("#selectedValue");
    selectedValueInput.style.width = (selectedValue.length + 1) + "ch";
  }

  handleInput(event) {
    const inputElement = event.target;
    this.selectedOption = inputElement.value;
    inputElement.style.width = (inputElement.value.length + 1) + "ch";
    expandElementHeight(inputElement);
  }
}

function expandElementHeight(element) {
  element.style.height = "auto";
  element.style.height = element.scrollHeight + "px";
}

const elementName = 'snow-control';
customElements.define(elementName, snowControl);
