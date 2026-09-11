import type { TransactionItem } from '@/interfaces';
import { TRANSACTION_TYPE } from '@/constants/transaction';
import { formatIsoHours } from '@/utils/date';

export const EXPORT_COLUMNS = ['FECHA', 'MONTO', 'TIPO', 'CATEGORÍA', 'DESCRIPCIÓN'] as const;

export type ExportRow = Record<(typeof EXPORT_COLUMNS)[number], string | number>;

export function mapTransactionToExportRow(transaction: TransactionItem): ExportRow {
  const tipoTransformado = transaction.type === TRANSACTION_TYPE.INFLOW ? 'INGRESO' : 'EGRESO';

  return {
    FECHA: formatIsoHours(transaction.date) ?? '',
    MONTO: Number(transaction.amount) || 0,
    TIPO: tipoTransformado,
    CATEGORÍA: transaction.categoryName?.toLocaleUpperCase() ?? '',
    DESCRIPCIÓN: transaction.description ?? '',
  };
}

export function getExportRows(transactionsList: TransactionItem[]): ExportRow[] {
  return transactionsList
    .map((transaction) => mapTransactionToExportRow(transaction))
    .toReversed();
}
