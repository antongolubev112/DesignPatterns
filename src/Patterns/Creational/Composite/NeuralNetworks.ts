/* 
    Base type for neurons and layers
    it assumes that the objects being connected are iterable 
*/
abstract class Connectable {
  abstract in: Connectable[];
  abstract out: Connectable[];

    /*
        This method allows us to connect Neurons to Layers
        It is used to connect the current instance (represented by this) to another instance (represented by other).
    */
  connectTo(other: Connectable) {
    for (let from of [this])
      for (let to of other as any) {
        from.out.push(to);
        to.in.push(from);
      }
  }
}

class Neuron extends Connectable {
  in: Neuron[] = [];
  out: Neuron[] = [];

   /* This method does not allow us to connect Neurons to Layers

    connectTo(other)
    {
        this.out.push(other);
        other.in.push(this);
    }
  */

  toString() {
    return (
      `A neuron with ${this.in.length} inputs ` +
      `and ${this.out.length} outputs`
    );
  }

  /* 
    This method allows the Neuron class to be iterable
    it returns one item: itself.
    Essentially it allows the Neuron class to masquerade as an iterable object.
  */
 
  [Symbol.iterator]() {
    let returned = false;
    return {
      next: () => ({
        value: this,
        done: (returned = true),
      }),
    };
  }
}

class NeuronLayer extends Array<Neuron> implements Connectable {
  in: Neuron[] = [];
  out: Neuron[] = [];

  constructor(count: number) {
    super();
    while (count-- > 0) this.push(new Neuron());
  }

  connectTo(other: Connectable) {
    for (let from of [this])
      for (let to of other as any) {
        from.out.push(to);
        to.in.push(from);
      }
  }

  toString() {
    return `A layer with ${this.length} neurons`;
  }
}

let neuron1 = new Neuron();
let neuron2 = new Neuron();
let layer1 = new NeuronLayer(3);
let layer2 = new NeuronLayer(4);

neuron1.connectTo(neuron2);
neuron1.connectTo(layer1);
layer2.connectTo(neuron1);
layer1.connectTo(layer2);

console.log(neuron1.toString());
console.log(neuron2.toString());
console.log(layer1.toString());
console.log(layer2.toString());
