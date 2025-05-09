interface IBook {
  id: string;
  name: string;
  weight: number;
  destination: string;
}

class Book implements IBook {
  id: string;
  name: string;
  weight: number;
  destination: string;

  constructor({ id, name, weight, destination }: IBook) {
    this.id = id;
    this.name = name;
    this.weight = weight;
    this.destination = destination;
  }
}

export { Book, IBook };
