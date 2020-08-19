import { Firestore } from '@google-cloud/firestore';

export const FirestoreClient = (): Firestore => new Firestore({
  projectId: 'default-firestore-project',
});

export default FirestoreClient;
