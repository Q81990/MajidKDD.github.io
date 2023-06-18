import { html, css, LitElement } from 'https://cdn.jsdelivr.net/gh/lit/dist@2/all/lit-all.min.js';
export class GalleryWeatherWidget extends LitElement {
  static styles = css`
    .weather-card {
      max-width: 20rem;
      color: white;
      background-color: #007bff;
      margin-bottom: 1rem;
      padding: 1rem;
      border-radius: 0.25rem;
      text-align: center;
      font-family: Arial, sans-serif;
    }
    .weather-header {
      font-size: 1.5rem;
      margin-bottom: 1rem;
    }
    .weather-icon {
      max-width: 50px;
      margin-bottom: 1rem;
    }
    .weather-data {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }
  `;
  static properties = {
    city: { type: String },
    period: { type: String },
    unit: { type: String },
    weatherData: { type: Object },
    apiKey: { type: String },
    formVariable: { type: String },
  };
  static getMetaConfig() {
    return {
      controlName: 'Weather Widget',
      version: '1.0',
      fallbackDisableSubmit: false,
      pluginAuthor: 'Dan Stoll',
      pluginVersion: '1.0.0',
      description: 'A custom weather widget for Nintex Forms',
      iconUrl: 'https://formplugins.blob.core.windows.net/plugin/669958_weather_cloud_forecast_sun_icon.svg',
      groupName: 'Nintex Gallery',
      searchTerms: ['weather', 'widget'],
      properties: {
        city: {
          type: 'string',
          title: 'City',
          description: 'The city to display the weather for'
        },
        period: {
          title: 'Period',
          type: 'string',
          description: 'The period of time to display the weather for',
          enum: ['Today', '5 days', '30 days'],
          showAsRadio: false,
          verticalLayout: false,
          defaultValue: 'Today',
        },
        unit: {
          title: 'Unit',
          type: 'string',
          description: 'The temperature unit',
          enum: ['Celsius', 'Fahrenheit'],
          showAsRadio: true,
          verticalLayout: false,
          defaultValue: 'Celsius',
        },
        apiKey: {
          type: 'string',
          title: 'API Key',
          description: 'Your OpenWeather API key'
        },
        formVariable: {
          type: 'string',
          title: 'Form Variable',
          description: 'The form variable to store the value to'
        },
      },
    };
  }
  constructor() {
    super();
    this.city = '';
    this.period = 'Today';
    this.unit = 'Celsius';
    this.weatherData = {};
    this.apiKey = '';
    this.formVariable = '';
  }
  render() {
    return html`
      <div class="weather-card">
        <div class="weather-header">${this.city}</div>
        <img class="weather-icon" src=${this.getWeatherIconUrl()} alt="Weather icon">
        <div class="weather-data">${this.weatherData.temperature}°${this.unit === 'Celsius' ? 'C' : 'F'}, ${this.weatherData.condition}</div>
      </div>
    `;
  }
  getWeatherIconUrl() {
    if (this.weatherData && this.weatherData.icon) {
      return `http://openweathermap.org/img/w/${this.weatherData.icon}.png`;
    }
    return '';
  }
  async connectedCallback() {
    super.connectedCallback();
    await this.fetchWeather();
  }
  async fetchWeather() {
    let url;
    const units = this.unit === 'Celsius' ? 'metric' : 'imperial';
    switch (this.period) {
      case 'Today':
        url = `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}&units=${units}`;
        break;
      case '5 days':
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${this.apiKey}&units=${units}&cnt=5`;
        break;
      case '30 days':
        url = `https://api.openweathermap.org/data/2.5/forecast?q=${this.city}&appid=${this.apiKey}&units=${units}&cnt=30`;
        break;
    }
    const response = await fetch(url);
    const data = await response.json();
    this.weatherData = {
      temperature: data.main.temp,
      condition: data.weather[0].main,
      icon: data.weather[0].icon,
    };
    this.setFormVariableValue(this.weatherData);
  }
  setFormVariableValue(value) {
    if (window.NWF && window.NWF.FormFiller && window.NWF.FormFiller.Functions) {
      const runtime = window.NWF.FormFiller.Functions.getRuntime();
      if (runtime) {
        const storeValueAction = {
          targetVariable: this.formVariable,
          value: JSON.stringify(value)
        };
        runtime.execute('storeValue', storeValueAction);
      }
    }
  }
}
customElements.define('gallery-weather-widget', GalleryWeatherWidget);
