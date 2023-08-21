import { html, LitElement, css } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export class StarsPlugin extends LitElement {
  static properties = {
    num1: { type: Number },
    num2: { type: Number },
    outcome: { type: Number },
  };
  static styles = css`
        *{
            margin: 0;
            padding: 0;
        }
        .rate {
            float: left;
            height: 46px;
            padding: 0 10px;
        }
        .rate:not(:checked) > input {
            position:absolute;
            top:-9999px;
        }
        .rate:not(:checked) > label {
            float:right;
            width:1em;
            overflow:hidden;
            white-space:nowrap;
            cursor:pointer;
            font-size:30px;
            color:#ccc;
        }
        .rate:not(:checked) > label:before {
            content: 'â˜… ';
        }
        .rate > input:checked ~ label {
            color: #ffc700;    
        }
        .rate:not(:checked) > label:hover,
        .rate:not(:checked) > label:hover ~ label {
            color: #deb217;  
        }
        .rate > input:checked + label:hover,
        .rate > input:checked + label:hover ~ label,
        .rate > input:checked ~ label:hover,
        .rate > input:checked ~ label:hover ~ label,
        .rate > label:hover ~ input:checked ~ label {
            color: #c59b08;
        }
        /* Modified from: https://github.com/mukulkant/Star-rating-using-pure-css */        
  `;
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
        outcome: {
          title: 'Sum',
          type: 'integer',
          description: 'Sum of Number 1 and Number 2',
          isValueField: true,
        },
      },
      events: ['ntx-value-change'],
    };
  }

  _handleInputChange() {
    const num1 = this.num1 || 0;
    const num2 = this.num2 || 0;
    const sum = num1 + num2;

    this.outcome = sum;
  }

  render() {
    return html`
      <input
        type="number"
        placeholder="Calculated Sum"
        .value=${this.outcome}
        @input=${this._handleInputChange}
      />
    `;
  }
}

const elementName = 'sum-calculator';
customElements.define(elementName, StarsPlugin);
