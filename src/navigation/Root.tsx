import * as React from 'react';
import {StackActions, CommonActions} from '@react-navigation/native';

export const navigationRef = React.createRef<any>();

function navigate(name: string, params: any) {
  navigationRef.current?.navigate(name, params);
}

function goBack() {
  navigationRef.current?.goBack();
}

function replace(name: string, params: any) {
  navigationRef.current?.dispatch(StackActions.replace(name, params));
}

function push(name: string, params: any) {
  navigationRef.current?.dispatch(StackActions.push(name, params));
}

function reset(name: string, params: any) {
  const resetAction = CommonActions.reset({
    index: 0,
    routes: [
      {
        name: name,
        params: params,
      },
    ],
  });
  navigationRef.current?.dispatch(resetAction);
}

export default {
  navigate,
  replace,
  goBack,
  push,
  reset,
};
