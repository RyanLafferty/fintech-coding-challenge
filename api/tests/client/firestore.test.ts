import { Firestore } from '@google-cloud/firestore';
import FirestoreClient from 'src/client/firestore';

describe('FirestoreClient', () => {
  it('returns firestore client', () => {
    expect(new FirestoreClient).toBeInstanceOf(Firestore);
  });
});
