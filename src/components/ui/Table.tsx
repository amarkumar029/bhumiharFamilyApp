// Table.tsx
import React from 'react';
import { View, Text, ScrollView, StyleSheet, ViewStyle, TextStyle } from 'react-native';

type TableProps = {
  style?: ViewStyle;
  children: React.ReactNode;
};

type TableRowProps = {
  style?: ViewStyle;
  children: React.ReactNode;
};

type TableCellProps = {
  style?: TextStyle;
  children: React.ReactNode;
};

export const Table: React.FC<TableProps> = ({ style, children }) => {
  return (
    <ScrollView horizontal style={[styles.tableWrapper, style]}>
      <View style={styles.table}>{children}</View>
    </ScrollView>
  );
};

export const TableHeader: React.FC<TableRowProps> = ({ style, children }) => {
  return <View style={[styles.tableHeader, style]}>{children}</View>;
};

export const TableBody: React.FC<TableRowProps> = ({ style, children }) => {
  return <View style={[styles.tableBody, style]}>{children}</View>;
};

export const TableFooter: React.FC<TableRowProps> = ({ style, children }) => {
  return <View style={[styles.tableFooter, style]}>{children}</View>;
};

export const TableRow: React.FC<TableRowProps> = ({ style, children }) => {
  return <View style={[styles.tableRow, style]}>{children}</View>;
};

export const TableHead: React.FC<TableCellProps> = ({ style, children }) => {
  return <Text style={[styles.tableHead, style]}>{children}</Text>;
};

export const TableCell: React.FC<TableCellProps> = ({ style, children }) => {
  return <Text style={[styles.tableCell, style]}>{children}</Text>;
};

export const TableCaption: React.FC<TableCellProps> = ({ style, children }) => {
  return <Text style={[styles.tableCaption, style]}>{children}</Text>;
};

// Styles
const styles = StyleSheet.create({
  tableWrapper: {
    width: '100%',
  },
  table: {
    flexDirection: 'column',
    width: '100%',
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#f9f9f9',
  },
  tableBody: {},
  tableFooter: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    backgroundColor: '#f2f2f2',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    paddingVertical: 8,
  },
  tableHead: {
    fontWeight: 'bold',
    paddingHorizontal: 8,
    flex: 1,
  },
  tableCell: {
    paddingHorizontal: 8,
    flex: 1,
  },
  tableCaption: {
    textAlign: 'center',
    marginTop: 8,
    color: '#666',
    fontSize: 12,
  },
});
