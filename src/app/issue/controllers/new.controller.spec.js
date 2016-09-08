import app from '../../app';
describe('NewIssueCtrl', () => {
  let ctrl;
  let httpBackend;
  let issueTypes = {
    "issue_types": [{
      "id": 1,
      "name": "telefone"
    }, {
      "id": 2,
      "name": "chat"
    }, {
      "id": 3,
      "name": "email"
    }]
  };
  let issueReasons = {
    "issue_reasons": [{
      "id": 1,
      "name": "dúvidas"
    }, {
      "id": 2,
      "name": "reclamações"
    }, {
      "id": 3,
      "name": "elogios"
    }]
  };
  let states = {
    "states": [{
      "id": 1,
      "abbreviation": "RJ",
      "name": "Rio de Janeiro"
    }]
  };

  beforeEach(() => {
    angular.mock.module(app);
    angular.mock.inject(($controller, $httpBackend) => {
      ctrl = $controller('NewIssueCtrl', {});
      httpBackend = $httpBackend;
    });

    httpBackend.when('GET', 'http://localhost:3000/issue_types').respond(200, issueTypes);
    httpBackend.when('GET', 'http://localhost:3000/issue_reasons').respond(200, issueReasons);
    httpBackend.when('GET', 'http://localhost:3000/states').respond(200, states);

  });

  afterEach(function() {
    httpBackend.verifyNoOutstandingExpectation();
    httpBackend.verifyNoOutstandingRequest();
  });

  describe('#init', () => {
    it('load issue types, reasons and states', () => {
      httpBackend.flush();
      expect(ctrl.issueTypes).toEqual(issueTypes['issue_types']);
      expect(ctrl.issueReasons).toEqual(issueReasons['issue_reasons']);
      expect(ctrl.states).toEqual(states['states']);
    });
  });

  describe('#closeSuccess', () => {
    it('should close success messages', () => {
      httpBackend.flush();
      ctrl.success = 'Mensagem de sucesso';
      ctrl.closeSuccess();
      expect(ctrl.success).toEqual(null);
    });
  });
  describe('#closeErrors', () => {
    it('should close error messages', () => {
      httpBackend.flush();
      ctrl.errors = ['erro1', 'erro2'];
      ctrl.closeErrors();
      expect(ctrl.errors).toEqual(null);
    });
  });
  describe('#clear', () => {
    it('should clear all inputs', () => {
      httpBackend.flush();
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
      it('should return false', () => {
        httpBackend.flush();
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
    it('should return true', () => {
      httpBackend.flush();
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
        httpBackend.when('POST', 'http://localhost:3000/issues').respond(422, {
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
      httpBackend.when('POST', 'http://localhost:3000/issues').respond(200, {
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
      httpBackend.when('GET', 'http://localhost:3000/customers?by_id_or_name_or_email_or_phone=Raissa')
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
