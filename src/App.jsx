import { useState } from "react";
import "./App.css";
import LayoutClient from "./layout/LayoutClient";
import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/Loading";
import { CSpinner, useColorModes } from "@coreui/react";
import { Zap } from "lucide-react";

const ScrollToTop = lazy(() => import("./components/ScrollToTop"));
const HomePage = lazy(() => import("./pages/HomePage"));
const ProductDetailPage = lazy(() => import("./pages/ProductDetailPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const AddressForm = lazy(() => import("./components/Form/AddressForm"));
const ChangePasswordForm = lazy(() =>
  import("./components/Form/ChangePasswordForm")
);
const OdersForm = lazy(() => import("./components/Form/OdersForm"));
const PersonalInformationForm = lazy(() =>
  import("./components/Form/PersonalInformationForm")
);
const ContactPage = lazy(() => import("./pages/ContactPage"));
const UserProfilePage = lazy(() => import("./pages/UserProfilePage"));
function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          {/* Client Routes */}
          <Route path="/" element={<LayoutClient />}>
            <Route
              index
              element={
                <ScrollToTop>
                  <HomePage />
                </ScrollToTop>
              }
            />
            <Route
              path="products"
              element={<ScrollToTop>{/* <ProductListPage /> */}</ScrollToTop>}
            />
            <Route
              path="product/:productId"
              element={<ScrollToTop>{<ProductDetailPage />}</ScrollToTop>}
            />
            {/* <Route path="categories" element={<CategoryPage />} />
            <Route path="search" element={<SearchPage />} /> */}
            <Route
              path="contact"
              element={<ScrollToTop>{<ContactPage />}</ScrollToTop>}
            />
            {/* <Route element={<RequireAuth />}> */}
            <Route>
              <Route path="profile" element={<UserProfilePage />}>
                <Route index element={<Navigate to="account-info" replace />} />
                <Route
                  path="account-info"
                  element={<PersonalInformationForm />}
                />
                <Route path="address-book" element={<AddressForm />} />
                <Route
                  path="change-password"
                  element={<ChangePasswordForm />}
                />
                <Route path="orders" element={<OdersForm />} />
              </Route>
            </Route>
          </Route>
          {/* <Route path="payment-success" element={<PaymentSuccessPage />} />
          <Route path="payment-cancel" element={<PaymentCancelPage />} />
          <Route path="payment/:code" element={<CheckoutPage />} /> */}

          <Route path="login" element={<LoginPage />} />

          {/* <Route index element={<CartPage />} /> */}

          {/* <Route path="register" element={<RegisterPage />} /> */}
          {/* <Route path="cart" element={<CartLayout />}>
            <Route index element={<CartPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} /> */}
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
