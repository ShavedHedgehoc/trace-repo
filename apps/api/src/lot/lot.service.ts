import { Injectable } from '@nestjs/common';
import { mssqlPrisma, Prisma } from '@repo/db';
import {
  TGetLotDetailInput,
  TLotDetailBoilRow,
  TLotDetailData,
  TLotDetailResponse,
} from '@repo/schemas';
import { ILotService } from '@repo/trpc';

type TLotWithRelations = Prisma.LotsGetPayload<{
  include: {
    Sellers: true;
    Manufacturers: true;
    ManufacturerLots: true;
    Trademarks: true;
  };
}>;

@Injectable()
export class LotService implements ILotService {
  private mapLotData(lot: TLotWithRelations): TLotDetailData {
    return {
      lotId: Number(lot.LotPK),
      lotName: lot.LotName,
      sellerId: Number(lot.SellerPK),
      sellerName: lot.Sellers?.SellerName || '',
      manufacturerId: Number(lot.ManufacturerPK),
      manufacturerName: lot.Manufacturers?.ManufacturerName || '',
      manufacturerLotId: Number(lot.ManufacturerLotPK),
      manufacturerLotName: lot.ManufacturerLots?.ManufacturerLotName || '',
      trademarkId: Number(lot.TradeMarkPK),
      trademarkName: lot.Trademarks?.TrademarkName || '',
    };
  }
  async getDetail(input: TGetLotDetailInput): Promise<TLotDetailResponse> {
    const { lotId, page, limit } = input;
    const lot = await mssqlPrisma.lots.findUnique({
      where: { LotPK: lotId },
      include: {
        Sellers: true,
        Manufacturers: true,
        ManufacturerLots: true,
        Trademarks: true,
      },
    });

    if (!lot) {
      throw new Error(`Партия с id ${lotId} не найдена`);
    }
    const uniqueWeightings = await mssqlPrisma.weightings.findMany({
      where: {
        LotPK: lot.LotPK,
      },
      distinct: ['BatchPK'],
      select: {
        BatchPK: true,
      },
    });

    if (uniqueWeightings.length === 0) {
      return {
        data: this.mapLotData(lot),
        rows: [],
        total: 0,
        totalPages: 0,
      };
    }
    const batchIds = uniqueWeightings.map((w) => w.BatchPK);
    const batchDetails = await mssqlPrisma.batchs.findMany({
      where: {
        BatchPK: {
          in: batchIds,
        },
      },
      select: {
        BatchPK: true,
        BatchName: true,
        BatchDate: true,
        Plant: true,
        BtProducts: {
          select: {
            Products: {
              select: {
                ProductId: true,
                ProductMarking: true,
              },
            },
          },
        },
        vwPlanAggregateds: {
          select: {
            BatchPK: true,
          },
        },
      },
      orderBy: [{ BatchYear: 'asc' }, { BatchMonth: 'asc' }, { BatchNumber: 'asc' }],
      skip: (page - 1) * limit,
      take: limit,
    });
    const rows: TLotDetailBoilRow[] = batchDetails.map((b) => {
      const product = b.BtProducts?.[0]?.Products;
      const hasPlan = !!b.vwPlanAggregateds;

      return {
        boilId: Number(b.BatchPK),
        boilDate: b.BatchDate ? new Date(b.BatchDate) : new Date(),
        batchName: hasPlan ? b.BatchName : '',
        productId: product?.ProductId ?? '',
        productMarking: product?.ProductMarking ?? '',
        plantAbb: b.Plant ?? '',
        hasPlan,
      };
    });

    const total = uniqueWeightings.length;
    const totalPages = Math.ceil(total / limit);
    const data = this.mapLotData(lot);

    return { data, rows, total, totalPages };
  }
}
