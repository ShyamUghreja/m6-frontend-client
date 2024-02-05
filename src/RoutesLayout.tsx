import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  redirect,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ScrollToTop from './shared/components/scrolltotop/scrolltotop';
import Header from './shared/components/header/header';
import Footer from './shared/components/footer/footer';
import {
  // BrowserRouter as Router,
  Outlet
} from 'react-router-dom';
function RouteLayout() {




  return (
    <div>
      <ScrollToTop />
      <Header />
      <Outlet />
      <Footer />
    </div >
  );
}

export default RouteLayout;
