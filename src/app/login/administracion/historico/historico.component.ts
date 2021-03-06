
import { Component, OnInit, ViewChild } from '@angular/core';
import * as jspdf from 'jspdf';
//import * as html2canvas from 'html2canvas';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { Medicion } from 'src/app/modelos/Medicion';

import { MedicionServiceService } from 'src/app/servicio/medicion-service.service';
import { SensorServiceService } from 'src/app/servicio/sensor-service.service';
import { Injectable } from '@angular/core';
import { empty } from 'rxjs';

import { DatePickerComponent } from 'ng2-date-picker';
import { Sensor } from 'src/app/modelos/Sensor';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})


@Component({
  selector: 'app-historico',
  templateUrl: './historico.component.html',
  styleUrls: ['./historico.component.css']
})

export class HistoricoComponent implements OnInit {

  public var = [];
  public var1: any[];
  public cont: number;
  public temperatura = [];
  public humedad = [];
  public humedadsuelo = [];
  public co2 = [];

  public activarbotones: string = 'block';
  public myDate: any = [];
  public fecha;
  public dd;
  public mm;
  public yyyy;
  public ddf;
  public mmf;
  public yyyyf;
  public sensor;


  public lineChartData: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Temperatura' },

  ];
  public lineChartDataH: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Humedad' },

  ];
  public lineChartDataHS: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Humedad Suelo' },

  ];
  public lineChartDataC: ChartDataSets[] = [
    { data: [0, 0, 0, 0, 0, 0, 0], label: 'Co2' },

  ];


  public temp: Medicion = { id: null, valor: null, tiempo: null, chipid: null, nombre: null };
  public ttemp: Sensor = { id: null, nombre: "", estado: "", caracteristica: "", invernadero_id_invernadero: null, tiempo: null, minimo: null, maximo: null };


  constructor(public medicionService: MedicionServiceService, public sensorService: SensorServiceService) {
    this.medicionService.getgrafica().subscribe((resp: any) => {
      //this.temperatura =resp.medicion[2];
      for (let index = 0; index < resp.medicion.length; index++) {
        //console.log("valor dentro for: "+this.var1[index].valor)

        this.temperatura[index] = resp.medicion[index];
      }

    })
    this.medicionService.getgraficaH().subscribe((resp: any) => {
      //this.temperatura =resp.medicion[2];
      for (let index = 0; index < resp.medicion.length; index++) {
        //console.log("valor dentro for: "+this.var1[index].valor)

        this.humedad[index] = resp.medicion[index];
      }

    })
    this.medicionService.getgraficaHS().subscribe((resp: any) => {
      //this.temperatura =resp.medicion[2];
      for (let index = 0; index < resp.medicion.length; index++) {
        //console.log("valor dentro for: "+this.var1[index].valor)

        this.humedadsuelo[index] = resp.medicion[index];
      }

    })
    this.medicionService.getgraficaC().subscribe((resp: any) => {
      //this.temperatura =resp.medicion[2];
      for (let index = 0; index < resp.medicion.length; index++) {
        //console.log("valor dentro for: "+this.var1[index].valor)

        this.co2[index] = resp.medicion[index];
      }

    })



  }
  ngOnInit() {
    //this.obtenerNombre();
    this.medicionService.getgrafica().subscribe((resp: any) => {
      this.var1 = (resp.medicion)
      console.log("tamaño: " + this.var1.length);
      this.cont = 0;
      console.log("contador inicial: " + this.cont);

      for (let index = this.var1.length - 10; index < this.var1.length; index++) {
        //console.log("valor dentro for: "+this.var1[index].valor)
        console.log("valor: " + this.var1[index].valor);
        this.var[this.cont] = this.var1[index].valor;
        this.cont = this.cont + 1;

        console.log("contador: " + this.cont);
        console.log("valor: " + this.var);
      }
      console.log("valor final: " + this.var);
      this.lineChartData = [
        {
          data: [this.var[0], this.var[1], this.var[2], this.var[3], this.var[4],
          this.var[5], this.var[6], this.var[7], this.var[8], this.var[9], this.var[10]], label: 'Temperatura'
        },

      ];

    })
    this.medicionService.getgraficaH().subscribe((resp: any) => {
      this.var1 = (resp.medicion)
      console.log("tamaño: " + this.var1.length);
      this.cont = 0;
      console.log("contador inicial: " + this.cont);

      for (let index = this.var1.length - 10; index < this.var1.length; index++) {
        //console.log("valor dentro for: "+this.var1[index].valor)
        console.log("valor: " + this.var1[index].valor);
        this.var[this.cont] = this.var1[index].valor;
        this.cont = this.cont + 1;
        console.log("contador: " + this.cont);
        console.log("valor: " + this.var);
      }
      console.log("valor final: " + this.var);
      this.lineChartDataH = [
        {
          data: [this.var[0], this.var[1], this.var[2], this.var[3], this.var[4],
          this.var[5], this.var[6], this.var[7], this.var[8], this.var[9], this.var[10]], label: 'Humedad'
        },

      ];

    })
    this.medicionService.getgraficaHS().subscribe((resp: any) => {
      this.var1 = (resp.medicion)
      console.log("tamaño: " + this.var1.length);
      this.cont = 0;
      console.log("contador inicial: " + this.cont);

      for (let index = this.var1.length - 10; index < this.var1.length; index++) {
        //console.log("valor dentro for: "+this.var1[index].valor)
        console.log("valor: " + this.var1[index].valor);
        this.var[this.cont] = this.var1[index].valor;
        this.cont = this.cont + 1;
        console.log("contador: " + this.cont);
        console.log("valor: " + this.var);
      }
      console.log("valor final: " + this.var);
      this.lineChartDataHS = [
        {
          data: [this.var[0], this.var[1], this.var[2], this.var[3], this.var[4],
          this.var[5], this.var[6], this.var[7], this.var[8], this.var[9], this.var[10]], label: 'Humedad Suelo'
        },

      ];

    })
    this.medicionService.getgraficaC().subscribe((resp: any) => {
      this.var1 = (resp.medicion)
      console.log("tamaño: " + this.var1.length);
      this.cont = 0;
      console.log("contador inicial: " + this.cont);

      for (let index = this.var1.length - 10; index < this.var1.length; index++) {
        //console.log("valor dentro for: "+this.var1[index].valor)
        console.log("valor: " + this.var1[index].valor);
        this.var[this.cont] = this.var1[index].valor;
        this.cont = this.cont + 1;
        console.log("contador: " + this.cont);
        console.log("valor: " + this.var);
      }
      console.log("valor final: " + this.var);
      this.lineChartDataC = [
        {
          data: [this.var[0], this.var[1], this.var[2], this.var[3], this.var[4],
          this.var[5], this.var[6], this.var[7], this.var[8], this.var[9], this.var[10]], label: 'Co2'
        },

      ];

    })
    console.log("En el init valor temperatura" + this.temperatura);
  }
  /*
    getMedicionSelect() {
      
      this.sensorService.getSensorLista().subscribe( response => {
        if (response.status == 'success') {
      }
          this.sensor = response.sensor;
            console.log("Los sensores : " + this.sensor);
      },
        err => console.log(err)
      )
    }*/

  getDateInicial() {
    this.dd = this.myDate["selection"]._d.getDate();
    this.mm = this.myDate["selection"]._d.getMonth() + 1; //because January is 0!
    this.yyyy = this.myDate["selection"]._d.getFullYear();
    this.fecha = this.myDate["selection"];
    console.log(this.dd);
    console.log(this.mm);
    console.log(this.yyyy);
  }
  /*getDateFinal(){
    this.ddf = this.myDate["selection"]._d.getDate();
  this.mmf = this.myDate["selection"]._d.getMonth() + 1; //because January is 0!
    this.yyyyf = this.myDate["selection"]._d.getFullYear();
    this.fecha=this.myDate["selection"]._d;
    console.log(this.ddf);
    console.log(this.mmf);
    console.log(this.yyyyf);
  }
*/
  exportAsXLSX(form): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Medición descargada con éxito',
      showConfirmButton: false,
      timer: 1500
    }).then((nombre) => {
      
        if (this.ttemp.nombre == 'Temperatura') {
          console.log("Pasó el form");
          this.medicionService.exportToExcel(this.temperatura, 'Temperatura');
        } else {
          if (this.ttemp.nombre == 'Humedad') {
            this.medicionService.exportToExcel(this.humedad, 'Humedad');
          } else {
            if (this.ttemp.nombre == 'HumedadSuelo') {
              this.medicionService.exportToExcel(this.humedadsuelo, 'Humedad_Suelo');
            } else {
              if (this.ttemp.nombre == 'Co2') {
                this.medicionService.exportToExcel(this.co2, 'CO2');
              }
            }
          }
        }  
    })
  }
  /*
    public exportar(){
      this.activarbotones='none';
      setTimeout(this.captureScreen,1000);
    }
    //motrar y ocultar botones
    activar(){
      this.activarbotones='block';
    }
    //exportar tabla con datos
    
    public captureScreen()  
    {  
      var data = document.getElementById('contenido');  
      html2canvas(data).then(canvas => {  
        // Few necessary setting options  
        var imgWidth = 208;   
        var pageHeight = 295;    
        var imgHeight = canvas.height * imgWidth / canvas.width;  
        var heightLeft = imgHeight;  
    
        const contentDataURL = canvas.toDataURL('image/png')  
        let pdf = new jspdf('p', 'mm', 'letter'); // A4 size page of PDF  
        var position = 0;  
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
        pdf.save('Historicos.pdf'); // Generated PDF   
      });  
     
    } 
    */
  //this.var[0].valor, this.var[1].valor, this.var[2].valor, this.var[3].valor, this.var[4].valor, this.var[5].valor, this.var[6].valor

  /*generarPDF() {
    html2canvas(document.getElementById('contenido'), {
      // Opciones
      allowTaint: true,
      useCORS: false,
      // Calidad del PDF
      scale: 3
    }).then(function (canvas) {
      var img = canvas.toDataURL("image/png");
      var doc = new jsPDF();
      doc.addImage(img, 'PNG', 1, 1, 195, 105);
      
      /*const bufferX = 5;
      const bufferY = 5;
      const imgProps = (<any>doc).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      

      doc.save('Historico.pdf');
    });
  }
  */



  public obtenerNombre() {
    //this.nombre=this.invernaderoServices.getNombre();
    //console.log("EL NOMBRE ES: "+this.nombre);
    // return this.nombre;
    this.medicionService.getgrafica().subscribe((resp: any) => {
      this.var1 = (resp.medicion);
      console.log("tamaño: " + this.var1.length);
      this.cont = 0;
      console.log("contador inicial: " + this.cont);

      for (let index = this.var1.length - 10; index < this.var1.length; index++) {

        this.temperatura[this.cont] = this.var1[index];
        this.cont = this.cont + 1;

      }
      console.log("NAMEEEEE: " + this.temperatura)
    })

  }
  public obtenerNombreH() {
    //this.nombre=this.invernaderoServices.getNombre();
    //console.log("EL NOMBRE ES: "+this.nombre);
    // return this.nombre;
    this.medicionService.getgraficaH().subscribe((resp: any) => {
      this.var1 = (resp.medicion);
      console.log("tamaño: " + this.var1.length);
      this.cont = 0;
      console.log("contador inicial: " + this.cont);

      for (let index = this.var1.length - 10; index < this.var1.length; index++) {

        this.humedad[this.cont] = this.var1[index];
        this.cont = this.cont + 1;

      }
      console.log("NAMEEEEE: " + this.humedad)
    })

  }
  public obtenerNombreHS() {
    //this.nombre=this.invernaderoServices.getNombre();
    //console.log("EL NOMBRE ES: "+this.nombre);
    // return this.nombre;
    this.medicionService.getgraficaHS().subscribe((resp: any) => {
      this.var1 = (resp.medicion);
      console.log("tamaño: " + this.var1.length);
      this.cont = 0;
      console.log("contador inicial: " + this.cont);

      for (let index = this.var1.length - 10; index < this.var1.length; index++) {

        this.humedadsuelo[this.cont] = this.var1[index];
        this.cont = this.cont + 1;

      }
      console.log("NAMEEEEE: " + this.humedadsuelo)
    })

  }
  public obtenerNombreC() {
    //this.nombre=this.invernaderoServices.getNombre();
    //console.log("EL NOMBRE ES: "+this.nombre);
    // return this.nombre;
    this.medicionService.getgraficaC().subscribe((resp: any) => {
      this.var1 = (resp.medicion);
      console.log("tamaño: " + this.var1.length);
      this.cont = 0;
      console.log("contador inicial: " + this.cont);

      for (let index = this.var1.length - 10; index < this.var1.length; index++) {

        this.co2[this.cont] = this.var1[index];
        this.cont = this.cont + 1;

      }
      console.log("NAMEEEEE: " + this.co2)
    })

  }

  public lineChartLabels: Label[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

  public lineChartOptions: (ChartOptions & { annotation: any }) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
        },
        {
          id: 'y-axis-1',
          position: 'right',
          gridLines: {
            color: 'rgba(255,0,0,0.3)',
          },
          ticks: {
            fontColor: 'green',
          }
        }
      ]
    },
    annotation: {
      annotations: [
        {
          type: 'line',
          mode: 'vertical',
          scaleID: 'x-axis-0',
          value: 'March',
          borderColor: 'orange',
          borderWidth: 2,
          label: {
            enabled: true,
            fontColor: 'orange',
            content: 'LineAnno'
          }
        },
      ],
    },
  };

  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'red',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  @ViewChild(BaseChartDirective, { static: true }) chart: BaseChartDirective;




  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }



  public changeColor() {
    this.lineChartColors[2].borderColor = 'green';
    this.lineChartColors[2].backgroundColor = `rgba(0, 255, 0, 0.3)`;
  }

  public changeLabel() {
    this.lineChartLabels[2] = ['1st Line', '2nd Line'];
    // this.chart.update();
  }
}
