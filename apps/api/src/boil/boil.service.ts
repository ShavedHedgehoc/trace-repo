import { Injectable } from '@nestjs/common';
import { mssqlPrisma, Prisma } from '@repo/db';
import { IBoilService } from '@repo/trpc';
import {
    TGetBoilsListInput,
    TBoilListResponse,
    TBoilListRow,
    TBoilListWeightingResult,
} from '@repo/schemas';

interface IWeightingCombined {
    ProductId: string;
    ProductMarking: string | null;
    ProductName: string | null;
    PlanQty: number;
    FactQty: number;
    LoadQty: number;
}

@Injectable()
export class BoilService implements IBoilService {
    constructor() { }

    async getBoils(input: TGetBoilsListInput): Promise<TBoilListResponse> {
        const { batchName, productId, productMarking, startDate, endDate, page, limit, plants } = input;
        const andConditions: Prisma.BatchsWhereInput[] = [{
            OR: [
                { Boils: { some: {} } },
                { Weightings: { some: {} } }
            ]
        }]

        if (batchName !== '') {
            andConditions.push({
                BatchName: { contains: batchName.toLowerCase() },
            });
        }

        if (productId !== '') {
            andConditions.push({
                BtProducts: {
                    some: {
                        Products: {
                            ProductId: {
                                contains: productId.toLowerCase()
                            }
                        }
                    }
                }
            });
        }

        if (productMarking !== '') {
            andConditions.push({
                BtProducts: {
                    some: {
                        Products: {
                            ProductMarking: {
                                contains: productMarking.toLowerCase()
                            }
                        }
                    }
                }
            });
        }

        if (startDate) {
            andConditions.push({
                BatchDate: { gte: startDate }
            })
        }

        if (endDate) {
            andConditions.push({
                BatchDate: { lte: endDate }
            })
        }

        if (plants && plants.length !== 0) {
            andConditions.push({
                Plant: { in: plants }
            })
        }

        const where: Prisma.BatchsWhereInput = { AND: andConditions }
        const [boils, total] = await Promise.all([
            mssqlPrisma.batchs.findMany({
                where,
                include: {
                    BtProducts: { include: { Products: { select: { ProductMarking: true, ProductId: true } } } },
                    Boils: { include: { Products: { select: { ProductMarking: true, ProductName: true } } } },
                    Weightings: { include: { Products: { select: { ProductMarking: true, ProductName: true } } } },
                    Loads: { include: { Containers: { include: { Weightings: { include: { Products: { select: { ProductMarking: true, ProductName: true } } } } } } } }
                },
                skip: (page - 1) * limit,
                take: limit,
            }),
            mssqlPrisma.batchs.count({ where })
        ])

        const rows: TBoilListRow[] = boils.map((b): TBoilListRow => {
            const product = b.BtProducts?.[0]?.Products;
            const combinedMap: Record<string, IWeightingCombined> = {};

            b.Boils?.forEach((br) => {
                const id = br.ProductId;
                if (!combinedMap[id]) {
                    combinedMap[id] = {
                        ProductId: id,
                        ProductMarking: br.Products?.ProductMarking || null,
                        ProductName: br.Products?.ProductName || null,
                        PlanQty: 0,
                        FactQty: 0,
                        LoadQty: 0
                    };
                }
                combinedMap[id].PlanQty += Number(br.Quantity) || 0;
            });

            b.Weightings?.forEach((wr) => {
                const id = wr.ProductId;
                if (!combinedMap[id]) {
                    combinedMap[id] = {
                        ProductId: id,
                        ProductMarking: wr.Products?.ProductMarking || null,
                        ProductName: wr.Products?.ProductName || null,
                        PlanQty: 0,
                        FactQty: 0,
                        LoadQty: 0
                    };
                }
                combinedMap[id].FactQty += Number(wr.Quantity) || 0;
            });

            b.Loads?.forEach((load) => {
                load.Containers?.Weightings?.forEach((lw) => {
                    const id = lw.ProductId;
                    if (!combinedMap[id]) {
                        combinedMap[id] = {
                            ProductId: id,
                            ProductMarking: lw.Products?.ProductMarking || null,
                            ProductName: lw.Products?.ProductName || null,
                            PlanQty: 0, FactQty: 0, LoadQty: 0
                        };
                    }
                    combinedMap[id].LoadQty += Number(lw.Quantity) || 0;
                });
            });

            const weightingsResult = Object.values(combinedMap);

            const wCheck = weightingsResult.length > 0 &&
                weightingsResult.every(item => item.PlanQty === item.FactQty);

            const lCheck = weightingsResult.length > 0 &&
                weightingsResult.every(item => item.PlanQty === item.LoadQty);

            const noPlan = weightingsResult.length === 0 ||
                weightingsResult.every(item => item.PlanQty === 0);

            const castingWeightingResult: TBoilListWeightingResult[] = weightingsResult.map((wr) => {
                return {
                    productId: wr.ProductId,
                    productMarking: wr.ProductMarking,
                    productName: wr.ProductName,
                    planQty: wr.PlanQty,
                    factQty: wr.FactQty,
                    loadQty: wr.LoadQty
                }

            })

            return {
                boilId: b.BatchPK,
                boilDate: b.BatchDate || null,
                batchName: b.BatchName || "",
                productId: product?.ProductId || "",
                productMarking: product?.ProductMarking || "",
                plantAbb: b.Plant || "",
                weightingResult: castingWeightingResult,
                wCheck: wCheck,
                lCheck: lCheck,
                noPlan: noPlan
            }
        })
        const totalPages = Math.ceil(total / limit);
        return { rows, total, totalPages }
    }
}