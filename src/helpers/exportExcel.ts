import TableToExcel from '@linways/table-to-excel';

import type { TransactionItem } from '@/interfaces';
import { TRANSACTION_TYPE } from '@/constants/transaction';

export function exportTransactionsToExcel(transactions: TransactionItem[], fileName = 'transacciones_reporte') {
    if (!transactions || transactions.length === 0) {
        console.warn('No hay transacciones para exportar a Excel.');
        return;
    }

    // 1. Construir el string HTML completo de la tabla
    let tableHtml = `
        <table style="display:none;">
            <thead>
                <tr>
                    <th style="font-weight: bold; text-align: center;">FECHA</th>
                    <th style="font-weight: bold; text-align: center;">MONTO</th>
                    <th style="font-weight: bold; text-align: center;">TIPO</th>
                    <th style="font-weight: bold; text-align: center;">CATEGORÍA</th>
                    <th style="font-weight: bold; text-align: center;">DESCRIPCIÓN</th>
                </tr>
            </thead>
            <tbody>
    `;

    transactions.forEach(t => {
        const tipoTransformado = t.type === TRANSACTION_TYPE.INFLOW ? "INGRESO" : 'EGRESO'
        const montoFormateado = Number(t.amount)
        tableHtml += `
                <tr>
                    <td data-t="${t.date ? 'd' : 's'}">${t.date || ''}</td>
                    <td data-t="n">${montoFormateado || ''}</td>
                    <td data-t="s">${tipoTransformado || ''}</td>
                    <td data-t="s">${t.categoryName || ''}</td>
                    <td data-t="s">${t.description || ''}</td>
                </tr>
        `;
    });

    tableHtml += `
            </tbody>
        </table>
    `;

    // 2. Crear un elemento div temporal y asignar el HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = tableHtml;

    // Necesitamos seleccionar el elemento <table> real que se creó a partir del string
    const tableElement = tempDiv.querySelector('table');

    if (!tableElement) {
        console.error('Error: No se pudo generar la tabla HTML desde el string.');
        return;
    }

    // 4. Adjuntar la tabla al cuerpo del documento temporalmente (oculta)
    document.body.appendChild(tableElement);

    // TableToExcel.convert(tableElement, {
    //     name: `${fileName}.xlsx`,
    //     sheet: {
    //         name: 'Transacciones'
    //     }
    // });

    document.body.removeChild(tableElement);
}