import app from './app';
export default {
  app: app,
  fullURL: function fullURL(path, params={}) {
    let baseURL = process.env.API_URL;
    return baseURL + path
  }
}
