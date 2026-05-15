import { Button } from '@/shared/ui';
import type { TBoilDetailResponse } from '@repo/schemas';
import { Sheet } from 'lucide-react';
import { makeAllXLSX } from '../lib/make-all-xlsx';

export function AllXLSXButton({ data }: { data: TBoilDetailResponse }) {
  const handleClick = () => {
    makeAllXLSX(data);
  };
  return (
    <Button variant="ghost" onClick={handleClick}>
      <Sheet />
      Скачать все
    </Button>
  );
}
