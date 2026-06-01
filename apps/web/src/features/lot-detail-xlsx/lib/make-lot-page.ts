import { mapPlants } from '@/shared/lib';
import type { TLotDetailXLSXResponse } from '@repo/schemas';
import { format } from 'date-fns';
import { Workbook } from 'exceljs';

export default function MakeLotPage({
  workbook,
  data,
  pageName,
}: {
  workbook: Workbook;
  data: TLotDetailXLSXResponse;
  pageName: string;
}) {
  const sheet = workbook.addWorksheet(pageName, {
    pageSetup: {
      orientation: 'portrait',
      paperSize: 9,
      fitToPage: true,
      fitToWidth: 1,
      fitToHeight: 0,
      margins: {
        left: 0.25,
        right: 0.25,
        top: 0.25,
        bottom: 0.25,
        header: 0.3,
        footer: 0.3,
      },
    },
    views: [{ state: 'normal' }],
  });

  sheet.mergeCells('A1:E1');
  const docCodeCell = sheet.getCell('A1');
  docCodeCell.value = 'ЮК.ПР.Ф.ХХХХ';
  docCodeCell.font = { bold: true, size: 8 };
  docCodeCell.alignment = {
    horizontal: 'right',
    vertical: 'middle',
  };

  sheet.mergeCells('A3:E3');
  const firstTitleCell = sheet.getCell('A3');
  firstTitleCell.value = `${data.data.productId} ${data.data.productName}`;
  firstTitleCell.font = { bold: true, size: 14 };
  sheet.mergeCells('A4:E4');
  const titleCell = sheet.getCell('A4');
  titleCell.value = `Квазипартия: ${data.data.lotName}`;
  titleCell.font = { bold: false, size: 12 };

  sheet.columns = [
    { key: 'date', width: 14 },
    { key: 'batch', width: 12 },
    { key: 'plant', width: 20 },
    { key: 'code', width: 10 },
    { key: 'marking', width: 50 },
  ];

  sheet.getRow(6).values = ['Дата', 'Партия', 'Площадка', 'Код 1С', 'Артикул'];

  sheet.getRow(6).eachCell((cell) => {
    cell.fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'FFD1FAE5' },
    };
    cell.font = { bold: true, size: 10 };
    cell.alignment = {
      horizontal: 'center',
      vertical: 'middle',
      wrapText: true,
    };
    cell.border = {
      top: { style: 'thin' },
      bottom: { style: 'thin' },
      left: { style: 'thin' },
      right: { style: 'thin' },
    };
  });
  sheet.getRow(6).height = 40;

  const rows = data.rows.map((row) => {
    const dateObj = row.boilDate ? new Date(row.boilDate) : null;
    return {
      date: dateObj ? format(dateObj, 'dd-MM-yyyy') : '-',
      batch: row.batchName ?? '-',
      plant: mapPlants(row.plantAbb) ?? '-',
      code: row.productId ?? '-',
      marking: row.productMarking || '-',
    };
  });

  const addedRows = sheet.addRows(rows);

  addedRows.forEach((newRow) => {
    newRow.height = 32;
    newRow.eachCell({ includeEmpty: true }, (cell) => {
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.alignment = {
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true,
        indent: 0,
      };
    });
  });
}
