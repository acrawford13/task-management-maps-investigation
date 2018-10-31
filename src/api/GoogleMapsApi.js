import ApiModule from './ApiModule';

class GoogleMapsAPI extends ApiModule {
  static apiInstance() {
    if (this.instance) return this.instance;
    this.instance = new GoogleMapsAPI();
    this.instance.baseURL = 'https://maps.googleapis.com/maps/api';
    return this.instance;
  }

  getDirections() {
    return this.get('/directions/json?mode=transit&origin=Canberra&destination=Sydney');
  }
}

export default GoogleMapsAPI;
