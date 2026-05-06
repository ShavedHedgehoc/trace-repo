
import { cn } from "@/shared/lib";
import {
    Button,
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/shared/ui";
import { TriangleAlert } from "lucide-react";


export function Informer({ productCode }: { productCode: string }) {
    return (
        <TooltipProvider>
            <Tooltip>
                <button>
                    <TooltipTrigger asChild>
                        <span>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "h-8 w-8 p-0",
                                )}
                            >
                                <TriangleAlert />
                            </Button>
                        </span>
                    </TooltipTrigger>
                </button>
                <TooltipContent>
                    <p>Строки плана отсутствуют!</p>

                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}