import {useCallback, useState} from 'react';
import {
  RefreshControl,
  ScrollView,
  ScrollViewProps,
  StyleSheet,
} from 'react-native';
import {auctionIds} from '../constants/auctionIds';
import {shuffle} from '../util/shuffle';
import AuctionItem from './AuctionItem';
import {GlobalStyles} from './GlobalStyles';

interface HorizonListProps extends ScrollViewProps {
  idList: string[];
  status: Record<string, number>;
}

export default function HorizonList({
  status,
  style,
  idList = auctionIds,
  ...etc
}: HorizonListProps) {
  return (
    <ScrollView
      horizontal
      style={StyleSheet.compose(styles.default, style)}
      showsVerticalScrollIndicator={false}
      {...etc}>
      {idList.map(value => (
        <AuctionItem
          auctionId={value}
          viewCount={status[value] ?? 0}
          key={value}
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  default: {
    flex: 0,
    flexShrink: 1,
    flexGrow: 0,
    padding: GlobalStyles.padding.md,
  },
});
