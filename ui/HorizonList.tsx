import {ScrollView, ScrollViewProps, StyleSheet} from 'react-native';
import AuctionItem from './AuctionItem';
import {GlobalStyles} from './GlobalStyles';

interface HorizonListProps extends ScrollViewProps {
  itemList: string[];
  status: Record<string, number>;
}

export default function HorizonList({
  itemList,
  status,
  style,
  ...etc
}: HorizonListProps) {
  return (
    <ScrollView
      horizontal
      style={StyleSheet.compose(styles.default, style)}
      {...etc}>
      {itemList.map(value => (
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
