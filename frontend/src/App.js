import { Space } from "antd";
import "./App.css"
import AppHeader from "./components/AppHeader/AppHeader";
import SideBar from "./components/SideBar/SideBar";
import PageContent from "./components/PageContent/PageContent";

function App() {
   return (
      <div className="App">
         <AppHeader />
         <Space className="SideBaraANDPageContent">
            <SideBar />
            <PageContent></PageContent>
         </Space>

      </div>
   );
}

export default App;
