export class Task {
  constructor(
    public id: number,
    public task: string,
    public isCompleted: boolean,
    public whenCreated: string,
    public whenCompleted: string
  ) {}
}
