import { Injectable } from '@nestjs/common';
import { mssqlPrisma, Prisma } from '@repo/db';
import {
  TGetLotDetailInput,
  TLotDetailBoilRow,
  TLotDetailData,
  TLotDetailResponse,
  TLotDetailXLSXResponse,
} from '@repo/schemas';
import { ILotService } from '@repo/trpc';

type TLotWithRelations = Prisma.LotsGetPayload<{
  include: {
    Products: true;
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
      productId: lot.ProductId,
      productName: lot.Products?.ProductName || lot.Products?.ProductMarking || '',
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
    const { lotId, startDate, endDate, plants, batchName, productId, productMarking, page, limit } =
      input;

    const startOfDay = new Date(startDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(endDate);
    endOfDay.setHours(23, 59, 59, 999);

    const lot = await mssqlPrisma.lots.findUnique({
      where: { LotPK: lotId },
      include: {
        Products: true,
        Sellers: true,
        Manufacturers: true,
        ManufacturerLots: true,
        Trademarks: true,
      },
    });

    if (!lot) {
      throw new Error(`Партия с id ${lotId} не найдена`);
    }

    const andConditions: Prisma.WeightingsWhereInput[] = [
      { LotPK: lot.LotPK },
      { Batchs: { BatchDate: { gte: new Date(startOfDay), lte: endOfDay } } },
    ];

    if (batchName !== '') {
      andConditions.push({ Batchs: { BatchName: { contains: batchName } } });
    }

    if (plants?.length) {
      andConditions.push({ Batchs: { Plant: { in: plants } } });
    }

    if (productId !== '') {
      andConditions.push({
        Batchs: {
          BtProducts: {
            some: {
              Products: {
                ProductId: {
                  contains: productId.toLowerCase(),
                },
              },
            },
          },
        },
      });
    }

    if (productMarking !== '') {
      andConditions.push({
        Batchs: {
          BtProducts: {
            some: {
              Products: {
                ProductMarking: {
                  contains: productMarking.toLowerCase(),
                },
              },
            },
          },
        },
      });
    }

    const where: Prisma.WeightingsWhereInput = { AND: andConditions };
    const uniqueWeightings = await mssqlPrisma.weightings.findMany({
      where,
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

  async getDetailXLSX(input: TGetLotDetailInput): Promise<TLotDetailXLSXResponse> {
    const { lotId, startDate, endDate, plants, batchName, productId, productMarking } = input;

    const startOfDay = new Date(startDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(endDate);
    endOfDay.setHours(23, 59, 59, 999);

    const lot = await mssqlPrisma.lots.findUnique({
      where: { LotPK: lotId },
      include: {
        Products: true,
        Sellers: true,
        Manufacturers: true,
        ManufacturerLots: true,
        Trademarks: true,
      },
    });

    if (!lot) {
      throw new Error(`Партия с id ${lotId} не найдена`);
    }

    const andConditions: Prisma.WeightingsWhereInput[] = [
      { LotPK: lot.LotPK },
      { Batchs: { BatchDate: { gte: new Date(startOfDay), lte: endOfDay } } },
    ];

    if (batchName !== '') {
      andConditions.push({ Batchs: { BatchName: { contains: batchName } } });
    }

    if (plants?.length) {
      andConditions.push({ Batchs: { Plant: { in: plants } } });
    }

    if (productId !== '') {
      andConditions.push({
        Batchs: {
          BtProducts: {
            some: {
              Products: {
                ProductId: {
                  contains: productId.toLowerCase(),
                },
              },
            },
          },
        },
      });
    }

    if (productMarking !== '') {
      andConditions.push({
        Batchs: {
          BtProducts: {
            some: {
              Products: {
                ProductMarking: {
                  contains: productMarking.toLowerCase(),
                },
              },
            },
          },
        },
      });
    }

    const where: Prisma.WeightingsWhereInput = { AND: andConditions };
    const uniqueWeightings = await mssqlPrisma.weightings.findMany({
      where,
      distinct: ['BatchPK'],
      select: {
        BatchPK: true,
      },
    });

    if (uniqueWeightings.length === 0) {
      return {
        data: this.mapLotData(lot),
        rows: [],
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
    const data = this.mapLotData(lot);
    return { data, rows };
  }
}
