export class Alert {
    // @ts-ignore
  id: string;
  // @ts-ignore
    type: AlertType;
  // @ts-ignore
    message: string;
  // @ts-ignore
    autoClose: boolean;
  // @ts-ignore
    keepAfterRouteChange: boolean;
  // @ts-ignore
    fade: boolean;

    constructor(init?: Partial<Alert>) {
        Object.assign(this, init);
    }
}

