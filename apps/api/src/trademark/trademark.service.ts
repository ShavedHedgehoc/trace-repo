import { Injectable } from "@nestjs/common";
import { mssqlPrisma, Prisma } from "@repo/db";
import { ITrademarkService, TGetTrademarksListInput, TTrademarkListResponse, TTrademarkListRow } from "@repo/trpc";


@Injectable()
export class TrademarkService implements ITrademarkService {
    constructor() { }

    async getTrademarks(input: TGetTrademarksListInput): Promise<TTrademarkListResponse> {
        const { trademarkName, productName, productCode, page, limit } = input
        // const where: Prisma.TrademarksWhereInput = {}
        // if (trademarkName !== "") {
        //     where.TrademarkName = { contains: trademarkName.toLowerCase() }
        // }
        // if (productName !== "" || productCode !== "") {
        //     where.Lots = {
        //         some: {
        //             Products: {
        //                 AND: [
        //                     productName !== "" ? { ProductName: { contains: productName.toLocaleLowerCase() } } : {},
        //                     productCode !== "" ? { ProductId: { contains: productCode.toLocaleLowerCase() } } : {},
        //                 ]
        //             }
        //         }
        //     }
        // }
        const andConditions: Prisma.TrademarksWhereInput[] = [
            { Lots: { some: {} } }
        ];

        // Фильтр по названию самой ТМ
        if (trademarkName !== "") {
            andConditions.push({
                TrademarkName: { contains: trademarkName.toLowerCase() }
            });
        }

        // Фильтры по продуктам внутри лотов
        if (productName !== "" || productCode !== "") {
            andConditions.push({
                Lots: {
                    some: {
                        Products: {
                            AND: [
                                productName !== "" ? { ProductName: { contains: productName.toLowerCase() } } : {},
                                productCode !== "" ? { ProductId: { contains: productCode.toLowerCase() } } : {},
                            ]
                        }
                    }
                }
            });
        }

        const where: Prisma.TrademarksWhereInput = { AND: andConditions };

        const [trademarks, distinctCount] = await Promise.all([
            mssqlPrisma.trademarks.findMany({
                where,
                distinct: ["TrademarkName"],
                skip: (page - 1) * limit,
                take: limit,
                include: { Lots: { include: { Products: true } } }
            }),
            mssqlPrisma.trademarks.groupBy({
                by: ['TrademarkName'],
                where: where,
                _count: {
                    TrademarkName: true,
                },
            })
        ])

        const rows: TTrademarkListRow[] = trademarks.map((t) => {
            const firstLot = t.Lots?.[0];
            const firstProduct = firstLot?.Products
            return {
                trademarkId: t.TrademarkPK,
                trademarkName: t.TrademarkName,
                productId: firstProduct?.ProductId || '',
                productName: firstProduct?.ProductName || '',
            }
        })
        const total = distinctCount.length
        const totalPages = Math.ceil(total / limit)

        return { rows, total, totalPages }
    }
}