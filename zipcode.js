import { html, LitElement} from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';

class WeatherComponent extends LitElement {
 

  constructor() {
    super();
    this.weatherData = null;
  }

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

  render() {
    if (!this.weatherData) {
      return html`<p>Loading weather data...</p>`;
    }

    const { temperature, description } = this.weatherData;
    return html`
      <div>
        <h2>Current Weather</h2>
        <p>Temperature: ${temperature}°C</p>
        <p>Description: ${description}</p>
      </div>
    `;
  }
}

customElements.define('weather-component', WeatherComponent);
