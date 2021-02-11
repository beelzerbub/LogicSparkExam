export interface ICategory {
  id: number;
  ["category_name"]: string;
  ["create_at"]: Date;
  ["update_at"]: Date;
}

export class CategoryData {
  public id: number | null;
  public category_name: string;
  public create_at: Date | null;
  public update_at: Date | null;

  constructor(data: ICategory) {
    const {
      id = null,
      category_name,
      create_at = null,
      update_at = null,
    } = data;

    this.id = id;
    this.create_at = create_at;
    this.update_at = update_at;

    if (category_name) {
      this.category_name = category_name;
    } else {
      throw Error("Category name is missing");
    }
  }
}
