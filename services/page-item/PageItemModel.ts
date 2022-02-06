export default class PageItemModel<TProperty = any> {
  constructor(
    public id: string,
    public type: PageItemType,
    public properties: TProperty,
    public createdAt: Date = new Date(),
    public updatedAt: Date = new Date()
  ) {}

  public static fromJSON<TProperty>(json: any): PageItemModel<TProperty> {
    return new PageItemModel(
      json.id,
      json.type,
      json.properties,
      json.createdAt?.toDate(),
      json.updatedAt?.toDate()
    );
  }

  public toJSON(): any {
    return {
      id: this.id,
      type: this.type,
      properties: this.properties,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  public clone(): PageItemModel<TProperty> {
    return new PageItemModel<TProperty>(
      this.id,
      this.type,
      this.properties,
      this.createdAt,
      this.updatedAt
    );
  }
}

export enum PageItemType {
  ShortTextInput = "ShortTextInput",
  LongTextInput = "LongTextInput",
  SingleSelectMultiChoice = "SingleSelectMultiChoice",
  MultiSelectMultiChoice = "MultiSelectMultiChoice",
  YesNoQuestion = "YesNoQuestion",
}
