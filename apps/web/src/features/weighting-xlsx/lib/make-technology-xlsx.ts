import ExcelJS from 'exceljs';
import type { TBoilDetailResponse } from '@repo/schemas';
import makeTechnologyPage from './make-technology-page';

export async function makeTechnologyXLSX(data: TBoilDetailResponse) {
  const workbook = new ExcelJS.Workbook();
  makeTechnologyPage({
    workbook,
    data: data,
    pageName: `Технологическая карта ${data.batchName}`,
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `Техкарта ${data.batchName}_${data.productMarking}.xlsx`;
  anchor.click();
  window.URL.revokeObjectURL(url);
}
