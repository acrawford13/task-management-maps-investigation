export function createFormData(options) {
  const data = new FormData();
  Object.keys(options).forEach(key => data.append(key, options[key]));
  return data;
}

export default class API {
  constructor(uuid, locale) {
    this.baseURL = `${process.env.REACT_APP_BASE_API_URL}/${locale}${process.env.REACT_APP_PROJECT_API_URL}/${uuid}`;
  }

  get(url = '', options = {}) {
    return this._request(url, this._options({ method: 'GET', ...options }));
  }

  post(url = '', data = {}, options = {}) {
    return this._request(url, this._options({ method: 'POST', data, ...options }));
  }

  put(url = '', data = {}, options = {}) {
    return this._request(url, this._options({ method: 'PUT', data, ...options }));
  }

  delete(url, ids) {
    return [].concat(ids).map(id => this._request(`${url}/${id}`, this._options({ method: 'DELETE' })));
  }

  _options({ method, data, headers = {}, ...options }) {
    switch (method) {
      case 'PUT':
      case 'POST':
        return {
          method: method,
          body: this._body(data, { headers, ...options }),
          headers: this._headers(headers),
          ...options,
        };
      default:
        return { ...options, method, headers };
    }
  }

  _headers({ contentType, ...headers }) {
    if (!contentType) headers['content-type'] = 'application/json';
    return headers;
  }

  _body(data, { headers, ...options }) {
    switch (headers.contentType) {
      case 'form-data': {
        return createFormData({ file: data, ...options });
      }
      default:
        return JSON.stringify(data);
    }
  }

  _request(url, options) {
    return fetch(`${this.baseURL}${url}`, options)
      .then(res => {
        if (!res.ok) {
          const error = new Error(res.statusText);
          error.status = res.status;
          throw error;
        }
        return res.json();
      })
      .catch(error => {
        window.Rollbar.error(`API ${error.stack}
          url: "${this.baseURL}${url}"
          options: ${JSON.stringify(options)}`);
        throw error;
      });
  }
}
