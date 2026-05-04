import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    SkeletonTable,

} from "@/shared/ui";
import { cn } from "@/shared/lib";
import { motion, AnimatePresence } from "framer-motion";
import type { DataViewLayoutProps, PaginationParams } from "../model";
import { DataTable } from "./data-table";
import { TablePagination } from "./pagination";

export function DataViewLayout<TData, T extends PaginationParams>(
    props: DataViewLayoutProps<TData, T>,
) {
    const isLoadingInitial = !props.data;
    const isPending = props.isFetching;
    return (
        <div
            className={cn(
                "container mx-auto py-6 transition-all duration-500 relative",
                props.className,
                isPending && "opacity-60 grayscale-50 pointer-events-none",
            )}
        >
            {props.isFetching && (
                <div className="absolute top-0 left-0 right-0 h-0.5 bg-current/30 primary/30 animate-pulse z-20" />
            )}
            <Card className="w-full bg-background shadow-none ">
                <CardHeader className="relative">
                    <div className="flex justify-between items-start">
                        <div>
                            <CardTitle className="text-2xl font-semibold tracking-tight">
                                {props.title}
                            </CardTitle>
                            <CardDescription>{props.description}</CardDescription>
                        </div>
                        <CardAction>{props.picture}</CardAction>
                    </div>
                </CardHeader>
                <CardContent className={cn(" flex flex-col gap-6", props.data.length === 0 && "min-h-[600px]")}>
                    <div
                        className={cn(
                            "sticky top-0 z-10 bg-background/95 backdrop-blur pb-4 transition-all",
                            isPending && "pointer-events-none grayscale-30",
                        )}
                    >
                        {props.filter}
                    </div>
                    <AnimatePresence mode="wait" initial={false}>
                        {isLoadingInitial ? (
                            <motion.div
                                key="skeleton"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <SkeletonTable
                                    rows={props.params.limit}
                                    columns={props.columns.length}
                                />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="data"
                                initial={{ opacity: 0, y: 5 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <div className={cn(isPending && "pointer-events-none")}>
                                    <DataTable
                                        columns={props.columns}
                                        data={props.data!}
                                        getRowClassName={props.getRowClassName}
                                    />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
                <CardFooter
                    className={cn(
                        "flex flex-row justify-between items-center border-t pt-6 transition-all",
                        isPending && "pointer-events-none opacity-50",
                    )}
                >
                    <p className="text-sm text-muted-foreground tabular-nums">
                        Всего записей:{" "}
                        <span className="font-medium text-foreground">{props.total}</span>
                    </p>
                    <TablePagination
                        totalPages={props.totalPages}
                        total={props.total}
                        params={props.params}
                        setParams={props.setParams}
                    />
                </CardFooter>
            </Card>
        </div>
        // </div>
    );
}