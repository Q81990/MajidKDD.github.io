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
   border: 2px solid #ddd;   
 }
  `;

  static properties = {
    incnum: { type: Array },
    callerid: { type: String },
    selectedOption: { type: String },
    outcome: { type: String }  // Change outcome type to String
  };

  static getMetaConfig() {
    return {
      controlName: 'SNow ControlzSa',
      fallbackDisableSubmit: false,
      version: '1.2',
      groupName: 'ServiceNow122',
      properties: {
        incnum: {
          type: 'string',
          title: 'IncidentNumber',
          description: 'Type the Incident number here'
        },
                callerid: {
          type: 'string',
          title: 'CallerID',
          description: 'Type the Caller ID here'
        },
        selectedOptionval: {
          type: 'string',
          title: 'Selected Option',
          description: 'Outcome of the selected dropdown option',
          isValueField: true
        },        
      },
      events: ["ntx-value-change"],
    };
  }

  async load() {
    const snowvar = 'https://dev160993.service-now.com/api/now/table/incident?sysparm_fields=number,short_description&caller_id=' + ${this.videosrc};
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
    this.callerid = "";
    this.selectedOption = "";
    this.incnum = await this.load();
  }

  render() {
    const dropdownOptions = this.incnum.map(
      (item) => html`
        <option class="selcls" value="${item.short_description}">${item.number}</option>
      `
    );

    return html`
      <label for="numberDropdown">Select a Task Number:</label>
      <select id="numberDropdown" @change="${this.handleDropdownChange}">
        ${dropdownOptions}
      </select>
      <label for="selectedValue">Task Description:</label>
      <input
        id="selectedValue"
        type="text"
        .value="${this.selectedOption}"
        @input="${this.handleInput}"
        class="expandable_input"
      />
      <input
        id="optiontext"
        type="text"       
      />
    `;
  }


   handleDropdownChange(event) {
    const selectedValue = event.target.value;
    this.selectedOption = selectedValue;
    const selectedValueInput = this.shadowRoot.querySelector("#selectedValue");
    selectedValueInput.style.width = (selectedValue.length + 1) + "ch";

  const OptionElement = event.target.selectedOptions[0]; // Get the selected option element  
  const selectedtext = OptionElement.textContent   
  const optionTextInput = this.shadowRoot.querySelector("#optiontext");
  optionTextInput.value = selectedtext;
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
