import React from "react";

import './styles.css'; // Unificar estilos
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Inbox from "./components/Inbox";
import { useSupabaseAuth } from "./hooks/useSupabaseAuth";
import LegalNewsAndResources from "./components/LegalNewsAndResources";

const App: React.FC = () => {
  console.log("App component loaded");
  const { user, signOut } = useSupabaseAuth();

  return (
    <div>
      <Header
        user={user}
        onSignOut={signOut}
      />
      <Hero />
      <Services />
      <About />
      <LegalNewsAndResources />
      <Contact user={user} />
      <Inbox user={user} />
      <Footer />
    </div>
  );
};

export default App;
