import { Machine } from "xstate";

const FieldStateMachine = Machine({
  id: "fieldStateMachine",
  initial: "inactive",
  states: {
    inactive: { on: { SELECT_START: "selectingFinish" } },
    selectingFinish: {},
    running: {},
    finished: {},
  },
});

export default FieldStateMachine;
