import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui';
import type { TLotDetailData } from '@repo/schemas';

export function LotDetailHeader({ data }: { data: TLotDetailData }) {
  return (
    <div className="grid grid-cols-1 gap-4  *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Данные о квазипартии</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-xl">
            {data?.lotName ?? ''}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Сырье:</div>
          <div className="line-clamp-1 flex gap-2 font-medium">
            {data?.productId ?? ''} {data?.productName ?? ''}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
