import { Button } from '@/shared/ui';
import { makeWeightingXLSX } from '../lib/make-weighting-xlsx';
import type { TBoilDetailResponse } from '@repo/schemas';
import { Sheet } from 'lucide-react';

export function WeightingXLSXButton({ data }: { data: TBoilDetailResponse }) {
  const handleClick = () => {
    makeWeightingXLSX(data);
  };
  return (
    <Button variant="ghost" onClick={handleClick}>
      <Sheet />
      Скачать взвешивания
    </Button>
  );
}
