import React from 'react';
import { MyWallet } from './components/my-wallet/MyWallet';
import { NotesScreen } from './components/notes-screen/NotesScreen';
import { GlobalContextProvider } from './components/GlobalContextProvider';
import { Navigate, Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { MainLayout } from './components/MainLayout';
import { AppRoutes } from './utils/config';
import './global/index.scss'

const App = () => (
    <GlobalContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={(
              <Navigate replace to={AppRoutes.MY_WALLET} />
          )}/>
          <Route path={AppRoutes.MY_WALLET} element={(
              <MainLayout>
                <MyWallet/>
              </MainLayout>
          )}/>
          <Route path={AppRoutes.EARNS} element={(
              <MainLayout>
                <NotesScreen name="earns"/>
              </MainLayout>
          )}/>
          <Route path={AppRoutes.EXPENDITURE} element={(
              <MainLayout>
                <NotesScreen name="expenditure"/>
              </MainLayout>
          )}/>
          <Route path={AppRoutes.ACCUMULATIONS} element={(
              <MainLayout>
                <NotesScreen name="accumulations"/>
              </MainLayout>
          )}/>
        </Routes>
      </BrowserRouter>
    </GlobalContextProvider>
);

export default App;
