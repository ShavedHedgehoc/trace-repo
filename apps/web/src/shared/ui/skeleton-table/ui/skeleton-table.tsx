
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Skeleton
} from "@/shared/ui";

export function SkeletonTable({
    rows = 10,
    columns = 5,
}: {
    rows?: number;
    columns?: number;
}) {
    return (
        <div className="rounded-md border border-border/40">
            <Table>
                <TableHeader>
                    <TableRow>
                        {Array.from({ length: columns }).map((_, i) => (
                            <TableHead key={i}>
                                <Skeleton className="h-4 w-[80%]" />
                            </TableHead>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {Array.from({ length: rows }).map((_, i) => (
                        <TableRow key={i}>
                            {Array.from({ length: columns }).map((_, j) => (
                                <TableCell key={j}>
                                    <Skeleton className="h-4 w-full" />
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}