import { Routes, Route } from 'react-router';

import firebase, {FirebaseContext} from './firebase';

import Orders from './components/pages/Orders';
import NewServing from './components/pages/NewServing';
import Menu from './components/pages/Menu';
import Sidebar from './components/ui/Sidebar';

function App() {
  return (
    <FirebaseContext.Provider value={{firebase}}>
      <div className="lg:flex min-h-screen">
      <Sidebar 

      />
      <div className="lg:w-2/3 xl:w-4/5 p-6">
        <Routes>
          <Route path="/" element={<Orders />}/>
          <Route path="/menu" element={<Menu />}/>
          <Route path="/nuevo-platillo" element={<NewServing />}/>
        </Routes>
      </div>
    </div>
    </FirebaseContext.Provider>
  );
}

export default App;
