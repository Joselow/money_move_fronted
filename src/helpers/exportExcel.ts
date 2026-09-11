import type { TransactionItem } from '@/interfaces';
import { EXPORT_COLUMNS, getExportRows } from './transactionExport';

export function exportTransactionsToExcel(transactionsList: TransactionItem[], fileName = 'transacciones_reporte') {
    if (!transactionsList || transactionsList.length === 0) {
        console.warn('No hay transacciones para exportar a Excel.');
    }

    const rows = getExportRows(transactionsList);

    let tableHtml = `
        <table style="display:none;" data-cols-width="15,15,20,30,40">
            <thead>
                <tr>
                    ${EXPORT_COLUMNS.map((column) => `<th style="font-weight: bold; text-align: center;">${column}</th>`).join('')}
                </tr>
            </thead>
            <tbody>
    `;

    rows.forEach((row) => {
        tableHtml += `
                <tr>
                    <td data-t="s">${row.FECHA}</td>
                    <td data-t="n">${row.MONTO || ''}</td>
                    <td data-t="s">${row.TIPO || ''}</td>
                    <td data-t="s">${row.CATEGORÍA || ''}</td>
                    <td data-t="s">${row.DESCRIPCIÓN || ''}</td>
                </tr>
        `;
    });

    tableHtml += `
            </tbody>
        </table>
    `;

    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = tableHtml;

    const tableElement = tempDiv.querySelector('table');

    if (!tableElement) {
        console.error('Error: No se pudo generar la tabla HTML desde el string.');
        return;
    }

    document.body.appendChild(tableElement);

    if (TableToExcel && TableToExcel !== undefined) {
        TableToExcel.convert(tableElement, {
            name: `${fileName}.xlsx`,
            sheet: {
                name: 'Transacciones'
            }
        });
    }

    document.body.removeChild(tableElement);
}
