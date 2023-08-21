import { html, LitElement, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class StarsPlugin extends LitElement {
  static properties = {
    num1: { type: Number },
    num2: { type: Number },
  };

  static getMetaConfig() {
    return {
      controlName: 'Number Addition',
      fallbackDisableSubmit: false,
      groupName: 'Calculator',
      version: '1.0',
      properties: {
        num1: {
          title: 'Number 1',
          type: 'integer',
          description: 'Enter the first number',
          isValueField: true,
        },
        num2: {
          title: 'Number 2',
          type: 'integer',
          description: 'Enter the second number',
          isValueField: true,
        },
      },
      events: [],
    };
  }

  render() {
    const sum = (this.num1 || 0) + (this.num2 || 0);

    return html`
      <input
        type="number"
        placeholder="Calculated Sum"
        .value=${sum}
      />
    `;
  }
}

const elementName = 'sum-calculator';
customElements.define(elementName, StarsPlugin);
