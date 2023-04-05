import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrudExampleService } from 'src/app/shared/crud-example/crud-example.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { IUnicorns } from 'src/app/shared/model/unicorns';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  displayedColumns: string[] = ['id', 'name', 'age', 'colour', 'operation'];
  dataSource: IUnicorns[] = [];

  constructor(
    private _crudExampleService: CrudExampleService,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this._getAll();
  }

  private _getAll() {
    const sub = this._crudExampleService.getAll().subscribe((item) => {
      console.log(item);
      this.dataSource = item;
    });
    this._subscriptions.push(sub);
  }

  delete(id: number): void {
    this._dialog
      .open(DialogComponent, {
        data: 'Eliminar',
      })
      .afterClosed()
      .subscribe((value) => {
        if (value) {
          const sub = this._crudExampleService.delete(id).subscribe((item) => {
            this._openSnackBar('Registro eliminado con exito');
            this._getAll();
          });
          this._subscriptions.push(sub);
        }
      });
  }

  goForm(id?: number) {
    const path = !!id ? `form/${id}` : 'form';
    this._router.navigate([path]);
  }

  private _openSnackBar(message: string) {
    this._snackBar.open(message, 'Close');
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub && sub.unsubscribe());
  }
}
