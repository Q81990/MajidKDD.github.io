import { html,LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
export class WebIndex extends LitElement {

static get properties() {
   return {
     data: Object
   }
}
    connectedCallback() {
        super.connectedCallback();
        this.fetchData();

    }

    fetchData() {
        fetch('https://api.zippopotam.us/us/90210')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                };
                response.json();
            })
            .then(data => {
                this.data = data;
                console.log('Success:', data);
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    }

    render() {
        if (!this.data) {
            return html`
                <h4>Loading...</h4>
            `;
        }
        return html`
            <h4>Done</h4>
        `;
    }

}

customElements.define('web-index', WebIndex);
