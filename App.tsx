import React from 'react';
import {QueryClientProvider} from '@tanstack/react-query';

import {queryClient} from './src/services/api/queryClient';
import {Provider} from 'react-redux';
import {persistor, store} from './src/store';
import {PersistGate} from 'redux-persist/integration/react';
import {RootNavigation} from './src/navigation/RootNavigation';

if (__DEV__) {
  import('react-query-native-devtools').then(({addPlugin}) => {
    addPlugin({queryClient});
  });
}

function App(): JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RootNavigation />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
