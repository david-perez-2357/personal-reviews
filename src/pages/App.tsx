import '@/styles/App.css'
import '@ionic/react/css/core.css';
import { IonApp, IonContent } from "@ionic/react";
import { useEffect } from "react";
import { initDB } from "@/lib/database-service";
import { ThemeProvider } from "@/components/theme-provider";

function App() {
    useEffect(() => {
        initDB();
    }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <IonApp>
            <IonContent>
                <div>
                    <div className="flex justify-center mt-8">

                    </div>
                </div>
            </IonContent>
        </IonApp>
    </ThemeProvider>
  )
}

export default App
