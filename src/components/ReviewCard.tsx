import {Card} from "@/components/ui/card";
import {Ham, SquarePen, Star} from "lucide-react";
import {ReviewCardDTO} from "@/dto/review/ReviewCardDTO";

const ReviewCard = ({review}: { review: ReviewCardDTO }) => {
    return (
        <div className="flex flex-col gap-3">
            <Card className="py-4">
                <div className="flex flex-col px-3 gap-4">
                    <div className="grid grid-cols-[1fr_auto]">
                        <div className="flex flex-row items-center text-muted-foreground gap-3">
                            <Ham size={20}></Ham>
                            <span className="font-bold text-md">{review.item}</span>
                        </div>
                        <SquarePen className="bg-card-foreground text-primary-foreground rounded-sm p-1 w-6 h-6"></SquarePen>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row gap-1">
                            {[...Array(review.rating)].map((_, index) => (
                                <Star key={index} fill="yellow" strokeWidth={0} size={30}></Star>
                            ))}
                        </div>
                        <span className="text-primary">{review.comment}</span>
                    </div>
                </div>
            </Card>
        </div>
    );
}

export default ReviewCard;