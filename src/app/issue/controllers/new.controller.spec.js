import testHelper from "../helper.spec"
import issueTypes from 'json!../fixtures/issue_types.json';
import issueReasons from 'json!../fixtures/issue_reasons.json';
import states from 'json!../fixtures/states.json';

describe('NewIssueCtrl', () => {
  let ctrl;
  let httpBackend;

  beforeEach(() => {
    angular.mock.module(testHelper.app);
    angular.mock.inject(($controller, $httpBackend) => {
      ctrl = $controller('NewIssueCtrl', {});
      httpBackend = $httpBackend;
    });

    httpBackend.when('GET', testHelper.fullURL('/issue_types')).respond(200, issueTypes);
    httpBackend.when('GET', testHelper.fullURL('/issue_reasons')).respond(200, issueReasons);
    httpBackend.when('GET', testHelper.fullURL('/states')).respond(200, states);
  });

  afterEach(() => {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('#init', () => {
    beforeEach(() => {
      httpBackend.flush();
    });
    it('load issue types, reasons and states', () => {
      expect(ctrl.issueTypes).toEqual(issueTypes.issue_types);
      expect(ctrl.issueReasons).toEqual(issueReasons.issue_reasons);
      expect(ctrl.states).toEqual(states.states);
    });
  });

  describe('#closeSuccess', () => {
    beforeEach(() => {
      httpBackend.flush();
    });
    it('should close success messages', () => {
      ctrl.success = 'Mensagem de sucesso';
      ctrl.closeSuccess();
      expect(ctrl.success).toEqual(null);
    });
  });
  describe('#closeErrors', () => {
    beforeEach(() => {
      httpBackend.flush();
    });
    it('should close error messages', () => {
      ctrl.errors = ['erro1', 'erro2'];
      ctrl.closeErrors();
      expect(ctrl.errors).toEqual(null);
    });
  });
  describe('#clear', () => {
    beforeEach(() => {
      httpBackend.flush();
    });
    it('should clear all inputs', () => {
      ctrl.issue = {
        "state_id": 1,
        "issue_type_id": 1,
        "issue_reason_id": 1,
        "body": "reclamação"
      };
      ctrl.customer = {
        "id": 1,
        "name": "Raissa Ferreira",
        "email": "rai200890@gmail.com",
        "phone": "22222222",
        "id_card_code": "1243456789"
      }
      ctrl.clear();
      expect(ctrl.customer).toEqual(null);
      expect(ctrl.issue).toEqual({});
    });
  });

  describe('#validate', () => {
    describe('invalid params', () => {
      beforeEach(() => {
        httpBackend.flush();
      });
      it('should return false', () => {
        ctrl.issue = {
          "state_id": 1,
          "body": "reclamação"
        };
        ctrl.customer = {
          "id": 1,
          "name": "Raissa Ferreira",
          "email": "rai200890@gmail.com",
          "phone": "22222222",
          "id_card_code": "1243456789"
        };
        expect(ctrl.validate()).toEqual(false);
      });
    });
  });
  describe('valid params', () => {
    beforeEach(() => {
      httpBackend.flush();
    });
    it('should return true', () => {
      ctrl.issue = {
        "state_id": 1,
        "issue_type_id": 1,
        "issue_reason_id": 1,
        "body": "reclamação"
      };
      ctrl.customer = {
        "id": 1,
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
        httpBackend.when('POST', testHelper.fullURL('/issues')).respond(422, {
          "errors": ["Tipo de Atendimento não pode ficar em branco"]
        });
        ctrl.issue = {
          "state_id": 1,
          "issue_type_id": 1,
          "body": "reclamação"
        };
        ctrl.customer = {
          "id": 1,
          "name": "Raissa Ferreira",
          "email": "rai200890@gmail.com",
          "phone": "22222222",
          "id_card_code": "1243456789"
        };
        ctrl.save();
        httpBackend.flush();
        expect(ctrl.errors).toEqual(['Tipo de Atendimento não pode ficar em branco']);
      });
    });
  });
  describe('valid params', () => {
    it('should return success', () => {
      httpBackend.when('POST', testHelper.fullURL('/issues')).respond(200, {
        "issue": {
          "id": 1
        }
      });
      ctrl.issue = {
        "state_id": 1,
        "issue_type_id": 1,
        "issue_reason_id": 1,
        "body": "reclamação"
      };
      ctrl.customer = {
        "id": 1,
        "name": "Raissa Ferreira",
        "email": "rai200890@gmail.com",
        "phone": "22222222",
        "id_card_code": "1243456789"
      };
      ctrl.save();
      httpBackend.flush();
      expect(ctrl.success).toEqual('Atendimento nº 1 registrado com sucesso!');
    });
  });

  describe('#getCustomers', () => {
    it('should return customer by text', () => {
      httpBackend.when('GET', testHelper.fullURL('/customers?by_id_or_name_or_email_or_phone=Raissa'))
        .respond(200, {
          "customers": [{
            "id": 1,
            "name": "Raissa Ferreira",
            "email": "rai200890@gmail.com",
            "phone": "22222222",
            "id_card_code": "1243456789"
          }]
        });
      let result = ctrl.getCustomers('Raissa');
      httpBackend.flush();

      result.then((response) => {
        expect(response).toEqual([{
          id: 1,
          name: 'Raissa Ferreira',
          email: 'rai200890@gmail.com',
          phone: '22222222',
          id_card_code: '1243456789',
          description: '1 - Raissa Ferreira - rai200890@gmail.com - 22222222'
        }]);
      });
    });
  });
});
