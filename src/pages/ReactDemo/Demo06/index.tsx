import React from 'react';
import { GlobalProvider } from './store/useUserContext';
import Profile1 from './components/profile1';
import Profile2 from './components/profile2';
import { PageContainer } from '@ant-design/pro-layout';

const App: React.FC = () => {
  return (
    <PageContainer>
      <GlobalProvider>
        <Profile1 />
        <Profile2 />
      </GlobalProvider>
    </PageContainer>
  );
};

export default App;
