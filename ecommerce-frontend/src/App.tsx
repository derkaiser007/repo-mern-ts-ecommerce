// ###React.lazy(): It is used to dynamically load components, enabling code-splitting. This means the component's code 
// is only loaded when it is needed, reducing the initial bundle size and improving performance.
// ###React.suspanse(): When you use React.lazy() to split code, the component isn't immediately available. 
// React.Suspense waits for the component to finish loading before rendering it. During this time, the fallback 
// UI is displayed.
import { lazy, Suspense, useEffect } from 'react';
import Header from "./components/header";
import Loader from './components/loader';
import ProtectedRoute from './components/protected-route';
// "BrowserRouter as Router" just for convenience.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
// ###useSelector: useSelector allows you to read data from the Redux store. It takes a selector function as an 
// argument, which is used to extract a specific part of the state.
// 1: Access State: Allows access to the specific part of the Redux store you need.
// 2: Re-render Optimization: Only re-renders the component when the selected state changes.
// 3: Declarative: Encourages extracting data rather than coupling components to the entire store.
// ###useDispatch: useDispatch gives access to the dispatch function, which is used to dispatch actions to the Redux 
// store. Actions are used to trigger state changes in reducers.
// 1: Trigger State Updates: Allows components to send updates to the Redux store.
// 2: Flexible: Can dispatch actions synchronously or asynchronously (e.g., via Redux Thunks).
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { userExist, userNotExist } from './redux/reducer/userReducer';
import { getUser } from './redux/api/userAPI';
import { useAuth0 }  from '@auth0/auth0-react';

const Home = lazy(() => import('./pages/home'))
const Search = lazy(() => import('./pages/search'))
const Cart = lazy(() => import('./pages/cart'))
const Shipping = lazy(() => import("./pages/shipping"));
const Login = lazy(() => import("./pages/login"));
const Orders = lazy(() => import("./pages/orders"));
const OrderDetails = lazy(() => import("./pages/order-details"));
const NotFound = lazy(() => import("./pages/not-found"));
const Checkout = lazy(() => import("./pages/checkout"));

// Admin Routes Import
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);

function App() {

  const { user, loading } = useSelector(
    (state: RootState) => state.userReducer
  );

  const dispatch = useDispatch();

  const { isAuthenticated, isLoading, getIdTokenClaims } = useAuth0();

  useEffect(() => {
    const fetchUser = async () => {
      if (isAuthenticated && user) {
        try {
          // Optionally, you can get a JWT from Auth0 to use in your API requests
          const token = await getIdTokenClaims();
          const userData = await getUser(user, token?.__raw); // Fetch additional user data with token
          dispatch(userExist(userData));
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      } else if (!isLoading) {
        dispatch(userNotExist());
      }
    };

    fetchUser();
  }, [isAuthenticated, user, isLoading, getIdTokenClaims, dispatch]);

  return loading ? (
    <Loader />
  ) : (
    <Router>
      {/* Header */}
      <Header user={ user }/>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/search' element={<Search />} />
          <Route path='/cart' element={<Cart />} />
          <Route
            path="/login"
            element={
              <ProtectedRoute isAuthenticated={user ? false : true}>
                <Login />
              </ProtectedRoute>
            }
          />
          <Route element={
            <ProtectedRoute isAuthenticated={user ? true : false} />
          }>
            <Route path='/shipping' element={<Shipping />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/order' element={<OrderDetails />} />
            <Route path='/pay' element={<Checkout />} />
          </Route>

          // Admin Routes
          <Route
            element={
            <ProtectedRoute 
              isAuthenticated={true} 
              adminOnly={true} 
              isAdmin={user?.role === "admin" ? true : false} />
          }>
            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/product" element={<Products />} />
            <Route path="/admin/customer" element={<Customers />} />
            <Route path="/admin/transaction" element={<Transaction />} />

            {/* Charts */}
            <Route path="/admin/chart/bar" element={<Barcharts />} />
            <Route path="/admin/chart/pie" element={<Piecharts />} />
            <Route path="/admin/chart/line" element={<Linecharts />} />

            {/* Apps */}
            <Route path="/admin/app/coupon" element={<Coupon />} />
            <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
            <Route path="/admin/app/toss" element={<Toss />} />

            {/* Management */}
            <Route path="/admin/product/new" element={<NewProduct />} />
            <Route path="/admin/product/:id" element={<ProductManagement />} />
            <Route path="/admin/transaction/:id" element={<TransactionManagement />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
      <Toaster position="bottom-center" />
    </Router>
  )
}

export default App
