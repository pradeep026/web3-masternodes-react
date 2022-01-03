import React from 'react';
import { Provider } from 'react-redux';
import MasterNodesAUMPage from '../pages/assets-under-management';
import { store } from '../stores';

import '../styles/index.scss';

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <MasterNodesAUMPage />
    </Provider>
  );
}

export default App;
