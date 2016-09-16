export default class NewCustomerCtrl {
  constructor(Customer) {
    this._Customer = Customer;
    this.customer = {};
    this.errors = null;
    this.success = null;
  }

  closeErrors() {
    this.errors = null;
  }

  closeSuccess() {
    this.success = null;
  }

  clear() {
    this.customer = {};
  }

  validate() {
    let fields = ['name', 'email', 'phone', 'id_card_code'];
    let customer = this.customer;
    return fields.reduce((result, field, index, array) => {
      return result && customer[field] !== '' && customer[field] !== undefined && customer[field] !== null;
    });
  }

  save() {
    let ctrl = this;
    this._Customer.create({
      customer: ctrl.customer
    }).success((response) => {
      ctrl.success = `Cliente com ID ${response.customer.id} cadastrado com sucesso!`;
      ctrl.errors = null;
    }).error((response, status_code) => {
      ctrl.success = null;
      ctrl.errors = response.errors;
    });
  }
}

NewCustomerCtrl.$inject = ['Customer'];
