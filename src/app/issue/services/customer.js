const API_URL = "http://localhost:3000";

export default class Customer {
  constructor($http) {
    this._$http = $http;
  }
  fetch(text) {
    return this._$http({
      method: "get",
      url: API_URL + "/customers",
      params: {by_id_or_name_or_email_or_phone: text}
    }).then((customers) => {
      return customers.data.customers.map((item, index) => {
        let description = item.id +  " - " + item.name +  " - " + item.email + " - " + item.phone
        item.description = description;
        return item
      });
  });
  };
};
