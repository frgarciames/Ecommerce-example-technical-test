export default class BackendError extends Error {
  constructor(response, parsedBody) {
    super(response.statusText)
    this.name = 'BackendError'
    this.response = response
    this.parsedBody = parsedBody

    this.isBackendError = true
  }
}
