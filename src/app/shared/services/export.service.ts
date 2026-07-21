import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ExportService {
  downloadExcel(blob: Blob, fileName: string): void {
    this.download(blob, `${fileName}.xlsx`, 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  }

  downloadPdf(blob: Blob, fileName: string): void {
    this.download(blob, `${fileName}.pdf`, 'application/pdf');
  }

  private download(blob: Blob, fileName: string, mimeType: string): void {
    const file = new Blob([blob], { type: mimeType });
    const url = window.URL.createObjectURL(file);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.URL.revokeObjectURL(url);
  }
}
