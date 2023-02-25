/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useCallback, useState} from 'react';
import {
  Dimensions,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import {auctionIds} from './constants/auctionIds';
import {GlobalStyles} from './ui/GlobalStyles';
import {GlobalStyleSheet} from './ui/GlobalStyleSheet';
import HorizonList from './ui/HorizonList';
import {LoadingScreen} from './ui/LoadingScreen';
import {shuffle} from './util/shuffle';
import useSSE from './util/useSSE';

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const setRandomList = useCallback(() => {
    return [shuffle(auctionIds), shuffle(auctionIds)];
  }, []);
  const [renderList, setRenderList] = useState(setRandomList());
  const refreshControl = useCallback(() => {
    setRenderList(setRandomList());
  }, [setRenderList, setRandomList]);
  const [data, loading] = useSSE();
  const window = Dimensions.get('window');
  return (
    <SafeAreaView style={backgroundStyle}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={false} onRefresh={refreshControl} />
        }>
        <View
          style={[
            styles.mainView,
            {height: window.height, width: window.width},
          ]}>
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
              <HorizonList status={data} idList={list} />
            </View>
          ))}
          <View style={styles.tabBar}>
            <Text style={styles.tabBarText}>TabBar</Text>
          </View>
        </View>
      </ScrollView>
      <LoadingScreen render={loading} isDarkMode={isDarkMode} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  mainView: {
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
