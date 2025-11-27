import React, { forwardRef, ReactNode } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';

interface PaginationProps {
  children: ReactNode;
  style?: ViewStyle;
}

const Pagination = forwardRef<View, PaginationProps>(({ children, style }, ref) => {
  return (
    <View ref={ref} style={[styles.paginationContainer, style]}>
      {children}
    </View>
  );
});
Pagination.displayName = 'Pagination';

interface PaginationContentProps {
  children: ReactNode;
  style?: ViewStyle;
}

const PaginationContent = forwardRef<View, PaginationContentProps>(({ children, style }, ref) => {
  return (
    <View ref={ref} style={[styles.content, style]}>
      {children}
    </View>
  );
});
PaginationContent.displayName = 'PaginationContent';

interface PaginationItemProps {
  children: ReactNode;
  style?: ViewStyle;
}

const PaginationItem = forwardRef<View, PaginationItemProps>(({ children, style }, ref) => {
  return (
    <View ref={ref} style={[styles.item, style]}>
      {children}
    </View>
  );
});
PaginationItem.displayName = 'PaginationItem';

interface PaginationLinkProps {
  children: ReactNode;
  isActive?: boolean;
  onPress?: () => void;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

const PaginationLink = ({
  children,
  isActive = false,
  onPress,
  style,
  textStyle,
}: PaginationLinkProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.link,
        isActive ? styles.activeLink : styles.inactiveLink,
        style,
      ]}
    >
      <Text style={[styles.linkText, isActive && styles.activeLinkText, textStyle]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
};
PaginationLink.displayName = 'PaginationLink';

const PaginationPrevious = ({ onPress, style, textStyle }: { onPress?: () => void; style?: ViewStyle; textStyle?: TextStyle }) => (
  <PaginationLink onPress={onPress} style={style} textStyle={textStyle}>
    {'\u2190'} Previous
  </PaginationLink>
);
PaginationPrevious.displayName = 'PaginationPrevious';

const PaginationNext = ({ onPress, style, textStyle }: { onPress?: () => void; style?: ViewStyle; textStyle?: TextStyle }) => (
  <PaginationLink onPress={onPress} style={style} textStyle={textStyle}>
    Next {'\u2192'}
  </PaginationLink>
);
PaginationNext.displayName = 'PaginationNext';

const PaginationEllipsis = ({ style, textStyle }: { style?: ViewStyle; textStyle?: TextStyle }) => (
  <View style={[styles.ellipsisContainer, style]}>
    <Text style={[styles.ellipsisText, textStyle]}>…</Text>
  </View>
);
PaginationEllipsis.displayName = 'PaginationEllipsis';

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginVertical: 8,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  item: {},
  link: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginHorizontal: 2,
    backgroundColor: '#f3f4f6',
    alignItems: 'center',
  },
  activeLink: {
    borderWidth: 1,
    borderColor: '#3b82f6',
    backgroundColor: '#fff',
  },
  inactiveLink: {
    backgroundColor: '#f3f4f6',
  },
  linkText: {
    fontSize: 14,
    color: '#111827',
  },
  activeLinkText: {
    color: '#3b82f6',
  },
  ellipsisContainer: {
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ellipsisText: {
    fontSize: 16,
    color: '#6b7280',
  },
});

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};
