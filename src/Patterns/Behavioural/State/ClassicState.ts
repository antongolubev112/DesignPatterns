/*
    This file implements the classic State pattern as described by the gang of four.
    This approach is not used often nowadays.

    This example is convoluted because even though we only have 2 states, we need 4 classes.
*/

abstract class State {
    constructor() {
      if (new.target === State) {
        throw new Error('abstract!');
      }
    }
  
    abstract on(sw: Switch): void;
    abstract off(sw: Switch): void;
  }
  
  class Switch {
    state: State;
  
    constructor() {
      this.state = new OffState();
    }
  
    on() {
      this.state.on(this);
    }
  
    off() {
      this.state.off(this);
    }
  }
  
  // when we instantiate an OnState, the light is turned on
  class OnState extends State {
    constructor() {
      super();
      console.log('Light turned on.')
    }
  
    // change the state of the switch to Off
    off(sw: Switch) {
      console.log('Turning light off...');
      sw.state = new OffState();
    }
  
    on(sw: Switch) {
      console.log('Light is already on.');
    }
  }
  
  class OffState extends State {
    constructor() {
      super();
      console.log('Light turned off.');
    }
  
    // change the state of the switch to On
    on(sw: Switch) {
      console.log('Turning light on...');
      sw.state = new OnState();
    }
  
    off(sw: Switch) {
      console.log('Light is already off.')
    }
  }
  
  let sw = new Switch();
  sw.on();
  sw.off();
  sw.off();