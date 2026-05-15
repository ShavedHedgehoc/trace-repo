import { Injectable } from '@nestjs/common';
import { mssqlPrisma, Prisma } from '@repo/db';
import { TGetMaterialsListInput, TMaterialsListResponse, TMaterialsListRow } from '@repo/schemas';
import { IMaterialService } from '@repo/trpc';

@Injectable()
export class MaterialService implements IMaterialService {
  async getMaterials(input: TGetMaterialsListInput): Promise<TMaterialsListResponse> {
    const { productName, productId, page, limit } = input;
    const andConditions: Prisma.ProductsWhereInput[] = [{ ProductName: { not: null } }];
    if (productName !== '') {
      andConditions.push({ ProductName: { contains: productName.toLowerCase() } });
    }
    if (productId !== '') {
      andConditions.push({ ProductId: { contains: productId.toLowerCase() } });
    }

    const where: Prisma.ProductsWhereInput = { AND: andConditions };
    const [materials, total] = await Promise.all([
      mssqlPrisma.products.findMany({
        where,
        select: {
          ProductId: true,
          ProductName: true,
          _count: {
            select: {
              Lots: true,
              Boils: true,
            },
          },
        },
        skip: (page - 1) * limit,
        take: limit,
        orderBy: [{ ProductName: 'asc' }],
      }),
      mssqlPrisma.products.count({
        where: { AND: andConditions },
      }),
    ]);
    const totalPages = Math.ceil(total / limit);
    const rows: TMaterialsListRow[] = materials.map((m) => ({
      productId: m.ProductId,
      productName: m.ProductName,
      lotCount: m._count.Lots,
      boilCount: m._count.Boils,
    }));
    return { rows, total, totalPages };
  }
}
