import ServiceBase from 'src/service/base';

class MockService extends ServiceBase {}

describe('Service Base', () => {
  describe('when call is not overridden', () => {
    it('throws error', () => {
      expect(() => { new MockService().call() }).toThrow('Call not implemented');
    });
  });
});
