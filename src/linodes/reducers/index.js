import { combineReducers } from 'redux';
import _ from 'underscore';
import { getStorage, setStorage } from '~/storage';
import create from './create';
import detail from './detail';

import {
  CHANGE_VIEW,
  TOGGLE_SELECTED,
} from '../actions/index';

const arrayToSet = arr => arr.reduce((s, v) => ({ ...s, [v]: true }), { });

export function index(_state = null, action) {
  const state = _state === null ? {
    view: getStorage('linodes/view') || 'grid',
    selected: { },
  } : _state;

  switch (action.type) {
    case CHANGE_VIEW: {
      const { view } = action;
      setStorage('linodes/view', view);
      return { ...state, view };
    }
    case TOGGLE_SELECTED: {
      const { selected } = action;
      const newSelections = _.omit.apply(this, [
        arrayToSet(selected), ...Object.keys(state.selected),
      ]);
      const persistentSelections = _.omit.apply(this, [
        state.selected, ...selected,
      ]);
      return {
        ...state,
        selected: {
          ...persistentSelections,
          ...newSelections,
        },
      };
    }
    default:
      return state;
  }
}

const rootReducer = combineReducers({
  index,
  create,
  detail,
});

export default rootReducer;
