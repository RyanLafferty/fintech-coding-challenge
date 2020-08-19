import { Firestore } from '@google-cloud/firestore';
import RepositoryBase from 'src/repository/base';

class MockRepository extends RepositoryBase {
  constructor() {
    super('mocks');
  }
}

describe('Repository Base', () => {
  let repository;

  beforeEach(() => {
    repository = new MockRepository();
  });

  it('creates a firestore client', () => {
    expect(repository.client).toBeInstanceOf(Firestore);
  });

  it('creates a mocks collection reference', () => {
    expect(repository.collection._queryOptions.collectionId).toEqual('mocks');
  });
});
