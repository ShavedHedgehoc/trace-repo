import { Injectable } from '@nestjs/common';
import { mssqlPrisma, Prisma } from '@repo/db';
import {
  TCellsContainListResponse,
  TCellsContainListRow,
  TDeleteCellsContainRecordInput,
  TGetCellsContainListInput,
} from '@repo/schemas';
import { ICellService } from '@repo/trpc';

@Injectable()
export class CellService implements ICellService {
  async getCellsContain(input: TGetCellsContainListInput): Promise<TCellsContainListResponse> {
    const { cellName, productId, productName, order, page, limit } = input;
    const andConditions: Prisma.CellsContainsWhereInput[] = [];

    if (cellName !== '') {
      andConditions.push({ Cells: { CellName: { contains: cellName.toLowerCase() } } });
    }
    if (productName !== '') {
      andConditions.push({ Products: { ProductName: { contains: productName.toLowerCase() } } });
    }
    if (productId !== '') {
      andConditions.push({ ProductId: { contains: productId.toLowerCase() } });
    }
    const where: Prisma.CellsContainsWhereInput = { AND: andConditions };

    const orderBy: Prisma.CellsContainsOrderByWithRelationInput[] = [];

    if (order && order.length > 0) {
      const sortColumn = order[0];
      switch (sortColumn) {
        case 'productName':
          orderBy.push({ Products: { ProductName: 'asc' } });
          break;
        case 'productId':
          orderBy.push({ ProductId: 'asc' });
          break;
        case 'expDate':
          orderBy.push({ Expire: 'asc' });
          break;
        default:
          break;
      }
    } else {
      orderBy.push({ Cells: { CellName: 'asc' } });
    }

    const [cellsContainRows, total] = await Promise.all([
      mssqlPrisma.cellsContains.findMany({
        where,
        skip: (page - 1) * limit,
        take: limit,
        include: { Lots: true, Products: true, Cells: true },
        orderBy,
      }),
      mssqlPrisma.cellsContains.count({
        where,
      }),
    ]);
    const totalPages = Math.ceil(total / limit);
    const rows: TCellsContainListRow[] = cellsContainRows.map((r) => ({
      recordId: r.CellContainPK,
      cellId: r.CellPK,
      cellName: r.Cells?.CellName || '',
      expDate: r.Expire,
      productId: r.ProductId,
      productName: r.Products?.ProductName || r.Products?.ProductMarking || '',
      lotId: r.LotId,
      lotName: r.Lots?.LotName || '',
    }));
    return { rows, total, totalPages };
  }

  async deleteCellsContain(input: TDeleteCellsContainRecordInput): Promise<{ success: boolean }> {
    const record = await mssqlPrisma.cellsContains.findUnique({
      where: { CellContainPK: input.cellsContainId },
    });
    if (!record) throw new Error('Запись не найдена!');
    await mssqlPrisma.cellsContains.delete({ where: { CellContainPK: input.cellsContainId } });
    return { success: true };
  }
}
