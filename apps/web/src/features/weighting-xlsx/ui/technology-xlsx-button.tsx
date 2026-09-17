import { Button } from '@/shared/ui';
import type { TBoilDetailResponse } from '@repo/schemas';
import { Sheet } from 'lucide-react';
import { makeTechnologyXLSX } from '../lib/make-technology-xlsx';

export function TechnologyXLSXButton({ data }: { data: TBoilDetailResponse }) {
  const handleClick = () => {
    makeTechnologyXLSX(data);
  };
  return (
    <Button variant="ghost" size="sm" onClick={handleClick}>
      <Sheet />
      Скачать техкарту
    </Button>
  );
}
