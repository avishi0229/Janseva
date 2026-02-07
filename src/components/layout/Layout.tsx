import { useState, useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isLargeText, setIsLargeText] = useState(false);

  useEffect(() => {
    // Check for saved preference
    const saved = localStorage.getItem("janseva-large-text");
    if (saved === "true") {
      setIsLargeText(true);
      document.documentElement.classList.add("large-text");
    }
  }, []);

  const toggleLargeText = () => {
    setIsLargeText(!isLargeText);
    if (!isLargeText) {
      document.documentElement.classList.add("large-text");
      localStorage.setItem("janseva-large-text", "true");
    } else {
      document.documentElement.classList.remove("large-text");
      localStorage.setItem("janseva-large-text", "false");
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header onToggleLargeText={toggleLargeText} isLargeText={isLargeText} />
      <main id="main-content" className="flex-1" tabIndex={-1}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
