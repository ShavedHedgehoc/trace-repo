import { Injectable } from '@nestjs/common';
import { mssqlPrisma, Prisma } from '@repo/db';
import { IBoilService } from '@repo/trpc';
import {
    TGetBoilsListInput,
    TBoilListResponse,
    TBoilListRow,
} from '@repo/schemas';

@Injectable()
export class BoilService implements IBoilService {
    constructor() { }

    async getBoils(input: TGetBoilsListInput): Promise<TBoilListResponse> {
        const { batchName, productId, productMarking, startDate, endDate, page, limit, plants } = input;
        const andConditions: Prisma.BatchsWhereInput[] = []

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
                    BtProducts: { include: { Products: { select: { ProductMarking: true, ProductId: true } } } }
                },
                skip: (page - 1) * limit,
                take: limit,
            }),
            mssqlPrisma.batchs.count({ where })
        ])

        const rows: TBoilListRow[] = boils.map((b) => {
            const product = b.BtProducts?.[0]?.Products
            return {
                boilId: b.BatchPK,
                boilDate: b.BatchDate || null,
                batchName: b.BatchName || "",
                productId: product?.ProductId || "",
                productMarking: product?.ProductMarking || "",
                plantAbb: b.Plant || ""
            }
        })
        const totalPages = Math.ceil(total / limit);

        return { rows, total, totalPages }
    }
}