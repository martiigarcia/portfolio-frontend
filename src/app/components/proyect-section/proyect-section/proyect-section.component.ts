import {Component, Inject, Input, OnInit} from '@angular/core';
import {Proyect} from "../../../domain/Proyect";
import {Router} from "@angular/router";
import {ServiceService} from "../../../services/Service/service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../domain/User";
import {WorkExperience} from "../../../domain/WorkExperience";

export interface DialogData {
  id: number;
  name: string;
  description: string;
  period: string;
  user: User;
}

@Component({
  selector: 'app-proyect-section',
  templateUrl: './proyect-section.component.html',
  styleUrls: ['./proyect-section.component.css']
})
export class ProyectSectionComponent {

  proyects: Proyect[] = [];
  logged: boolean = true;
  editMode: boolean = false;

  constructor(public router: Router, public fb: FormBuilder, private snackBar: MatSnackBar, public dialog: MatDialog,
              private service: ServiceService) {
  }

  ngOnInit(): void {
    this.findProyectsByUser(1);
  }

  findProyectsByUser(id: number) {
    this.service.findProyectsByUser(id).subscribe(proyectsX => {
      this.proyects = proyectsX;
    })
  }

  edit() {
    this.editMode = !this.editMode;
  }

  add(): void {
    const dialogRef = this.dialog.open(AddProyectDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  delete(proyect: Proyect): void {
    const dialogRef = this.dialog.open(DeleteProyectDialog, {
      data:
        {
          id: proyect.id,
          name: proyect.name
        }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  editProyect(proyect: Proyect): void {
    const dialogRef = this.dialog.open(UpdateProyctDialog, {
      data: {
        name: proyect.name,
        description: proyect.description,
        period: proyect.period,
        user: proyect.user,
        id: proyect.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}


@Component({
  selector: 'add-proyect-dialog',
  template: `
    <h1 mat-dialog-title>Registrar proyecto</h1>
    <div mat-dialog-content [formGroup]="formProyect" style="width: 500px">
      <mat-form-field appearance="fill" style="width: 100%">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="name" type="text">
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" style="width: 100%">
        <mat-label>Descripcion</mat-label>
        <textarea matInput formControlName="description" type="text"></textarea>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" style="width: 100%">
        <mat-label>Periodo de tiempo</mat-label>
        <input matInput formControlName="period" type="text">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Calcelar</button>
      <button mat-button cdkFocusInitial (click)="save()">Crear</button>
    </div>
  `,
  styles: [],
})
export class AddProyectDialog implements OnInit {

  @Input()
  formProyect: FormGroup = this.fb.group({
    id: [null, []],
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    period: ['', [Validators.required]],
    user: ['', [Validators.required]],

  });
  user: any;

  constructor(public router: Router, public fb: FormBuilder, private snackBar: MatSnackBar, public dialog: MatDialog,
              private service: ServiceService,
              public dialogRef: MatDialogRef<AddProyectDialog>
  ) {
  }

  ngOnInit(): void {
    this.service.findOne(1).subscribe(p => {
      this.user = p;
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    const proyect = new Proyect(
      this.formProyect.get(['id'])?.value,
      this.formProyect.get(["name"])?.value,
      this.formProyect.get(["description"])?.value,
      this.formProyect.get(["period"])?.value,
      this.user
    );
    this.service.saveProyect(proyect).subscribe(p => {
        this.snackBar.open("La experiencia se registro correctamente.", "Éxito", {duration: 2000});
      },
      error => {
        this.snackBar.open(error, "Error", {duration: 2000});
      });
    this.dialogRef.close();
  }
}


@Component({
  selector: 'update-proyect-dialog',
  // templateUrl: 'update-work-experience-dialog.html',
  template: `
    <h1 mat-dialog-title>Actualizar experiencia laboral</h1>
    <div mat-dialog-content style="width: 500px">
      <mat-form-field appearance="fill" style="width: 100%">
        <mat-label>Nombre</mat-label>
        <input matInput type="text" [(ngModel)]="data.name">
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" style="width: 100%">
        <mat-label>Descripcion</mat-label>
        <textarea matInput type="text" [(ngModel)]="data.description"></textarea>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" style="width: 100%">
        <mat-label>Periodo de tiempo</mat-label>
        <input matInput type="text" [(ngModel)]="data.period">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Calcelar</button>
      <button mat-button cdkFocusInitial (click)="save()">Actualizar</button>
    </div>
  `,
})
export class UpdateProyctDialog {
  constructor(
    public router: Router, public fb: FormBuilder, private snackBar: MatSnackBar, public dialog: MatDialog,
    private service: ServiceService,
    public dialogRef: MatDialogRef<UpdateProyctDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    const proyect = new Proyect(
      this.data.id,
      this.data.name,
      this.data.description,
      this.data.period,
      this.data.user
    );
    this.service.updateProyect(proyect).subscribe(p => {
      this.snackBar.open("El proyecto se actualizo correctamente.", "Éxito", {duration: 2000});
    })
    this.dialogRef.close();
  }
}


@Component({
  selector: 'delete-proyect-dialog',
  template: `
    <h1 mat-dialog-title>Eliminar</h1>
    <div mat-dialog-content>
      Desea eliminar la experiencia laboral: {{data.name}}?
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close (click)="onNoClick()">NO</button>
      <button mat-button mat-dialog-close cdkFocusInitial (click)="delete()">SI</button>
    </div>
  `,
})
export class DeleteProyectDialog {
  constructor(private service: ServiceService, private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<DeleteProyectDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.service.deleteProyect(this.data.id).subscribe(p => {
      this.snackBar.open("El proyecto se elimino correctamente.", "Éxito", {duration: 2000});
    })
    this.dialogRef.close();
  }
}
