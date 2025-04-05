import React from 'react';
import { GlobalProvider } from './store/useUserContext';
import SubDom1 from './components/subDom1';
import SubDom2 from './components/subDom2';
import { PageContainer } from '@ant-design/pro-layout';

const App: React.FC = () => {
  return (
    <PageContainer>
      <GlobalProvider>
        <SubDom1 />
        <SubDom2 />
      </GlobalProvider>
    </PageContainer>
  );
};

export default App;
