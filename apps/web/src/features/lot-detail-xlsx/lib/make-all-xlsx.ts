import ExcelJS from 'exceljs';
import type { TLotDetailXLSXResponse } from '@repo/schemas';
import MakeLotPage from './make-lot-page';

export async function makeAllXLSX(data: TLotDetailXLSXResponse) {
  const workbook = new ExcelJS.Workbook();
  MakeLotPage({
    workbook,
    data: data,
    pageName: `Информация`,
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  });
  const url = window.URL.createObjectURL(blob);
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = `Квазипартия_${data.data.lotName}.xlsx`;
  anchor.click();
  window.URL.revokeObjectURL(url);
}
