import type { TBoilDetailResponse } from '@repo/schemas';
import { format } from 'date-fns';
import { Workbook } from 'exceljs';

export default function makeWeightingPage({
  workbook,
  data,
  pageName,
}: {
  workbook: Workbook;
  data: TBoilDetailResponse;
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

  // document code
  sheet.mergeCells('A1:G1');
  const docCodeCell = sheet.getCell('A1');
  docCodeCell.value = 'ЮК.ПР.Ф.ХХХХ';
  docCodeCell.font = { bold: true, size: 8 };
  docCodeCell.alignment = {
    horizontal: 'right',
    vertical: 'middle',
  };

  sheet.mergeCells('A2:G2');
  const titleCell = sheet.getCell('A2');
  titleCell.value = `ВЗВЕШИВАНИЯ ${data.batchName} ${data.productMarking}`;
  titleCell.font = { bold: true, size: 14 };

  sheet.columns = [
    { key: 'code', width: 10 },
    { key: 'name', width: 50 },
    { key: 'lot', width: 25 },
    { key: 'weight', width: 10 },
    { key: 'user', width: 16 },
    { key: 'date', width: 12 },
    { key: 'time', width: 10 },
  ];

  sheet.getRow(4).values = [
    'Код 1C',
    'Наименование',
    'Квазипартия',
    'Масса',
    'Выполнил',
    'Дата',
    'Время',
  ];

  sheet.getRow(4).eachCell((cell) => {
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
  sheet.getRow(4).height = 40;

  const weightingsRows = data.weightings.map((row) => {
    const dateObj = row.date ? new Date(row.date) : null;
    return {
      code: row.code ?? '-',
      name: row.name || row.marking,
      lot: row.lot || '-',
      weight: row.weight || 0,
      user: row.user,
      date: dateObj ? format(dateObj, 'dd-MM-yyyy') : '-',
      time: dateObj ? format(dateObj, 'HH:mm:ss') : '-',
    };
  });

  const addedRows = sheet.addRows(weightingsRows);

  addedRows.forEach((newRow) => {
    newRow.height = 32;
    newRow.eachCell({ includeEmpty: true }, (cell, colNumber) => {
      cell.border = {
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.alignment = {
        horizontal: colNumber === 2 || colNumber === 6 ? 'left' : 'center',
        vertical: 'middle',
        wrapText: true,
        indent: colNumber === 2 || colNumber === 6 ? 1 : 0,
      };
    });
  });
}
