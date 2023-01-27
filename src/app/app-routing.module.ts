import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactivoComponent } from './reactivo/reactivo.component';
import { BusquedasComponent } from './busquedas/busquedas.component';
import { DetallesComponent } from './detalles/detalles.component';

const routes: Routes = [
  {path:'reactivo', component: ReactivoComponent},
  {path:'busquedas', component: BusquedasComponent},
  {path:'detalles/:login', component: DetallesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
