export interface ICategory {
  id: number;
  ["category_name"]: string;
  ["create_at"]: string;
  ["update_at"]: string;
}

export class CategoryData {
  public id: number | undefined;
  public category_name: string;
  public create_at: string | undefined;
  public update_at: string | undefined;

  constructor(data: ICategory) {
    const {
      id = undefined,
      category_name,
      create_at = undefined,
      update_at = undefined,
    } = data;

    if (id) {
      this.id = id;
    }

    if (create_at) {
      this.create_at = create_at;
    }

    if (update_at) {
      this.update_at = update_at;
    }

    if (category_name) {
      this.category_name = category_name;
    } else {
      throw Error("Category name is missing");
    }
  }

  setUpdateAt(value: string) {
    this.update_at = value;
  }
}
