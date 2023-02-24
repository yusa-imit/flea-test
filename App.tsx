/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useMemo} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import useSSE from './util/useSSE';
import {shuffle} from './util/shuffle';
import {auctionIds} from './constants/auctionIds';
import HorizonList from './ui/HorizonList';
import {GlobalStyles} from './ui/GlobalStyles';
import {GlobalStyleSheet} from './ui/GlobalStyleSheet';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const renderList = useMemo(() => {
    return [shuffle(auctionIds), shuffle(auctionIds)];
  }, []);

  const data = useSSE();
  console.log(data);
  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={[styles.mainView]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View style={[styles.header]}>
          <Text style={styles.headerText}>Header</Text>
        </View>
        {renderList.map((list, index) => (
          <View key={`auction-tree-${index}`} style={styles.horizonContainer}>
            <Text style={styles.horizonContainerInnerText}>{`Scroll Area ${
              index + 1
            }`}</Text>
            <HorizonList status={data} itemList={list} />
          </View>
        ))}
        <View style={styles.tabBar}>
          <Text style={styles.tabBarText}>TabBar</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
    height: '100%',
    backgroundColor: 'aliceblue',
    gap: GlobalStyles.margin.md,
  },
  header: {
    ...GlobalStyleSheet.flex(1),
    ...GlobalStyleSheet.vertCenter,
    padding: GlobalStyles.padding.md,
    height: '10%',
    maxHeight: 56,
    backgroundColor: 'powderblue',
  },
  headerText: {
    fontSize: GlobalStyles.fontSize.lg,
    fontWeight: GlobalStyles.fontWeight.bold,
  },
  tabBar: {
    ...GlobalStyleSheet.flex(2),
    ...GlobalStyleSheet.vertCenter,
    ...GlobalStyleSheet.horizCenter,
    padding: GlobalStyles.padding.md,
    height: '20%',
    maxHeight: 80,
    backgroundColor: 'skyblue',
  },
  tabBarText: {
    fontSize: GlobalStyles.fontSize.lg,
    fontWeight: GlobalStyles.fontWeight.bold,
    color: GlobalStyles.color.white,
  },
  horizonContainer: {
    ...GlobalStyleSheet.flex(3),
    ...GlobalStyleSheet.vertCenter,
    paddingTop: GlobalStyles.padding.md,
    paddingBottom: GlobalStyles.padding.md,
    flexShrink: 1,
  },
  horizonContainerInnerText: {
    marginBottom: GlobalStyles.margin.sm,
    paddingLeft: GlobalStyles.padding.md,
    fontSize: GlobalStyles.fontSize.md,
    fontWeight: GlobalStyles.fontWeight.bold,
    color: 'steelblue',
  },
});

export default App;
