export default class Data {
  constructor(colectionModel) {
    this.collection = colectionModel;
  }

  async getAll() {
    try {
      const all = this.collection.find({});
      return all;
    } catch (error) {
      throw new Error("No se puede obtener los datos", error);
    }
  }

  async create(data) {
    try {
      const newData = await this.collection.create(data);
      return newData;
    } catch (error) {
      throw new Error("No se pudieron guardar los datos", error);
    }
  }
}
