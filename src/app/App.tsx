import './App.css';
import SearchPanel from './components/SearchPanel';
import { FC } from 'react';
import ResultList from './components/ResultList/ResultList';
import Logo from './components/Logo';

const App: FC = () => {
  return (
    <div className='App'>
      <Logo />
      <SearchPanel />
      <ResultList />
    </div>
  );
};

export default App;
