import getName from '../services/exampleService';

export default {
  namespace: 'example',
  state: {
    name: ''
  },
  effects: {
    *getName(action, { put, call }) {
      const response = yield call(getName);
      yield put({ type: 'saveName', payload: response });
    }
  },

  reducers: {
    saveName(state, action) {
      return { ...state, name: action.payload.name };
    }
  }
};
