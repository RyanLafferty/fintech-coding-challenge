import ModelBase from 'src/model/base';

class MockModel extends ModelBase {
  constructor() {
    super('models');
  }
}

describe('Model Base', () => {
  describe('when save is not overridden', () => {
    it('throws error', () => {
      expect(() => { new MockModel().save() }).toThrow('Save not implemented');
    });
  });
});
