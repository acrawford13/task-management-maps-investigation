import ApiModule from './ApiModule';

class DataApi extends ApiModule {
  static apiInstance(uuid, locale) {
    if (this.instance) return this.instance;
    this.instance = new DataApi(uuid, locale);
    return this.instance;
  }

  finishForm() {
    return this.put('/finish');
  }

  getAll() {
    return this.get();
  }

  updateField(field) {
    return this.put('', field);
  }

  updateSpecialField(route, fields) {
    return this.post(route, fields);
  }
}

export default DataApi;
