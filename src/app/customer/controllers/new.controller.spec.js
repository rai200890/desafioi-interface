import testHelper from "../../helper.spec"
describe('NewCustomerCtrl', () => {
  let ctrl;
  let httpBackend;

  beforeEach(() => {
    angular.mock.module(testHelper.app);
    angular.mock.inject(($controller, $httpBackend) => {
      ctrl = $controller('NewCustomerCtrl', {});
      httpBackend = $httpBackend;
    });
  });

  afterEach(() => {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('#closeSuccess', () => {
    it('should close success messages', () => {
      ctrl.success = 'Mensagem de sucesso';
      ctrl.closeSuccess();
      expect(ctrl.success).toEqual(null);
    });
  });
  describe('#closeErrors', () => {
    it('should close error messages', () => {
      ctrl.errors = ['erro1', 'erro2'];
      ctrl.closeErrors();
      expect(ctrl.errors).toEqual(null);
    });
  });
  describe('#clear', () => {
    it('should clear all inputs', () => {
      ctrl.customer = {
        "name": "Raissa Ferreira",
        "email": "rai200890@gmail.com",
        "phone": "22222222",
        "id_card_code": "1243456789"
      }
      ctrl.clear();
      expect(ctrl.customer).toEqual({});
    });
  });

  describe('#validate', () => {
    describe('invalid params', () => {
      it('should return false', () => {
        ctrl.customer = {
          "name": "Raissa Ferreira",
          "phone": "22222222",
          "id_card_code": "1243456789"
        };
        expect(ctrl.validate()).toEqual(false);
      });
    });
  });
  describe('valid params', () => {
    it('should return true', () => {
      ctrl.customer = {
        "name": "Raissa Ferreira",
        "email": "rai200890@gmail.com",
        "phone": "22222222",
        "id_card_code": "1243456789"
      };
      expect(ctrl.validate()).toEqual(true);
    });
  });

  describe('#save', () => {
    describe('invalid params', () => {
      it('should return errors', () => {
        httpBackend.when('POST', testHelper.fullURL('/customers')).respond(422, {
          "errors": ["Nome não pode ficar em branco"]
        });
        ctrl.customer = {
          "email": "rai200890@gmail.com",
          "phone": "22222222",
          "id_card_code": "1243456789"
        };
        ctrl.save();
        httpBackend.flush();
        expect(ctrl.errors).toEqual(['Nome não pode ficar em branco']);
      });
    });
  });
  describe('valid params', () => {
    it('should return success', () => {
      httpBackend.when('POST', testHelper.fullURL('/customers')).respond(200, {
        "customer": {
          "id": 1,
          "name": "Raissa Ferreira",
          "email": "rai200890@gmail.com",
          "phone": "22222222",
          "id_card_code": "1243456789"
        }
      });
      ctrl.save();
      httpBackend.flush();
      expect(ctrl.success).toEqual('Cliente com ID 1 cadastrado com sucesso!');
    });
  });
});
