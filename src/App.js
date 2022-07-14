import { Routes, Route } from 'react-router-dom';
import Authentication from './routes/authentication/authentication.component';

import Home from './routes/home/home.component';
import Navigation from './routes/navigation/navigation.component';
import Shop from './routes/shop/shop.component';

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='hats' element={<Shop />} />
        <Route path='jackets' element={<Shop />} />
        <Route path='sneakers' element={<Shop />} />
        <Route path='womens' element={<Shop />} />
        <Route path='mens' element={<Shop />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;