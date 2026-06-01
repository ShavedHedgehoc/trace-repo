import { useState } from 'react';
import { Button } from '@/shared/ui';
import { Sheet, Loader2 } from 'lucide-react';
import { trpc } from '@/shared/api/trpc';
import { makeAllXLSX } from '../lib';
import { useLotDetailSearchParams } from '@/entities/lot';

export function MakeLotXLSXButton({ lotId, mobile }: { lotId: string; mobile: boolean }) {
  const { params } = useLotDetailSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const utils = trpc.useUtils();

  const handleClick = async () => {
    try {
      setIsLoading(true);
      const data = await utils.lot.getDetailXLSX.fetch({
        lotId: Number(lotId),
        ...params,
      });
      makeAllXLSX(data);
    } catch (error) {
      console.error('Ошибка при скачиванию XLSX:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={mobile ? 'outline' : 'ghost'}
      size="sm"
      onClick={handleClick}
      disabled={isLoading}
    >
      {isLoading ? <Loader2 className="animate-spin" /> : <Sheet />}
      {isLoading ? 'Загрузка...' : 'Скачать все'}
    </Button>
  );
}
