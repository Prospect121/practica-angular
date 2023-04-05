import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { CrudExampleService } from 'src/app/shared/crud-example/crud-example.service';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { IUnicorns } from 'src/app/shared/model/unicorns';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  private _subscriptions: Subscription[] = [];

  form: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required),
    age: new FormControl(null, Validators.required),
    colour: new FormControl(null),
  });

  constructor(
    private _crudExampleService: CrudExampleService,
    private _route: ActivatedRoute,
    private _router: Router,
    private _dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {
    const {
      snapshot: {
        params: { id },
      },
    } = this._route;

    if (!!id) {
      this._getById(id);
    }
  }

  get nameField(): AbstractControl | null {
    return this.form.get('name');
  }

  get ageField(): AbstractControl | null {
    return this.form.get('age');
  }

  ngOnInit(): void {}

  private _getById(id: number): void {
    const sub = this._crudExampleService.getById(id).subscribe((item) => {
      this.form.patchValue(item);
    });
  }

  onSubmit(): void {
    if (this.form.invalid) return;
    const value = this.form.value;
    if (!!value?.id) {
      this._openDialog(false, false, value);
      return;
    }
    this._openDialog(true, false, value);
  }

  private _create(body: IUnicorns): void {
    this._crudExampleService.create(body).subscribe((item) => {
      this._openSnackBar('Registro creado con exito');
      this.goList();
    });
  }

  private _update(body: IUnicorns): void {
    this._crudExampleService.update(body).subscribe((item) => {
      this._openSnackBar('Registro actualizado con exito');
      this.goList();
    });
  }

  private _openDialog(
    create: boolean,
    back: boolean,
    body: IUnicorns = {} as IUnicorns
  ) {
    this._dialog
      .open(DialogComponent, {
        data: back ? 'Volver' : create ? 'Crear' : 'Editar',
      })
      .afterClosed()
      .subscribe((value) => {
        if (!value) return;
        if (back) {
          this.goList();
          return;
        }
        if (create) {
          this._create(body);
          return;
        }
        this._update(body);
      });
  }

  goList() {
    this._router.navigate(['../']);
  }

  private _openSnackBar(message: string) {
    this._snackBar.open(message, 'Close');
  }

  ngOnDestroy(): void {
    this._subscriptions.forEach((sub) => sub && sub.unsubscribe());
  }
}
