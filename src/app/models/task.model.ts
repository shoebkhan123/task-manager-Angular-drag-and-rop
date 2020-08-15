export class Task {
  constructor(
    public id: string,
    public title: string,
    public description,
    public priority: string,
    public date: Date,
    public time: number
    ) {  }
}
