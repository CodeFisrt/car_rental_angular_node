import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { VehicleService } from '../../../services/vehicle.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vehicles',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vehicles.component.html',
  styleUrl: './vehicles.component.css'
})
export class VehiclesComponent {
  vehicleObj: any = {
    _id:'',
    brand: '',
    model: '',
    image: '',
    pricePerDay: 0,
    available: false,
    description: '',
    year:''
  }
  vehicleList: any[] = [];
  constructor(private vehicelsrv: VehicleService) {
    this.getAllVehicles();
  }

  getAllVehicles() {
    this.vehicelsrv.getAll().subscribe((res: any) => {
      this.vehicleList = res;
    })
  }
  addVehicle() {
    this.vehicelsrv.addVehicle(this.vehicleObj).subscribe((res: any) => {
      if (res) {
        alert(res.message);
        this.getAllVehicles();
      } else {
        alert(res.message);
      }
    })
  }
  editVehicle(id: string) {
    this.vehicelsrv.edit(id).subscribe((res: any) => {
      if (res) {
       this.vehicleObj =  res;
      } else {
        alert(res.message);
      }

    })

  }
  updateVehicle() {
    this.vehicelsrv.update(this.vehicleObj).subscribe((res: any) => {
      if (res) {
        alert(res.message);
        this.getAllVehicles();
      } else {
        alert(res.message);
      }
    })
  }

  deleteVehicle(id: string) {
    const isDelete = confirm("¿Estás segura de que quieres eliminar?")
    if(isDelete) {
      this.vehicelsrv.delete(id).subscribe((res: any) => {
        if (res) {
          alert(res.message);
          this.getAllVehicles();
        } else {
          alert(res.message)
        }
      })
    }
   
  }
}
