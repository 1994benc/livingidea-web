// TODO: implement the logic in this file
export default class PageModel {
  constructor(
    public id: string,
    public name: string,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  public static fromJSON(json: any): PageModel {
    return new PageModel(json.id, json.name, json.createdAt?.toDate(), json.updatedAt?.toDate());
  }

  public toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public clone(): PageModel {
    return new PageModel(this.id, this.name, this.createdAt, this.updatedAt);
  }
}
