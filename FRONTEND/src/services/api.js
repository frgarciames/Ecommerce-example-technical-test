import BackendError from './BackendError';
import deepCopy from '../helpers/deepCopy';

const buildFilesFormData = files => {
  const formData = new FormData();
  const { length } = files;
  for (let i = 0; i < length; i += 1) {
    formData.append('file', files[i], files[i].name);
  }
  return formData;
};

const NETWORK_ERROR = new BackendError({}, { message: 'generalModalErrorNetwork', type: 'UNRECOVERABLE' });

function replacer(key, value) {
  if (typeof value === 'string') {
    return value || null;
  }
  return value;
}

export default class Api {
  constructor(options = { baseUrl: '', defaultOptions: {} }) {
    this.baseUrl = options.baseUrl;
    this.defaultOptions = {
      credentials: 'same-origin',
      ...options.defaultOptions
    };
    this.defaultOptions.headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...options.defaultOptions.headers
    };
  }

  getUrl(originalUrl) {
    const url = `${this.baseUrl}${originalUrl}`;
    return url.replace('//', '/');
  }

  fetch(url, options) {
    return fetch(url, options)
      .catch(() => {
        throw NETWORK_ERROR;
      })
      .then(this.parseBody)
      .then(this.checkStatus.bind(this, url, options));
  }

  parseBody(response) {
    const contentType = response.headers.get('Content-Type');
    let parsePromise;

    if (/json/.test(contentType)) {
      parsePromise = response.json();
    } else if (/multipart/.test(contentType)) {
      parsePromise = response.formData();
    } else if (/pdf|xml/.test(contentType)) {
      parsePromise = response.blob();
    } else {
      parsePromise = response.text();
    }

    return parsePromise.then(parsedBody => ({ response, parsedBody }));
  }

  checkStatus(url, originalOptions, { response, parsedBody }) {
    if (response.ok) {
      return parsedBody;
    }
    // eslint-disable-next-line default-case
    switch (response.status) {
      case 401:
      case 403:
        //window.location.href = '/login';
        break;
    }
    throw new BackendError(response, parsedBody);
  }

  // Request
  genericRequest(method, originalUrl, options) {
    options.completePath = true;
    const url = options.completePath === true ? originalUrl : this.getUrl(originalUrl);
    const opt = { ...deepCopy(this.defaultOptions), ...options, method };
    opt.headers = { ...this.defaultOptions.headers, ...options.headers };

    if (options && options.body instanceof FormData) {
      delete opt.headers['Content-Type'];
    }

    if (opt.headers['Content-Type'] === 'application/json') {
      opt.body = JSON.stringify(opt.body, replacer);
    }

    return this.fetch(url, opt);
  }

  get(originalUrl, options = {}) {
    return this.genericRequest('get', originalUrl, {
      ...options,
      headers: { ...options.headers }
    });
  }

  post(originalUrl, options = {}) {
    return this.genericRequest('post', originalUrl, options);
  }

  put(originalUrl, options = {}) {
    return this.genericRequest('put', originalUrl, options);
  }

  patch(originalUrl, options = {}) {
    return this.genericRequest('PATCH', originalUrl, options);
  }

  delete(originalUrl, options = {}) {
    // eslint-disable-next-line no-param-reassign
    options.headers = options.headers || {};
    // eslint-disable-next-line no-param-reassign
    options.headers.Accept = options.headers.Accept || '*';
    return this.genericRequest('delete', originalUrl, options);
  }

  uploadFiles(url, files) {
    return this.post(url, {
      body: buildFilesFormData(files)
    });
  }
}
