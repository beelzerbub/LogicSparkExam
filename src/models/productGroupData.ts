export interface IProductGroup {
  id: number;
  category_id: number;
  product_id: number;
  create_at: string;
  update_at: string;
}

export class ProductGroupData {
  public id: number | undefined;
  public category_id: number;
  public product_id: number;
  public create_at: string | undefined;
  public update_at: string | undefined;

  constructor(data: IProductGroup) {
    const {
      id = undefined,
      product_id,
      category_id,
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

    if (product_id) {
      this.product_id = product_id;
    } else {
      throw Error("Product id is missing");
    }

    if (category_id) {
      this.category_id = category_id;
    } else {
      throw Error("Category id is missing");
    }
  }
}
