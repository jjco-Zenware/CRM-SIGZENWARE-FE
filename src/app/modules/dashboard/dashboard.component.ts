import { Component, OnInit } from '@angular/core';
import { DashboardService } from './dashboard.service';
import { DashboardKpi, GanadasVsPerdidas } from './dashboard.model';

const ESTADO_LABELS: Record<string, string> = {
  LEAD: 'Lead',
  PROSPECTO: 'Prospecto',
  CALIFICADO: 'Calificado',
  PROPUESTA: 'Propuesta',
  NEGOCIACION: 'Negociación',
  GANADA: 'Ganada',
  PERDIDA: 'Perdida'
};

const ESTADO_COLORS: Record<string, string> = {
  LEAD: '#94a3b8',
  PROSPECTO: '#60a5fa',
  CALIFICADO: '#818cf8',
  PROPUESTA: '#f59e0b',
  NEGOCIACION: '#fb923c',
  GANADA: '#16a34a',
  PERDIDA: '#dc2626'
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  kpis: DashboardKpi | null = null;
  chartData: unknown;
  chartOptions = {
    plugins: { legend: { display: false } },
    responsive: true,
    maintainAspectRatio: false,
    scales: { y: { beginAtZero: true } }
  };

  ganadasVsPerdidas: GanadasVsPerdidas | null = null;
  ganadasPerdidasChartData: unknown;
  ganadasPerdidasChartOptions = {
    plugins: { legend: { position: 'bottom' } },
    responsive: true,
    maintainAspectRatio: false
  };

  loading = true;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getKpis().subscribe(kpis => {
      this.kpis = kpis;
      this.loading = false;
    });

    this.dashboardService.getOportunidadesPorEstado().subscribe(serie => {
      this.chartData = {
        labels: serie.map(s => `${ESTADO_LABELS[s.estado] ?? s.estado} (${s.cantidad})`),
        datasets: [
          {
            label: 'Valor por estado',
            data: serie.map(s => s.valor),
            backgroundColor: serie.map(s => ESTADO_COLORS[s.estado] ?? '#7c3aed')
          }
        ]
      };
    });

    this.dashboardService.getGanadasVsPerdidas().subscribe(res => {
      this.ganadasVsPerdidas = res;
      this.ganadasPerdidasChartData = {
        labels: [`Ganadas (${res.ganadas.cantidad})`, `Perdidas (${res.perdidas.cantidad})`],
        datasets: [
          {
            data: [res.ganadas.valor, res.perdidas.valor],
            backgroundColor: [ESTADO_COLORS['GANADA'], ESTADO_COLORS['PERDIDA']]
          }
        ]
      };
    });
  }

  get tasaExito(): number {
    if (!this.ganadasVsPerdidas) return 0;
    const total = this.ganadasVsPerdidas.ganadas.cantidad + this.ganadasVsPerdidas.perdidas.cantidad;
    return total ? (this.ganadasVsPerdidas.ganadas.cantidad / total) * 100 : 0;
  }
}
