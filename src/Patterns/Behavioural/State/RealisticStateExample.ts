/*
    This file is a more realistic example of the State pattern.
    It implements a state machine.

    The state machine simulates a phone call. We have 5 states.
    Each state has a set of rules (triggers and states) that determine what the next valid state is.
*/
import * as readline from 'readline';

let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

enum State {
  offHook = 'off hook',
  connecting = 'connecting',
  connected = 'connected',
  onHold = 'on hold',
  onHook = 'on hook'
}

enum Trigger {
  callDialed = 'dial a number',
  hungUp = 'hang up',
  callConnected = 'call is connected',
  placedOnHold = 'placed on hold',
  takenOffHold = 'taken off hold',
  leftMessage = 'leave a message'
}

interface Rule {
  trigger: Trigger;
  state: State;
}

let rules: { [key in State]?: Rule[] } = {};

//assign each state as a key in the rules object and define the rules for each state within that key
rules[State.offHook] = [
  {
    trigger: Trigger.callDialed,
    state: State.connecting
  }
];
rules[State.connecting] = [
  {
    trigger: Trigger.hungUp,
    state: State.onHook
  },
  {
    trigger: Trigger.callConnected,
    state: State.connected
  }
];
rules[State.connected] = [
  {
    trigger: Trigger.leftMessage,
    state: State.onHook
  },
  {
    trigger: Trigger.hungUp,
    state: State.onHook
  },
  {
    trigger: Trigger.placedOnHold,
    state: State.onHold
  }
];
rules[State.onHold] = [
  {
    trigger: Trigger.takenOffHold,
    state: State.connected
  },
  {
    trigger: Trigger.hungUp,
    state: State.onHook
  }
];

// define the initial state and the exit state
let state: State = State.offHook;
let exitState: State = State.onHook;

let getInput = function() {
  let prompt = [
    `The phone is currently ${state}`,
    'What\'s next:'
  ];

  // list all the valid triggers for the current state / transitions to the next state
  for (let i = 0; i < rules[state]!.length; ++i)
  {
    let t = rules[state]![i].trigger;
    prompt.push(`${i}. ${t}`);
  }

  // force an extra line break
  prompt.push('');

  // ask the user for input
  rl.question(prompt.join('\n'), function(answer)
  {
    let input = parseInt(answer);
    state = rules[state]![input].state;

    if (state !== exitState)
      getInput();
    else {
      console.log('We are done using the phone.');
      rl.close();
    }
  });
};

getInput();