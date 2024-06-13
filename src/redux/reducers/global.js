import {FadeFromBottomAndroid} from '@react-navigation/stack/lib/typescript/src/TransitionConfigs/TransitionPresets';

const INITAL_STATE = {
  dataList: [],
};
export default (state = INITAL_STATE, action) => {
  switch (action.type) {
    case 'SET_API':
      return {
        ...state,
        dataList: action.payload,
      };
    default:
      return state;
  }
};
