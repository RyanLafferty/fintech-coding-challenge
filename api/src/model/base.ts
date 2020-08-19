import { v4 as uuidv4 } from 'uuid';
import { Firestore, CollectionReference } from '@google-cloud/firestore';
import FirestoreClient from 'src/client/firestore';
/* TODO
  If given more time, I could have also implemented a dirty flag which would determine
  whether or not we should save the model.
*/

export class Base {
  private client!: Firestore;
  protected collection!: CollectionReference;
  document_id: string;
  created_at: Date;
  updated_at: Date;

  constructor(collection: string, document_id?: string) {
    const currentTime = new Date();
    this.client = FirestoreClient();
    this.collection = this.client.collection(collection);
    
    this.created_at = currentTime;
    this.updated_at = currentTime;
    if (document_id != null) {
      this.document_id = document_id;
    } else {
      this.document_id = uuidv4();
    }
  }

  save = (): void => {
    throw new Error('Save not implemented');
  }
}

export default Base;
