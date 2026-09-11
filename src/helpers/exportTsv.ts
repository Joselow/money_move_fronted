import type { TransactionItem } from '@/interfaces';
import { EXPORT_COLUMNS, getExportRows } from './transactionExport';

function escapeTsvCell(value: string | number): string {
  return String(value).replace(/\t/g, ' ').replace(/\r?\n/g, ' ');
}

export function buildTransactionsTsv(transactionsList: TransactionItem[]): string {
  const rows = getExportRows(transactionsList);
  const header = EXPORT_COLUMNS.join('\t');
  const body = rows
    .map((row) => EXPORT_COLUMNS.map((column) => escapeTsvCell(row[column])).join('\t'))
    .join('\n');

  return body ? `${header}\n${body}` : header;
}

export async function copyTransactionsToClipboard(transactionsList: TransactionItem[]): Promise<boolean> {
  if (!transactionsList.length) {
    return false;
  }

  const tsv = buildTransactionsTsv(transactionsList);

  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(tsv);
    return true;
  }

  const textarea = document.createElement('textarea');
  textarea.value = tsv;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();

  try {
    return document.execCommand('copy');
  } finally {
    document.body.removeChild(textarea);
  }
}
