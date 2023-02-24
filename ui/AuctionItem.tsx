import {useEffect, useRef, useState} from 'react';
import {Animated, StyleSheet, Text, View} from 'react-native';
import {GlobalStyles} from './GlobalStyles';
import {GlobalStyleSheet} from './GlobalStyleSheet';

interface AuctionItemProps {
  auctionId: string;
  viewCount: number;
}

export default function AuctionItem({auctionId, viewCount}: AuctionItemProps) {
  const transition = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (viewCount === 0) {
      transition.setValue(0);
      return;
    }
    transition.setValue(1);
    Animated.timing(transition, {
      toValue: 0,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, [viewCount]);
  return (
    <View style={[styles.default]}>
      <View style={styles.inner}>
        <Text style={[styles.idText]}>{auctionId}</Text>
        <Text style={[styles.countText]}>{viewCount}</Text>
      </View>
      <Animated.View
        style={[
          styles.flicker,
          {
            opacity: transition,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  default: {
    minWidth: 80,
    width: '20%',
    maxWidth: 120,
    flex: 0,
    aspectRatio: 1,
    borderWidth: 4,
    borderColor: 'peachpuff',
    borderRadius: GlobalStyles.radius.md,
    backgroundColor: 'oldlace',
    marginRight: GlobalStyles.margin.md,
  },
  inner: {
    flex: 1,
    padding: GlobalStyles.padding.sm,
    ...GlobalStyleSheet.horizCenter,
    ...GlobalStyleSheet.vertCenter,
    gap: GlobalStyles.margin.md,
  },
  idText: {
    fontSize: GlobalStyles.fontSize.lg,
    fontWeight: GlobalStyles.fontWeight.bold,
    color: 'coral',
  },
  countText: {
    fontSize: GlobalStyles.fontSize.md,
    fontWeight: GlobalStyles.fontWeight.bold,
    color: 'black',
  },
  flicker: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'coral',
  },
});
