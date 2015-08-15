five.StateMachine = function(states, state) {
    // states = name of state --> game loop function
    this.states = states;
    this.state = state;
};

five.StateMachine.prototype.run = function() {
    // call the current game loop function
    // with the arguments to this function
    this.states[this.state].apply(null, arguments);
};