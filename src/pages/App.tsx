import '@/styles/App.css'
import '@ionic/react/css/core.css';
import { IonApp, IonContent } from "@ionic/react";
import { Button } from "@/components/ui/button.tsx";
import { useEffect } from "react";
import { initDB } from "@/lib/database-service";
import { ThemeProvider } from "@/components/theme-provider";
import { SafeArea } from "@capacitor-community/safe-area";
import { initialize } from '@capacitor-community/safe-area';
import '@capacitor-community/safe-area';
import {
    BrowserRouter,
    Routes,
    Route, Link
} from "react-router-dom";


function App() {
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

    useEffect(() => {
        initDB();
    }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <IonApp>
            <IonContent class="ion-padding">
                <div className="safe-area-padding">
                    <Button>
                        pepep
                    </Button>
                    <BrowserRouter>
                        <Routes>
                            <Route path="/" element={<Link to={"/home"}>Home</Link>} />
                        </Routes>
                    </BrowserRouter>
                </div>
            </IonContent>
        </IonApp>
    </ThemeProvider>
  )
}

export default App
