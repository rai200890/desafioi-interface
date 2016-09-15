export default class Customer {
  constructor($http, API_URL) {
    this._$http = $http;
    this._API_URL = API_URL;
  }
  fetch(text) {
    return this._$http({
      method: "get",
      url: this._API_URL + "/customers",
      params: {by_id_or_name_or_email_or_phone: text}
    }).then((customers) => {
      return customers.data.customers.map((item, index) => {
        let description = item.id +  " - " + item.name +  " - " + item.email + " - " + item.phone
        item.description = description;
        return item
      });
  });
  }
  create(params) {
    return this._$http.post(this._API_URL + "/customers", params);
  }
}

Customer.$inject = ['$http', 'API_URL'];
