import { Outlet } from "react-router-dom";
import Footer from "../../containers/footer";
import Navigation from "../../containers/navigation";
import ChatQA from "../chat";


const Layout = () => {
  return (
    <div className="app-container">
     <Navigation/>
      <main className="main-content">
        <Outlet />
        <ChatQA/>
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
