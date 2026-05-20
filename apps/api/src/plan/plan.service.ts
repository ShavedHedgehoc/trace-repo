import { Injectable } from '@nestjs/common';
import { mssqlPrisma } from '@repo/db';
import { TDeleteBoilPlanInput } from '@repo/schemas';
import { IPlanService } from '@repo/trpc';

@Injectable()
export class PlanService implements IPlanService {
  async deletePlan(input: TDeleteBoilPlanInput) {
    const { count } = await mssqlPrisma.boils.deleteMany({
      where: {
        BatchPK: input.boilId,
      },
    });
    if (count === 0) {
      throw new Error('Запись не найдена!');
    }
    return { success: true };
  }
}
