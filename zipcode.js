import { html, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

export  class WeatherComponent extends LitElement {
 
   static properties = {
    zipcode: {type: String} 
  };
 


  async connectedCallback() {
    super.connectedCallback();
    await this.fetchWeatherData();
  }

  async fetchWeatherData() {
    try {
      const response = await fetch('https://api.zippopotam.us/us/90210'); // Replace with the actual API endpoint
      const data = await response.json();
      this.weatherData = data;
      this.requestUpdate();
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
  constructor() {
    super();
    this.weatherData = null;
  }
  render() {
    if (!this.weatherData) {
      return html`<p>Loading weather data...</p>`;
    }

    const { country } = this.weatherData;
    return html`
      <div>
        <h2>Current Weather</h2>        
        <p>Description: ${description}</p>
      </div>
    `;
  }
}

// registering the web component
const elementName = 'Zip-Code';
customElements.define(elementName, WeatherComponent);

