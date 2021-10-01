import { Component, Input, OnInit } from '@angular/core';
import { ServicosService } from '../../service/servicos.service';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.css'],
})
export class EventoComponent implements OnInit {
  @Input()
  pegarEvento: any = [];

  duracaoEvento: number = 0;
  nParticipantes: number = 0;
  tDeFala: number = 0;
  qtdSessao: number = 0;
  qtdSala: number = 0;
  qtdParticipantes: number = 0;
  dadosEvento: any;
  preVisualizacao: boolean = false;
  gerarArquivoXls: any;
  dadosXls: any;
  data: any;
  usuario: any;
  pdf: boolean = false;
  mensageem = 'Evento configurado com sucesso!';

  constructor(
    private servicosService: ServicosService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.servicosService.carregarItem().subscribe((res) => {
      this.dadosEvento = res;
      this.dadosXls = this.dadosEvento;
    });

    this.usuario = localStorage.getItem('USER_INFO');
    this.usuario = JSON.parse(this.usuario);
  }

  verificarParticipantes(e: any) {
    this.nParticipantes = parseInt(e.target.value);

    this.nParticipantes <= 25
      ? (this.qtdSala = 5)
      : this.nParticipantes > 25 && this.nParticipantes <= 49
      ? (this.qtdSala = 7)
      : (this.qtdSala = 11);

    this.qtdSessao = this.qtdSala + 1;
  }

  salvar() {
    const id = this.dadosEvento[0].id;
    const body = {
      duracaoEvento: this.duracaoEvento,
      nParticipantes: this.nParticipantes,
      qtdSala: this.qtdSala,
      qtdSessao: this.qtdSessao,
      tDeFala: this.tDeFala,
      id: id,
    };

    this.servicosService.salvarEvento(id, body).subscribe((res) => {
      this.dadosXls = res;
    });
    this.toastr.success('As informações foram salvas com sucesso!');
    this.ngOnInit();
  }

  relatorios() {
    this.preVisualizacao = true;
    this.downloadXls('');
  }

  voltar() {
    this.preVisualizacao = false;
  }

  finalizar() {
    this.toastr.success(this.mensageem);
  }

  downloadPdf(e: any) {
    e.stopPropagation();
    e.preventDefault();
    this.gerarArquivoXls = this.dadosXls;
    this.data = document.getElementById('contentToConvert');
    html2canvas(this.data).then((canvas) => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = (canvas.height * imgWidth) / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('new-file.pdf'); // Generated PDF
    });
  }

  downloadXls(e: any) {
    const fileName = 'ExcelSheet.xlsx';
    this.gerarArquivoXls = this.dadosXls;
    console.log('xls', this.gerarArquivoXls);

    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    XLSX.writeFile(wb, fileName);

    e.stopPropagation();
    e.preventDefault();
  }
}
