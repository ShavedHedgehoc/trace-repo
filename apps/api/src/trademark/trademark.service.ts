import { Injectable } from '@nestjs/common';
import { mssqlPrisma, Prisma } from '@repo/db';
import { ITrademarkService } from '@repo/trpc';
import {
  TGetTrademarksListInput,
  TTrademarkListResponse,
  TTrademarkListRow,
} from '@repo/schemas';

@Injectable()
export class TrademarkService implements ITrademarkService {
  constructor() { }

  async getTrademarks(input: TGetTrademarksListInput): Promise<TTrademarkListResponse> {
    const { trademarkName, productName, productCode, page, limit } = input;
    const andConditions: Prisma.TrademarksWhereInput[] = [{ Lots: { some: {} } }];

    if (trademarkName !== '') {
      andConditions.push({
        TrademarkName: { contains: trademarkName.toLowerCase() },
      });
    }

    if (productName !== '' || productCode !== '') {
      andConditions.push({
        Lots: {
          some: {
            Products: {
              AND: [
                productName !== '' ? { ProductName: { contains: productName.toLowerCase() } } : {},
                productCode !== '' ? { ProductId: { contains: productCode.toLowerCase() } } : {},
              ],
            },
          },
        },
      });
    }

    const where: Prisma.TrademarksWhereInput = { AND: andConditions };

    const [trademarks, distinctCount] = await Promise.all([
      mssqlPrisma.trademarks.findMany({
        where,
        distinct: ['TrademarkName'],
        skip: (page - 1) * limit,
        take: limit,
        include: { Lots: { include: { Products: true } } },
      }),
      mssqlPrisma.trademarks.groupBy({
        by: ['TrademarkName'],
        where: where,
        _count: {
          TrademarkName: true,
        },
      }),
    ]);

    const rows: TTrademarkListRow[] = trademarks.map((t) => {
      const firstLot = t.Lots?.[0];
      const firstProduct = firstLot?.Products;
      return {
        trademarkId: t.TrademarkPK,
        trademarkName: t.TrademarkName,
        productId: firstProduct?.ProductId || '',
        productName: firstProduct?.ProductName || '',
      };
    });
    const total = distinctCount.length;
    const totalPages = Math.ceil(total / limit);

    return { rows, total, totalPages };
  }
}
