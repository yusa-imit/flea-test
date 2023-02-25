import {BlurView} from '@react-native-community/blur';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from './GlobalStyles';
import {GlobalStyleSheet} from './GlobalStyleSheet';

interface LoadingScreenProps {
  render: boolean;
  isDarkMode: boolean;
}

export function LoadingScreen({render, isDarkMode}: LoadingScreenProps) {
  if (!render) return <></>;
  return (
    <BlurView
      blurRadius={2}
      blurAmount={2}
      blurType={isDarkMode ? 'dark' : 'light'}
      style={styles.loadingScreen}>
      <View
        style={{
          width: '100%',
          height: '100%',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text
          style={{
            marginBottom: GlobalStyles.margin.xl,
            fontSize: GlobalStyles.margin.lg,
            fontWeight: GlobalStyles.fontWeight.bold,
            color: isDarkMode
              ? GlobalStyles.color.white
              : GlobalStyles.color.black,
          }}>
          {'Connecting to server'}
        </Text>
        <ActivityIndicator size={'large'} animating={render} />
      </View>
    </BlurView>
  );
}

const styles = StyleSheet.create({
  loadingScreen: {
    position: 'absolute',
    ...GlobalStyleSheet.horizCenter,
    ...GlobalStyleSheet.vertCenter,
    width: '100%',
    height: '100%',
    top: 0,
  },
});
