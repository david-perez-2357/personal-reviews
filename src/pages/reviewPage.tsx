import React, {useMemo, useRef} from "react";
import "@/styles/App.css";
import "@ionic/react/css/core.css";
import {ArrowUpDown, Funnel, Search} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/Input";
import ReviewCard from "@/components/ReviewCard";

import {
    IonButton,
    IonModal,
    IonContent,
    IonTitle,
    IonList,
    IonItem,
    IonLabel,
    IonAvatar,
    IonImg,
    IonSearchbar, IonCard,
} from '@ionic/react';

// Tipos y DTOs
import {ReviewCardDTO} from "@/dto/review/ReviewCardDTO";

/**
 * Formatea la fecha al estilo "hoy, 27 de marzo" o similar.
 * @param date - string con la fecha en formato ISO u otro
 * @returns string con la fecha formateada
 */
function formatDate(date: string): string {
    const dateObj = new Date(date);
    const today = new Date();
    const day = dateObj.getDate();
    const month = dateObj.toLocaleString("default", {month: "long"});
    const year = dateObj.getFullYear();
    const dayOfWeek = dateObj.toLocaleString("default", {weekday: "long"});

    const isToday = dateObj.toDateString() === today.toDateString();
    const isCurrentYear = year === today.getFullYear();

    if (isToday) {
        return `hoy, ${day} de ${month}`;
    } else if (isCurrentYear) {
        return `${dayOfWeek}, ${day} de ${month}`;
    } else {
        return `${dayOfWeek}, ${day} de ${month} de ${year}`;
    }
}

const mockReviews: ReviewCardDTO[] = [
    {
        id: 1,
        comment: "Muy bueno",
        rating: 5,
        created_at: "2025-03-26",
        updated_at: "2021-09-01",
        images: [],
        category: "Comida",
        item: "Pizza",
    },
    {
        id: 2,
        comment: "Muy malo",
        rating: 1,
        created_at: "2021-09-01",
        updated_at: "2021-09-01",
        images: [],
        category: "Comida",
        item: "Hamburguesa",
    },
    {
        id: 3,
        comment: "Regular",
        rating: 3,
        created_at: "2021-09-01",
        updated_at: "2021-09-01",
        images: [],
        category: "Comida",
        item: "Tacos",
    },
];

export const ReviewPage: React.FC = () => {
    const modal = useRef<HTMLIonModalElement>(null);

    // Agrupación de reseñas por fecha (useMemo para optimizar)
    const reviewCardsByDate = useMemo(() => {
        return mockReviews.reduce((acc, review) => {
            const dateKey = new Date(review.created_at).toISOString().split("T")[0];
            if (!acc[dateKey]) {
                acc[dateKey] = [];
            }
            acc[dateKey].push(review);
            return acc;
        }, {} as Record<string, ReviewCardDTO[]>);
    }, []);

    return (
        <IonContent className="relative overflow-visible p-4 h-full">
            <div className="flex flex-col gap-10">
                {/* Tarjeta de estadísticas y botón para abrir el Drawer */}
                <section className="flex flex-col gap-3">
                    <IonCard
                        className="flex flex-col text-center text-primary items-center justify-center w-full h-20 border-2 border-foreground rounded-lg">
                        <span className="text-4xl font-bold w-full">33</span>
                        <span className="font-semibold">reseñas</span>
                    </IonCard>
                    <Button className="w-full px-2 py-1 bg-primary text-primary-foreground">
                        Hacer una nueva reseña
                    </Button>
                </section>

                {/* Sección de búsqueda */}
                <section className="flex flex-col gap-3">
                    <IonTitle className="text-4xl font-semibold text-primary">
                        Buscar
                    </IonTitle>
                    <div className="grid grid-cols-[1fr_auto_auto] gap-3">
                        <div className="relative w-full h-10">
                            <Input
                                type="text"
                                placeholder="Buscar reseñas..."
                                className="rounded-lg bg-input text-muted-foreground border-none pl-5"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-primary">
                  <Search size={20}/>
                </span>
                        </div>

                        <div className="w-10 h-10 bg-input rounded-lg flex items-center justify-center text-primary">
                            <ArrowUpDown size={20}/>
                        </div>
                        <div className="w-10 h-10 bg-input rounded-lg flex items-center justify-center text-primary">
                            <Funnel size={20}/>
                        </div>
                    </div>

                    {/* Listado de reseñas por fecha */}
                    <div className="flex flex-col gap-3">
                        {Object.entries(reviewCardsByDate).map(([date, reviews]) => (
                            <div key={date} className="flex flex-col gap-3">
                                <span className="text-primary">{formatDate(date)}</span>
                                {reviews.map((review) => (
                                    <ReviewCard key={review.id} review={review}/>
                                ))}
                            </div>
                        ))}
                    </div>
                </section>
            </div>

            <IonButton id="open-modal" expand="block">
                Open Sheet Modal
            </IonButton>
            <IonModal ref={modal} trigger="open-modal" initialBreakpoint={0.25} breakpoints={[0, 0.25, 0.5, 0.75]}>
                <IonContent className="ion-padding">
                    <IonSearchbar onClick={() => modal.current?.setCurrentBreakpoint(0.75)}
                                  placeholder="Search"></IonSearchbar>
                    <IonList>
                        <IonItem>
                            <IonAvatar slot="start">
                                <IonImg src="https://i.pravatar.cc/300?u=b"/>
                            </IonAvatar>
                            <IonLabel>
                                <h2>Connor Smith</h2>
                                <p>Sales Rep</p>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonAvatar slot="start">
                                <IonImg src="https://i.pravatar.cc/300?u=a"/>
                            </IonAvatar>
                            <IonLabel>
                                <h2>Daniel Smith</h2>
                                <p>Product Designer</p>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonAvatar slot="start">
                                <IonImg src="https://i.pravatar.cc/300?u=d"/>
                            </IonAvatar>
                            <IonLabel>
                                <h2>Greg Smith</h2>
                                <p>Director of Operations</p>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonAvatar slot="start">
                                <IonImg src="https://i.pravatar.cc/300?u=e"/>
                            </IonAvatar>
                            <IonLabel>
                                <h2>Zoey Smith</h2>
                                <p>CEO</p>
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </IonContent>
            </IonModal>
        </IonContent>
    );
};

export default ReviewPage;
