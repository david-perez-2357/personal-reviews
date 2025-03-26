import '@/styles/App.css'
import '@ionic/react/css/core.css';
import {
    IonApp,
    IonRouterOutlet,
    IonTabs,
} from "@ionic/react";
import { useEffect } from "react";
import { initDB } from "@/lib/database-service";
import { ThemeProvider } from "@/components/ThemeProvider";
import { SafeArea } from "@capacitor-community/safe-area";
import { initialize } from '@capacitor-community/safe-area';
import '@capacitor-community/safe-area';
import {
    BrowserRouter, Route, Routes
} from "react-router";
import TabBar from "@/components/FooterTabBar";
import { SplashScreen } from "@capacitor/splash-screen";


const App = () => {
    useEffect(() => {
        // Initialize the SafeArea plugin
        SafeArea.enable({
            config: {
                customColorsForSystemBars: true,
                statusBarColor: '#00000000', // transparent
                statusBarContent: 'light',
                navigationBarColor: '#00000000', // transparent
                navigationBarContent: 'light',
            }
        });
        initialize();

        // Hide the splash screen
        SplashScreen.hide();

        // Initialize the database
        initDB();
    }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <BrowserRouter>
            <IonApp>
                <IonTabs className="ion-padding">
                    <IonRouterOutlet>
                        <div className="safe-area-padding-top ps-5 pe-5">
                            <Routes>
                                <Route path="/reviews" />
                                <Route path="/items" />
                                <Route path="/more" />
                            </Routes>
                        </div>
                    </IonRouterOutlet>

                    <TabBar/>
                </IonTabs>
            </IonApp>
        </BrowserRouter>
    </ThemeProvider>
  )
}

export default App;