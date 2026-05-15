import ExcelJS from 'exceljs';
import type { TBoilDetailResponse } from '@repo/schemas';
import makeWeightingPage from './make-weighting-page';

export async function makeWeightingXLSX(data: TBoilDetailResponse) {
  const workbook = new ExcelJS.Workbook();
  makeWeightingPage({
    workbook,
    data: data,
    pageName: `Взвешивания ${data.batchName}`,
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `Взвешивания ${data.batchName}_${data.productMarking}.xlsx`;
  anchor.click();
  window.URL.revokeObjectURL(url);
}
