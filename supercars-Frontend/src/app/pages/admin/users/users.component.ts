import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  obj: any = {
    _id:'',
    name: '',
    email: '',
    password: '',
    role: 0 
  }
  gridData: any[] = [];
  constructor(private service: UserService) {
    this.getAll();
  }

  getAll() {
    this.service.getAll().subscribe((res: any) => {
      this.gridData = res;
    })
  }
  addVehicle() {
    this.service.add(this.obj).subscribe((res: any) => {
      if (res) {
        alert(res.message);
        this.getAll();
      } else {
        alert(res.message);
      }
    })
  }
  editVehicle(id: string) {
    this.service.edit(id).subscribe((res: any) => {
      if (res) {
       this.obj =  res;
      } else {
        alert(res.message);
      }

    })

  }
  updateVehicle() {
    this.service.update(this.obj).subscribe((res: any) => {
      if (res) {
        alert(res.message);
        this.getAll();
      } else {
        alert(res.message);
      }
    })
  }

  deleteVehicle(id: string) {
    const isDelete = confirm("¿Estás segura de que quieres eliminar?")
    if(isDelete) {
      this.service.delete(id).subscribe((res: any) => {
        if (res) {
          alert(res.message);
          this.getAll();
        } else {
          alert(res.message)
        }
      })
    }
   
  }
}
