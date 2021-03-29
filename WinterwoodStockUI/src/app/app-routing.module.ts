import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './_helpers';
import {IndexComponent} from "./batch/index/index.component";
import {StockComponent} from "./batch/stock/stock.component";
import {ViewComponent} from "./batch/view/view.component";
import {CreateComponent} from "./batch/create/create.component";
import {EditComponent} from "./batch/edit/edit.component";

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'batch/index', component: IndexComponent },
  { path: 'batch/stock', component: StockComponent },
  { path: 'batch/:batchId/view', component: ViewComponent },
  { path: 'batch/create', component: CreateComponent },
  { path: 'batch/:batchId/edit', component: EditComponent },
  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

export const appRoutingModule = RouterModule.forRoot(routes);
