import { trpc } from '@/shared/api';
import { DataViewLayout, type DataViewLayoutProps } from '@/shared/ui';
import { useMemo } from 'react';
import { getBoilsColumns } from './columns';
import type { TBoilListRow } from '@repo/schemas';
import { useBoilsSearchParams, type BoilsParams } from '@/entities/boil';
import { SectionCards } from './cards';

export function BoilsView() {
    const { params, setParams } = useBoilsSearchParams();

    const { data, isFetching, isPlaceholderData } = trpc.boil.list.useQuery(params, {
        keepPreviousData: true,
    });
    const columns = useMemo(() => getBoilsColumns(), []);

    const dataViewProps: DataViewLayoutProps<TBoilListRow, BoilsParams> = {
        title: 'Варки',
        description: 'Список варок',
        data: data?.rows,
        columns: columns,
        total: data?.total ?? 0,
        totalPages: data?.totalPages ?? 0,
        picture: <></>,
        filter: <></>,
        params: params,
        setParams: setParams,
        isFetching: isFetching || isPlaceholderData,
    };

    return (
        <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
            <SectionCards />

            <DataViewLayout {...dataViewProps} />
        </div>


    );
}
