export class Base {
  call = (): void => {
    throw new Error('Call not implemented');
  }
}

export default Base;
