import React from 'react';
 import Navbar from '../components/Navbar';
 import Login from '../components/Login';
 import AboutUs from '../components/AboutUs';
 import ContactUs from '../components/ContactUs';
 import Footer from '../components/Footer';
 import '../styles/HomePage.css';
 
 const HomePage = () => {
   return (
     <div className="homepage">
       <Navbar />
       <main className="main-content">
         <section className="hero-section">
           <Login />
         </section>
         <AboutUs />
         <ContactUs />
       </main>
       <Footer />
     </div>
   );
 };
 
 export default HomePage;
