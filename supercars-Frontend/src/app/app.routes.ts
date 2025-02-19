import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RentComponent } from './pages/rent/rent.component';
import { isNotLoggedInGuard } from './guards/is-not-logged-in.guard';
import { MeComponent } from './pages/me/me.component';
import { isLoggedInGuard } from './guards/is-logged-in.guard';
import { MyBookingsComponent } from './pages/me/my-bookings/my-bookings.component';
import { MyInfoComponent } from './pages/me/my-info/my-info.component';
import { UsersComponent } from './pages/admin/users/users.component';
import { BookingsComponent } from './pages/admin/bookings/bookings.component';
import { VehiclesComponent } from './pages/admin/vehicles/vehicles.component'; 

export const routes: Routes = [
    {
        path: "",
        pathMatch:'full',
        redirectTo: 'home'
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "login",
        component: LoginComponent,
        canActivate: [isNotLoggedInGuard]
    },
    {
        path: "signup",
        component: SignupComponent,
        canActivate: [isNotLoggedInGuard]
    },
    {
        path: "rent/:id",
        component: RentComponent
    },
    {
        path: "user",
        component: UsersComponent,
        canActivate: [isLoggedInGuard],
    }, 
    {
        path: "bookings",
        component: BookingsComponent,
        canActivate: [isLoggedInGuard],
    }, 
    {
        path: "vehicle",
        component: VehiclesComponent,
        canActivate: [isLoggedInGuard],
    },
    {
        path: "me",
        component: MeComponent,
        canActivate: [isLoggedInGuard],
        children:[
            {
                path: "my-bookings",
                component: MyBookingsComponent
            },
            {
                path: "my-info",
                component: MyInfoComponent
            }
        ]
    }
];
