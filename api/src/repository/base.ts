import FirestoreClient from 'src/client/firestore';
import { Firestore, CollectionReference } from '@google-cloud/firestore';

export class Base {
  private client!: Firestore;
  protected collection!: CollectionReference;

  constructor(collection: string) {
    this.client = FirestoreClient();
    this.collection = this.client.collection(collection);
  }
}

export default Base;
