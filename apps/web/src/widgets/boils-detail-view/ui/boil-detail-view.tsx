import { trpc } from '@/shared/api';
import { ROUTE_PARAMS } from '@/shared/constants';
import { useParams } from 'react-router-dom';
import { TableTabs } from './table-tabs';
import { BoilDetailHeader } from './header';

export function BoilDetailView() {
  const params = useParams<typeof ROUTE_PARAMS.BOIL_PARAMS>();
  const boilId: string | undefined = params.boilId;
  const { data, isFetching, isPlaceholderData } = trpc.boil.getDetail.useQuery(
    {
      boilId: Number(boilId),
    },
    {
      keepPreviousData: true,
      enabled: !!boilId,
    },
  );

  return (
    <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-6">
      <BoilDetailHeader data={data} />
      <TableTabs data={data} isFetching={isFetching} isPlaceholderData={isPlaceholderData} />
    </div>
  );
}
