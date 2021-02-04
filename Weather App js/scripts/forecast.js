class Forecast {
    constructor() {
        this.key = `2JjcWrUUGSObuRsUDcjfkGqmLRz7djP9`;
        this.unsplashKey = `X0L66na9jHlcTJwbG3KuT1On6soLEvtQ3PtkepTUtLc`;
        this.cityURI = `http://dataservice.accuweather.com/locations/v1/cities/search`;
        this.weatherURI = `http://dataservice.accuweather.com/currentconditions/v1/`;
        this.backgroundURI = `https://api.unsplash.com/search/photos`;
    }
    async updateCity(city) {
        const cityDet = await this.getCity(city);
        const weather = await this.getWeather(cityDet.Key);
        const wall = await this.getBackground(cityDet.EnglishName);
        return { cityDet, weather, wall };
    }
    async getCity(city) {
        const query = `?apikey=${this.key}&q=${city}`;
        const response = await fetch(this.cityURI+query);
        const data = await response.json();
        return data[0];
    }
    async getWeather(id) {
        const query = `${id}?apikey=${this.key}`;
        const response = await fetch(this.weatherURI+query);
        const data = await response.json();
        return data[0];
    }
    async getBackground(city) {
        const cityStreet = `${city}`;
        const query = `?client_id=${this.unsplashKey}&page=1&query=${cityStreet}&orientation=landscape`;
        const response = await fetch(this.backgroundURI+query);
        const data = await response.json();
        return [data.results[0], response.status];
    }
}

