import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  redirect,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css';
import Home from './pages/home/home';
import Research from './pages/research/research';
import Footer from './shared/components/footer/footer';
import Header from './shared/components/header/header';
// import 'swiper/css';
import News from './pages/news/news';
import Podcasts from './pages/podcasts/podcasts';
import { CategoriesDetails } from './pages/categories-details/categories-details';
import ScrollToTop from './shared/components/scrolltotop/scrolltotop';
import { LearningTracks } from './pages/learning-tracks/learning-tracks';
import { Wallets } from './pages/wallets/wallets';
import { People } from './pages/people/people';
import { TopBlogs } from './pages/topblogs/topblogs';
import { BestTool } from './pages/best-tool/best-tool';
import { WalletApps } from './pages/wallets-app/wallets-app';
import Creator from './pages/creator/creator';
import Article from './pages/article/article';
import PodcastsDetails from './pages/podcasts-details/podcasts-details';
import "react-h5-audio-player/src/styles.scss";
import { Login } from './pages/auth/login/login';
import { Register } from './pages/auth/register/register';
import { AboutUs } from './pages/about-us/about-us';
import CreatorPartner from './pages/creator-partner/creator-partner';
import Education from './pages/education/education';
import Intro from './pages/education/pages/intro/intro';
import Keyword from './pages/education/pages/keyword/keyword';
import WhyThisCourse from './pages/education/pages/why-this-course/why-this-course';
import { AllCreator } from './pages/all-creator/all-creator';
import { Advertise } from './pages/advertise/advertise';
import Catching from './pages/education/pages/catching/catching';
import Becomepro from './pages/education/pages/become-pro/become-pro';
import Tokenomics from './pages/education/pages/tokenomics/tokenomics';
import Yourtoolkit from './pages/education/pages/your-toolkit/your-toolkit';
import Effectiveexamples from './pages/education/pages/effective-examples/effective-examples';
import Actionschecklist from './pages/education/pages/actions-checklist/actions-checklist';
import CreatorProfile from './pages/creator-profile/creator-profile';
import Allcategory from './pages/all-category/all-category';
import Subscribe from './pages/subscribe';
import NewsPost from './pages/news-post/news-post';
import { Link } from 'react-router-dom';
import CalendarComp from './shared/components/calendar';
import Searchpage from './pages/search-page/search-page';
import { CrossPromotion } from './pages/cross-promotion/cross-promotion';
import { WelcomeEmail } from './pages/welcome-email/welcome-email';
import RouteLayout from './RoutesLayout';

export const PrivateRoute = ({ children }: any) => {
  const userId = localStorage.getItem("user_id") || 0

  if (userId) {
    console.log("Yes, user exist");
  } else {
    console.log("No user");
  }

  if (!userId) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {




  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<RouteLayout />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/research" element={<Research />}></Route>
            <Route path="/news" element={<News />}></Route>
            <Route path="/podcasts" element={<Podcasts />}></Route>
            <Route path="/categoriesdetails/:id/:subid" element={<CategoriesDetails />}></Route>
            <Route path="/education" element={<LearningTracks />}></Route>
            <Route path="/wallets" element={<Wallets />}></Route>
            <Route path="/people" element={<People />}></Route>
            <Route path="/topblogs" element={<TopBlogs />}></Route>
            <Route path="/besttools" element={<BestTool />}></Route>
            <Route path="/walletapps" element={<WalletApps />}></Route>
            <Route path="/creator" element={
              <PrivateRoute>
                <Creator />
              </PrivateRoute>
            }></Route>
            <Route path="/creatorprofile/:id" element={<CreatorProfile />}></Route>
            <Route path="/allcreator" element={<AllCreator />}></Route>
            <Route path="/article/:id/:subid/:subsubid" element={<Article />}></Route>
            <Route path="/article/:id" element={<Article />}></Route>
            <Route path="/news-post/:id" element={<NewsPost />}></Route>
            <Route path="/podcastsdetails/:id" element={<PodcastsDetails />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/aboutus" element={<AboutUs />}></Route>
            <Route path="/creatorpartner" element={<CreatorPartner />}></Route>
            <Route path="/advertise" element={<Advertise />}></Route>
            <Route path="/cross-promotion" element={<CrossPromotion />}></Route>
            <Route path="/courses" element={<Education />}></Route>
            <Route path="/courses/intro" element={<Intro />}></Route>
            <Route path="/courses/keyword" element={<Keyword />}></Route>
            <Route path="/courses/whythiscourse" element={<WhyThisCourse />}></Route>
            <Route path="/courses/catching" element={<Catching />}></Route>
            <Route path="/courses/becomepro" element={<Becomepro />}></Route>
            <Route path="/courses/tokenomics" element={<Tokenomics />}></Route>
            <Route path="/courses/yourtoolkit" element={<Yourtoolkit />}></Route>
            <Route path="/courses/effectiveexamples" element={<Effectiveexamples />}></Route>
            <Route path="/courses/actionschecklist" element={<Actionschecklist />}></Route>
            <Route path="/allcategory" element={<Allcategory />}></Route>
            <Route path="/allcategory/:id" element={<Allcategory />}></Route>
            <Route path="/allcategory/:id/:id" element={<Allcategory />}></Route>
            <Route path="/subscribe" element={<Subscribe />}></Route>
            <Route path="/calendar" element={<CalendarComp />}></Route>
            <Route path="/search-page/:id" element={<Searchpage />}></Route>
          </Route>
          <Route path="/welcome-email" element={<WelcomeEmail />}></Route>
        </Routes>
      </Router>
    </div >
  );
}

export default App;
