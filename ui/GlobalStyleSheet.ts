import {StyleSheet} from 'react-native';

export const GlobalStyleSheet = {
  flex: (num: number) => {
    return {
      flex: num,
    };
  },
  vertCenter: {
    justifyContent: 'center' as const,
  },
  horizCenter: {
    alignItems: 'center' as const,
  },
};
