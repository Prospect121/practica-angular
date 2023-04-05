import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './containers/form/form.component';
import { ListComponent } from './containers/list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

const routes: Routes = [
  {
    path: '',
    component: ListComponent,
  },
  {
    path: 'form',
    component: FormComponent,
  },
  {
    path: 'form/:id',
    component: FormComponent,
  },
];

@NgModule({
  declarations: [FormComponent, ListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
  ],
})
export class CrudExampleModule {}
