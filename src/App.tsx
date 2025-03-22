import './App.css'
import '@ionic/react/css/core.css';
import {IonApp, IonContent} from "@ionic/react";
import {Button} from "@/components/ui/button.tsx";
import { useEffect } from "react";
import { sqliteService } from "./lib/sqliteService";

function App() {
    useEffect(() => {
        const initDB = async () => {
            await sqliteService.initializeDB();
        };
        initDB();
    }, []);

  return (
    <>
        <IonApp>
            <IonContent>
                <div className="w-full h-full ">
                    <Button>Pepep</Button>
                </div>
            </IonContent>
        </IonApp>
    </>
  )
}

export default App
