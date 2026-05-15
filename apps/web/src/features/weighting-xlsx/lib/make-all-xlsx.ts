import ExcelJS from 'exceljs';
import type { TBoilDetailResponse } from '@repo/schemas';
import makeWeightingPage from './make-weighting-page';
import { format } from 'date-fns';
import makeSummaryPage from './make-summary-page';
import makeLoadPage from './make-load-page';

export async function makeAllXLSX(data: TBoilDetailResponse) {
  const workbook = new ExcelJS.Workbook();
  makeSummaryPage({
    workbook,
    data: data,
    pageName: `Общая информация`,
  });

  makeWeightingPage({
    workbook,
    data: data,
    pageName: `Взвешивания`,
  });

  makeLoadPage({
    workbook,
    data: data,
    pageName: `Загрузки`,
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `Варка_${data.batchName}_${data.productMarking}_${format(data.boilDate, 'dd_MM_yyyy')}.xlsx`;
  anchor.click();
  window.URL.revokeObjectURL(url);
}
