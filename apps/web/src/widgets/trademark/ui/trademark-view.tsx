import { trpc } from "@/shared/api";
import { DataViewLayout, type DataViewLayoutProps } from "@/shared/ui";
import { useMemo } from "react";
import { getTrademarksColumns } from "./columns";
import type { TTrademarkListRow } from "@repo/trpc";
import { useTrademarksSearchParams } from "@/entities/trademark";
import type { TrademarksParams } from "@/entities/trademark/model";

export function TrademarkView() {
    const { params, setParams } = useTrademarksSearchParams();

    const { data, isFetching, isPlaceholderData } = trpc.trademark.list.useQuery(params,
        { keepPreviousData: true }
    );
    const columns = useMemo(() => getTrademarksColumns(), []);

    const dataViewProps: DataViewLayoutProps<TTrademarkListRow, TrademarksParams> = {
        title: "Торговые названия",
        description: "Список торговых названий",
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
        // <div>
        <DataViewLayout {...dataViewProps} />
        // </div>
    )
}