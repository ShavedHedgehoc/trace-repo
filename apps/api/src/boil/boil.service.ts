import { Injectable } from '@nestjs/common';
import { mssqlPrisma, Prisma } from '@repo/db';
import { IBoilService } from '@repo/trpc';
import {
  TGetBoilsListInput,
  TBoilListResponse,
  TBoilListRow,
  TBoilListWeightingResult,
  TGetBoilsStatsInput,
  TBoilStatsResponse,
  TGetBoilDetailInput,
  TBoilDetailResponse,
  TBoilDetailTechCardRow,
  TBoilDetailLoadRow,
  TBoilDetailWeightingRow,
} from '@repo/schemas';

@Injectable()
export class BoilService implements IBoilService {
  async getStats(input: TGetBoilsStatsInput): Promise<TBoilStatsResponse> {
    const { startDate, endDate } = input;

    const startOfDay = new Date(startDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(endDate);
    endOfDay.setHours(23, 59, 59, 999);
    const where: Prisma.vw_FinalBatchStatusWhereInput = {
      BatchDate: { gte: new Date(startOfDay), lte: endOfDay },
    };

    const [totalBoilsPskGroup, totalBoilsKlpGroup] = await Promise.all([
      mssqlPrisma.vw_FinalBatchStatus.groupBy({
        where: { AND: [where, { Plant: 'П' }] },
        by: ['BatchPK'],
        _count: {
          BatchPK: true,
        },
        _sum: {
          TotalLoading: true,
        },
      }),
      mssqlPrisma.vw_FinalBatchStatus.groupBy({
        where: { AND: [where, { Plant: 'К' }] },
        by: ['BatchPK'],
        _count: {
          BatchPK: true,
        },
        _sum: {
          TotalLoading: true,
        },
      }),
    ]);

    const totalBoilsPsk = totalBoilsPskGroup.length;
    const totalBoilsKlp = totalBoilsKlpGroup.length;
    const totalLoadsPsk = totalBoilsPskGroup.reduce((acc, current) => {
      const loadingValue = current._sum?.TotalLoading ? Number(current._sum.TotalLoading) : 0;
      return acc + loadingValue;
    }, 0);
    const totalLoadsKlp = totalBoilsKlpGroup.reduce((acc, current) => {
      const loadingValue = current._sum?.TotalLoading ? Number(current._sum.TotalLoading) : 0;
      return acc + loadingValue;
    }, 0);

    return {
      totalBoilsPsk,
      totalLoadsPsk,
      totalBoilsKlp,
      totalLoadsKlp,
    };
  }

  async getBoils(input: TGetBoilsListInput): Promise<TBoilListResponse> {
    const {
      startDate,
      endDate,
      page,
      limit,
      plants,
      batchName,
      productId,
      productMarking,
      problem,
    } = input;
    const skip = (page - 1) * limit;

    const startOfDay = new Date(startDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(endDate);
    endOfDay.setHours(23, 59, 59, 999);

    const andConditions: Prisma.vw_FinalBatchStatusWhereInput[] = [
      { BatchDate: { gte: new Date(startOfDay), lte: endOfDay } },
    ];

    if (batchName !== '') {
      andConditions.push({ BatchName: { contains: batchName } });
    }
    if (plants?.length) {
      andConditions.push({ Plant: { in: plants } });
    }

    if (productId !== '') {
      andConditions.push({
        BatchProductId: { contains: productId.toLowerCase() },
      });
    }

    if (productMarking !== '') {
      andConditions.push({
        BatchProductMarking: { contains: productMarking.toLowerCase() },
      });
    }

    if (problem?.length) {
      andConditions.push({
        ProblemStatus: { not: 'OK' },
      });
    }

    const where: Prisma.vw_FinalBatchStatusWhereInput = { AND: andConditions };
    const groups = await mssqlPrisma.vw_FinalBatchStatus.groupBy({
      by: ['BatchPK', 'BatchYear', 'BatchMonth', 'BatchNumber'],
      where,
      orderBy: [{ BatchYear: 'asc' }, { BatchMonth: 'asc' }, { BatchNumber: 'asc' }],
    });
    const allMatchingIds = groups.map((r) => r.BatchPK);
    const total = allMatchingIds.length;
    const pagedIds = allMatchingIds.slice(skip, skip + limit);
    const boils = await mssqlPrisma.batchs.findMany({
      where: { BatchPK: { in: pagedIds } },
      include: { details: true },
      orderBy: [{ BatchDate: 'asc' }, { BatchYear: 'asc' }, { BatchMonth: 'asc' }, { BatchNumber: 'asc' }],
    });

    const rows: TBoilListRow[] = boils.map((b): TBoilListRow => {
      const batchHead = b.details?.[0] ?? null;

      const hasWeightMismatch = b.details.some(
        (detail) =>
          detail.ProblemStatus === 'WEIGHT_MISMATCH' || detail.ProblemStatus === 'BOTH_MISMATCH',
      );

      const hasLoadMismatch = b.details.some(
        (detail) =>
          detail.ProblemStatus === 'LOADING_MISMATCH' || detail.ProblemStatus === 'BOTH_MISMATCH',
      );

      const castingWeightingResult: TBoilListWeightingResult[] = b.details.map((wr) => {
        return {
          productId: wr.ProductId,
          productMarking: wr.ProductMarking,
          productName: wr.ProductName,
          planQty: Number(wr.TotalPlanned),
          factQty: Number(wr.TotalWeighting),
          loadQty: Number(wr.TotalLoading),
        };
      });

      return {
        boilId: b.BatchPK,
        boilDate: b.BatchDate || null,
        batchName: b.BatchName || '',
        productId: batchHead?.BatchProductId || '',
        productMarking: batchHead?.BatchProductMarking || '',
        plantAbb: b.Plant || '',
        weightingResult: castingWeightingResult,
        wCheck: !hasWeightMismatch,
        lCheck: !hasLoadMismatch,
      };
    });

    const totalPages = Math.ceil(total / limit);
    return { rows, total, totalPages };
  }

  async getDetail(input: TGetBoilDetailInput): Promise<TBoilDetailResponse> {
    const boil = await mssqlPrisma.batchs.findUnique({
      where: { BatchPK: input.boilId },
      include: {
        BtProducts: {
          include: {
            Products: true,
          },
        },
        Weightings: {
          include: {
            Products: true,
            Lots: true,
            Documents: {
              include: {
                Authors: true,
              },
            },
          },
        },
        details: true,
        Loads: {
          include: {
            Containers: {
              include: {
                Weightings: {
                  include: {
                    Products: true,
                    Lots: true,
                  },
                },
              },
            },
            Documents: {
              include: {
                Authors: true,
              },
            },
          },
        },
        BoilRecords: {
          include: {
            Operations: true,
            Authors: true,
          },
        },
      },
    });

    if (!boil) {
      throw new Error(`Варка с id ${input.boilId} не найдена`);
    }

    const product = boil.BtProducts?.[0]?.Products;

    const castingWeightingResult: TBoilListWeightingResult[] = boil.details.map((wr) => {
      return {
        productId: wr.ProductId,
        productMarking: wr.ProductMarking,
        productName: wr.ProductName,
        planQty: Number(wr.TotalPlanned),
        factQty: Number(wr.TotalWeighting),
        loadQty: Number(wr.TotalLoading),
      };
    });

    const castingWeightings: TBoilDetailWeightingRow[] = boil.Weightings.map((w) => ({
      code: w.Products?.ProductId ?? '-',
      name: w.Products?.ProductName ?? null,
      marking: w.Products?.ProductMarking ?? null,
      lotId: w.Lots?.LotPK,
      lot: w.Lots?.LotName,
      weight: Number(w.Quantity),
      user: w.Documents?.Authors?.AuthorName ?? '-',
      date: w.Documents?.CreateDate,
    }));

    const sortedWeightingData = [...castingWeightings].sort((a, b) => {
      return a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' });
    });

    const castingLoads: TBoilDetailLoadRow[] =
      boil.Loads?.flatMap((ld) => {
        const wRows = ld.Containers?.Weightings ?? [];
        return wRows.map((wr) => ({
          code: wr.Products?.ProductId ?? '-',
          name: wr.Products?.ProductName ?? '-',
          lot: wr.Lots?.LotName ?? '-',
          user: ld.Documents?.Authors?.AuthorName ?? '-',
          date: ld.Documents?.CreateDate,
          weight: Number(wr.Quantity),
        }));
      }) ?? [];

    const sortedLoadData = [...castingLoads].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    const castingTechRecords: TBoilDetailTechCardRow[] = [
      ...(boil.BoilRecords?.map((br) => ({
        code: br.Operations?.OperationCode ?? '-',
        name: br.Operations?.OperationName ?? '-',
        lot: '-',
        temp: br.Temperature ?? null,
        user: br.Authors?.AuthorName ?? '-',
        date: br.CreateDate,
        weight: null,
        isOperation: true,
      })) ?? []),

      ...(boil.Loads?.flatMap((ld) => {
        const wRows = ld.Containers?.Weightings ?? [];
        return wRows.map((wr) => ({
          code: wr.Products?.ProductId ?? '-',
          name: wr.Products?.ProductName ?? '-',
          lot: wr.Lots?.LotName ?? '-',
          temp: null,
          user: ld.Documents?.Authors?.AuthorName ?? '-',
          date: ld.Documents?.CreateDate,
          weight: Number(wr.Quantity),
          isOperation: false,
        }));
      }) ?? []),
    ];

    const sortedTechData = [...castingTechRecords].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
    });

    return {
      boilId: boil.BatchPK,
      boilDate: boil.BatchDate || null,
      batchName: boil.BatchName || '',
      productId: product.ProductId || '',
      productMarking: product.ProductMarking || '',
      plantAbb: boil.Plant || '',
      summary: castingWeightingResult,
      weightings: sortedWeightingData,
      loads: sortedLoadData,
      techCard: sortedTechData,
    };
  }
}
