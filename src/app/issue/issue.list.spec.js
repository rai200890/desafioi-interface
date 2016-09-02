import app from '../app';

describe('app', () => {

  describe('IssuesCtrl', () => {
    let ctrl;

    beforeEach(() => {
      angular.mock.module(app);

      angular.mock.inject(($controller) => {
        ctrl = $controller('IssuesCtrl', {});
      });
    });

    it('should contain a list of issues', () => {
      expect(ctrl.issues).toEqual([]);
    });
  });
});
