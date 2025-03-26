import {IonTabBar, IonTabButton} from "@ionic/react";
import {Box, Ellipsis, Star} from "lucide-react";
import {useCurrentPath} from "@/hooks/get-location";
import {memo, useEffect} from "react";
import { useTranslation } from 'react-i18next';
import { useNavigate } from "react-router-dom";

const routes = [
    {
        name: "reviews",
        href: "/reviews",
    },
    {
        name: "items",
        href: "/items",
    },
    {
        name: "more",
        href: "/more",
    },
]

const TabBar = memo(() => {
    const { t } = useTranslation();
    const pathname = useCurrentPath();
    const navigate = useNavigate();

    useEffect(() => {
        // Redirect to the first tab if the current path is /
        if (pathname === "/") {
            navigate(routes[0].href);
        }
    }, [pathname, navigate]);

    return (
        <IonTabBar slot="bottom" className="flex bg-transparent justify-around min-h-24 border-t-2 border-t-primary">
            <IonTabButton rel="prefetch" tab={routes[0].name} href={routes[0].href} className="w-full h-full">
                <div className={`flex flex-col justify-center items-center p-3 w-full h-full safe-area-padding-bottom ${routes[0].href === pathname ? "bg-tertiary text-tertiary-foreground" : "text-primary"}`}>
                    <Star size={40} strokeWidth={routes[0].href === pathname ? 2 : 1} />
                    {t('reviews')}
                </div>
            </IonTabButton>

            <IonTabButton rel="prefetch" tab={routes[1].name} href={routes[1].href} className="w-full h-full">
                <div className={`flex flex-col justify-center items-center p-3 w-full h-full safe-area-padding-bottom ${routes[1].href === pathname ? "bg-tertiary text-tertiary-foreground" : "text-primary"}`}>
                    <Box  size={40} strokeWidth={routes[1].href === pathname ? 2 : 1} />
                    {t(routes[1].name)}
                </div>
            </IonTabButton>

            <IonTabButton rel="prefetch" tab={routes[2].name} href={routes[2].href} className="w-full h-full">
                <div className={`flex flex-col justify-center items-center p-3 w-full h-full safe-area-padding-bottom ${routes[2].href === pathname ? "bg-tertiary text-tertiary-foreground" : "text-primary"}`}>
                    <Ellipsis  size={40} strokeWidth={routes[2].href === pathname ? 2 : 1} />
                    {t(routes[2].name)}
                </div>
            </IonTabButton>
        </IonTabBar>
    );
});

export default TabBar;