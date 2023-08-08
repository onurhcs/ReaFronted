export class List {
    id: number = 0;
    taskName: string = '';
    status: Status = 0;
  }
  
  export enum Status
  {
      Created,
      Complated,
      Deleted,
  }


