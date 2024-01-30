import { Route, Routes, BrowserRouter } from 'react-router-dom'
import {Home} from './pages/Home'
import {Sing} from './pages/auth/Sing';
import {CartContent} from "./components/CartContent/CartContent";
import {AppProvider} from './context/useContext'
import {Checkout} from './pages/auth/Checkout'
import {Login} from './pages/auth/Login'
import { ProtectedRoute } from './components/protectedRoutes';
import Profile from "./components/Profile/Profile";
import {Cards} from './components/Cards/Cards'




function App() {

  return (
    <main className="text-center">
      <AppProvider>
        <Routes>
          <Route path="/cards" element={<Cards />} action={Sing} />
          <Route path="/home" element={<Home />} action={Sing} />
          <Route path="/login" element={<Login />} action={Sing} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
            action={Sing}
          />
          <Route path="/" element={<Sing />} />
          <Route path="/cart" element={<CartContent />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
      </AppProvider>
    </main>
  );
}

export default App
