import '@/styles/App.css'
import '@ionic/react/css/core.css';
import { IonApp, IonContent } from "@ionic/react";
import { useEffect } from "react";
import { initDB } from "@/lib/database-service";
import { ThemeProvider } from "@/components/theme-provider";
import {
    BrowserRouter,
    Routes,
    Route, Link
} from "react-router-dom";
import {Button} from "@/components/ui/button";

function App() {
    useEffect(() => {
        initDB();
    }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <IonApp>
            <IonContent>
                <div>
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
