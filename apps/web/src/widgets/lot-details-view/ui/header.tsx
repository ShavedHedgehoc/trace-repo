import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui';
import type { TLotDetailData } from '@repo/schemas';
// import { format } from 'date-fns';

export function LotDetailHeader({ data }: { data: TLotDetailData }) {
  return (
    <div className="grid grid-cols-2 gap-4  *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{data && data.lotName}</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {data?.lotName}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {/* <div className="line-clamp-1 flex gap-2 font-medium">Партия: {data?.batchName ?? ''}</div>
          <div className="text-muted-foreground">{mapPlants(data?.plantAbb)}</div> */}
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>{data && data.lotName}</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {data?.manufacturerLotName}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          {/* <div className="line-clamp-1 flex gap-2 font-medium">Партия: {data?.batchName ?? ''}</div>
          <div className="text-muted-foreground">{mapPlants(data?.plantAbb)}</div> */}
        </CardFooter>
      </Card>
    </div>
  );
}
