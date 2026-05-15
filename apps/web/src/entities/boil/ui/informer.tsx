import { cn } from '@/shared/lib';
import {
  Badge,
  Button,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/shared/ui';
import type { TBoilListRow } from '@repo/schemas';
import { Circle, TriangleAlert } from 'lucide-react';

type IBoilInformerVariant = 'common' | 'weightings' | 'loads';

interface IBoilInformerProps {
  row: TBoilListRow;
  variant: IBoilInformerVariant;
}

const truncate = (str: string | null, n: number) => {
  if (!str) return '';
  return str.length > n ? str.slice(0, n) + '...' : str;
};
const Indicator = ({ condition, className }: { condition: boolean; className?: string }) => {
  return (
    <Circle
      className={cn(
        condition ? 'fill-green-500 dark:fill-green-400' : 'fill-red-500 dark:fill-red-400',
        className,
      )}
    />
  );
};

const InfoBadge = ({ condition }: { condition: boolean }) => {
  return (
    <Badge variant="outline" className="px-1.5 text-muted-foreground">
      <Indicator condition={condition} />
      {condition ? 'Успешно' : 'Проблема'}
    </Badge>
  );
};

export function Informer({ row, variant }: IBoilInformerProps) {
  const trigger: React.ReactNode = {
    common: <TriangleAlert className="text-red-700 dark:text-red-500" />,
    weightings: <InfoBadge condition={row.wCheck} />,
    loads: <InfoBadge condition={row.lCheck} />,
  }[variant as IBoilInformerVariant];

  const content: React.ReactNode = {
    common: (
      <div>
        {!row.wCheck && <p>Проблемы со взвешиваниями</p>}
        {!row.lCheck && <p>Проблемы с загрузками</p>}
      </div>
    ),
    weightings: (
      <Table>
        <TableBody className="border-none">
          {row.weightingResult.map((w) => (
            <TableRow key={w.productId} className="text-xs border-none">
              <TableCell className="py-0 text-xs" align="center">
                <Indicator className="h-2" condition={w.planQty === w.factQty} />
              </TableCell>
              <TableCell className="py-0 tabular-nums " align="center">
                {w.productId}
              </TableCell>
              <TableCell className="py-0 ">
                {truncate(w.productName ?? w.productMarking, 15)}
              </TableCell>
              <TableCell className="py-0" align="center">
                {w.planQty}
              </TableCell>
              <TableCell className="py-0 " align="center">
                {w.factQty}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
    loads: (
      <Table>
        <TableBody className="border-none">
          {row.weightingResult.map((w) => (
            <TableRow key={w.productId} className="text-xs border-none">
              <TableCell className="py-0" align="center">
                <Indicator className="h-2" condition={w.planQty === w.loadQty} />
              </TableCell>
              <TableCell className="py-0 tabular-nums" align="center">
                {w.productId}
              </TableCell>
              <TableCell className="py-0 ">
                {truncate(w.productName ?? w.productMarking, 15)}
              </TableCell>
              <TableCell className="py-0" align="center">
                {w.planQty}
              </TableCell>
              <TableCell className="py-0 " align="center">
                {w.loadQty}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    ),
  }[variant as IBoilInformerVariant];

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" className={cn('h-8 w-8 p-0')}>
            {trigger}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-md!">{content}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
