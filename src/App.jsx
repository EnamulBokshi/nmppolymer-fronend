// Desc: Main App component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Home, ProductDetails,StoreLocator,ContactUs,About,AllProducts,Dashoboard} from './pages';


import 'tailwindcss/tailwind.css';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path='/store' element={<StoreLocator />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/about' element={<About />} />
        <Route path='/products' element={<AllProducts />} />
        <Route path='/admin/dashboard' element={<Dashoboard />} />
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );

}
export default App
