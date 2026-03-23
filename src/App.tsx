import React from "react";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Inbox from "./components/Inbox";
import { useSupabaseAuth } from "./hooks/useSupabaseAuth";

const App: React.FC = () => {
  const { user, isLoading, signOut, sendMagicLink } = useSupabaseAuth();

  return (
    <div>
      <Header
        user={user}
        isLoading={isLoading}
        onSignOut={signOut}
        onSendMagicLink={sendMagicLink}
      />
      <Hero />
      <Services />
      <About />
      <Contact user={user} />
      <Inbox user={user} />
      <Footer />
    </div>
  );
};

export default App;
