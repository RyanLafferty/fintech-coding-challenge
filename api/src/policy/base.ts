import ServiceBase from 'src/service/base';

export class Base extends ServiceBase {
  protected denied!: boolean;
  protected reason?: string;

  constructor() {
    super();
  
    this.denied = false;
  }

  protected isApproved = (): boolean => {
    return !this.denied;
  }

  protected deny = (reason: string): void => {
    this.denied = true;
    this.reason = reason;
  };
}

export default Base;
