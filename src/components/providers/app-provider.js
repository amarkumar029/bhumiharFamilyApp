import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import { store, persistor } from '../../store';
import ReactQueryProvider from '../../provider/ReactQueryProvider';

import { ErrorBoundary } from './ErrorBoundary';
import { LoadingSpinner } from '../loading-spinner';

export function AppProvider({ children }) {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
        <ReactQueryProvider>

          <ErrorBoundary>
            <View style={styles.container}>{children}</View>
          </ErrorBoundary>

        </ReactQueryProvider>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});