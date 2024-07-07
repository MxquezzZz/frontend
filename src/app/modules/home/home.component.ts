import { Component, OnInit, Inject, PLATFORM_ID, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import dayGridPlugin from '@fullcalendar/daygrid';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import { CommonModule } from '@angular/common';
import { HomeService } from '../service/home.service';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatIconModule} from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
// import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, FullCalendarModule, CommonModule,MatInputModule,MatFormFieldModule,FormsModule,MatIconModule,MatDatepickerModule,MatNativeDateModule ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6;
  };

  change:boolean = false;
  editId:boolean = false;
  data: any[] = [];
  service = inject(HomeService);
  dates: any[] = [];
  fecha = [
    '2024-07-10T12:00:00',
    '2024-07-11T1:00:00',
    '2024-07-13T4:00:00',
    '2024-07-14T5:00:00',
    '2024-07-15T3:00:00',
    '2024-07-21T11:00:00'
  ]
  //-------------
  nombre= '';
  apellidos = '';
  dni='';
  telefono='';
  f_nacimiento='';
  fecha_disponible='';
  caso='';
  tipo_Sangre=1;
  descripcion='';
  edit:any;
  ngOnInit(): void {
      this.list();
    // { title: item.descripcion, start: item.fecha_disponible }
  }

  public save(){
    const indiceAleatorio = Math.floor(Math.random() * this.fecha.length);
    this.fecha_disponible = this.fecha[indiceAleatorio];
    let data = {
      nombre: this.nombre,
      apellidos: this.apellidos,
      dni: this.dni,
      telefono: this.telefono,
      f_nacimiento: this.f_nacimiento,
      fecha_disponible: this.fecha_disponible,
      caso: this.caso,
      tipo_Sangre: this.tipo_Sangre,
      descripcion: this.descripcion
    }

    this.service.dave(data).subscribe(data=>{
      this.list();
      this.limpiar();
      this.change=false;
    })
  }


  public changeStatus(){
    this.change = !this.change;
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    events: undefined 
  };

  public list(): void {
    this.service.list().subscribe(data => {
      this.data = data;
      this.dates = []
      for (const item of data) {
        let fecha = { title: item.descripcion, start: item.fecha_disponible };
        this.dates.push(fecha)
      }   
      this.calendarOptions.events = this.dates
      console.log(this.calendarOptions)
    })
  }

  public limpiar(){
    this.nombre= '';
    this.apellidos = '';
    this.dni='';
    this.telefono='';
  this.f_nacimiento='';
  this.fecha_disponible='';
  this.caso='';
  this.tipo_Sangre=1;
  this.descripcion='';
  }

  public cancelar(id:any){
    this.service.delete(id).subscribe(data=>{
      console.log(data)
      this.list()
    })
  }

  public editar(id:any){
    this.change = !this.change;
    this.editId = !this.editId;
    this.edit = this.data.find(item => item.id === id);
    console.log(this.edit)
  }
  
  changeStatusEdit(){
    this.change = !this.change;
    this.editId = !this.editId;
  }

  saveEdit(){
    const indiceAleatorio = Math.floor(Math.random() * this.fecha.length);
    this.fecha_disponible = this.fecha[indiceAleatorio];
    let data = {
      nombre: this.edit.nombre,
      apellidos: this.edit.apellidos,
      dni: this.edit.dni,
      telefono: this.edit.telefono,
      f_nacimiento: this.edit.f_nacimiento,
      fecha_disponible: this.edit.fecha_disponible,
      caso: this.edit.caso,
      tipo_Sangre: this.edit.tipo_sangre,
      descripcion: this.edit.descripcion
    }

    this.service.update(data,this.edit.id).subscribe(data=>{
      this.list()
      this.change = !this.change;
      this.editId = !this.editId;
    })
  }

}
