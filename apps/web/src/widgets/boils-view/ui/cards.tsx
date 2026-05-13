import { trpc } from '@/shared/api';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui';
import type { TGetBoilsStatsInput } from '@repo/schemas';

export function BoilsSectionCards({ startDate, endDate }: TGetBoilsStatsInput) {
  const { data } = trpc.boil.getStats.useQuery(
    { startDate, endDate },
    {
      keepPreviousData: true,
    },
  );
  return (
    <div className="grid grid-cols-1 gap-4  *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Пискаревка</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.totalBoilsPsk.toLocaleString('ru-RU') ?? ''}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Количество варок</div>
          <div className="text-muted-foreground">Общее количество за период</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Колпино</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.totalBoilsKlp.toLocaleString('ru-RU') ?? ''}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Количество варок</div>
          <div className="text-muted-foreground">Общее количество за период</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Пискаревка</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.totalLoadsPsk.toLocaleString('ru-RU') ?? ''}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Масса загруженного сырья</div>
          <div className="text-muted-foreground">Общее количество за период</div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader>
          <CardDescription>Колпино</CardDescription>
          <CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
            {data?.totalLoadsKlp.toLocaleString('ru-RU') ?? ''}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Масса загруженного сырья</div>
          <div className="text-muted-foreground">Общее количество за период</div>
        </CardFooter>
      </Card>
    </div>
  );
}
