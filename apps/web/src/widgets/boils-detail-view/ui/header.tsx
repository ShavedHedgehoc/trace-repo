import { mapPlants } from '@/shared/lib';
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/shared/ui';
import { QRCodeSVG } from 'qrcode.react';
import type { TBoilDetailResponse } from '@repo/schemas';
import { format } from 'date-fns';

export function BoilDetailHeader({ data }: { data: TBoilDetailResponse }) {
  const barcodeValue = `(${data?.batchName})(00)(00000/)(${data?.productId})`;
  return (
    <div className="grid grid-cols-1 gap-4  *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card *:data-[slot=card]:shadow-xs dark:*:data-[slot=card]:bg-card">
      <Card className="@container/card relative">
        <div className="absolute top-4 right-4 rounded-xl border p-4  bg-background dark:bg-foreground dark:text-background">
          <QRCodeSVG
            value={barcodeValue}
            size={80}
            level="H"
            bgColor="transparent"
            fgColor="currentColor"
          />
        </div>
        <CardHeader>
          <CardDescription>{data && format(data.boilDate, 'dd-MM-yyyy')}</CardDescription>
          <CardTitle className="text-xl font-semibold tabular-nums @[250px]/card:text-2xl">
            {data?.productMarking}
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">Партия: {data?.batchName ?? ''}</div>
          <div className="text-muted-foreground">{mapPlants(data?.plantAbb)}</div>
        </CardFooter>
      </Card>
    </div>
  );
}
