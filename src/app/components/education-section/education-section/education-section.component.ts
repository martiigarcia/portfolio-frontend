import {Component, Inject, Input, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {ServiceService} from "../../../services/Service/service.service";
import {AcademicExperience} from "../../../domain/AcademicExperience";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../domain/User";
import {AngularFireAuth} from "@angular/fire/compat/auth";


export interface DialogData {
  id: number;
  title: string;
  place: string;
  period: string;
  type: string;
  user: User;
}

@Component({
  selector: 'app-education-section',
  templateUrl: './education-section.component.html',
  styleUrls: ['./education-section.component.css']
})
export class EducationSectionComponent {

  logged: boolean | undefined;
  editMode: boolean = false;
  experiences: AcademicExperience[] = [];

  constructor(public router: Router,
              public fb: FormBuilder,
              private snackBar: MatSnackBar,
              public dialog: MatDialog,
              private afAuth: AngularFireAuth,
              private service: ServiceService) {
  }

  ngOnInit(): void {
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.logged=true;
      } else {
        this.logged=false;
      }
    }).then(r => console.log(r));
    this.getExperiencesByUser(1);
  }

  getExperiencesByUser(id: number) {
    this.service.findAcademicExperienceByUser(id).subscribe(experience => {
      // console.log(experience)
      this.experiences = experience;
    })
  }

  edit(): void {
    this.editMode = !this.editMode;
  }

  add(): void {
    const dialogRef = this.dialog.open(AddAcademicExperienceDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  delete(experience: AcademicExperience): void {
    const dialogRef = this.dialog.open(DeleteAcademicExperienceDialog, {
      data:
        {
          id: experience.id,
          "title": experience.title
        }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  editExperience(experience: AcademicExperience): void {
    const dialogRef = this.dialog.open(UpdateAcademicExperienceDialog, {
      data: {
        title: experience.title,
        type: experience.type,
        period: experience.period,
        place: experience.place,
        user: experience.user,
        id: experience.id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }


}

@Component({
  selector: 'add-work-experience-dialog',
  template: `
    <h1 mat-dialog-title>Registrar experiencia academica</h1>
    <div mat-dialog-content [formGroup]="formExperience" style="width: 500px">
      <mat-form-field appearance="fill" style="width: 100%">
        <mat-label>Nombre</mat-label>
        <input matInput formControlName="title" type="text">
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
      <br>
      <mat-form-field appearance="fill" style="width: 100%">
        <mat-label>Lugar</mat-label>
        <input matInput formControlName="place" type="text">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Calcelar</button>
      <button mat-button cdkFocusInitial (click)="save()">Crear</button>
    </div>
  `,
  styles: [],
})
export class AddAcademicExperienceDialog implements OnInit {

  @Input()
  formExperience: FormGroup = this.fb.group({
    id: [null, []],
    title: ['', [Validators.required, Validators.minLength(3)]],
    period: ['', [Validators.required]],
    place: ['', [Validators.required]],
    type: ['', [Validators.required]],
    user: ['', [Validators.required]],
  });
  user: any;

  constructor(public router: Router, public fb: FormBuilder, private snackBar: MatSnackBar, public dialog: MatDialog,
              private service: ServiceService,
              public dialogRef: MatDialogRef<AddAcademicExperienceDialog>
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
    const experience = new AcademicExperience(
      this.formExperience.get(['id'])?.value,
      this.formExperience.get(["title"])?.value,
      this.formExperience.get(["place"])?.value,
      this.formExperience.get(["period"])?.value,
      this.formExperience.get(["type"])?.value,
      this.user
    );
    this.service.saveAcademicExperience(experience).subscribe(p => {
        this.snackBar.open("La experiencia se registro correctamente.", "Éxito", {duration: 2000});
      },
      error => {
        this.snackBar.open(error, "Error", {duration: 2000});
      });
    this.dialogRef.close();
  }
}


@Component({
  selector: 'update-academic-experience-dialog',
  // templateUrl: 'update-work-experience-dialog.html',
  template: `
    <h1 mat-dialog-title>Actualizar experiencia academica</h1>
    <div mat-dialog-content style="width: 500px">
      <mat-form-field appearance="fill" style="width: 100%">
        <mat-label>Nombre</mat-label>
        <input matInput type="text" [(ngModel)]="data.title">
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" style="width: 100%">
        <mat-label>Tipo de certificacion</mat-label>
        <textarea matInput type="text" [(ngModel)]="data.type"></textarea>
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" style="width: 100%">
        <mat-label>Periodo de tiempo</mat-label>
        <input matInput type="text" [(ngModel)]="data.period">
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill" style="width: 100%">
        <mat-label>Lugar</mat-label>
        <input matInput type="text" [(ngModel)]="data.place">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Calcelar</button>
      <button mat-button cdkFocusInitial (click)="save()">Actualizar</button>
    </div>
  `,
})
export class UpdateAcademicExperienceDialog {
  constructor(
    public router: Router, public fb: FormBuilder, private snackBar: MatSnackBar, public dialog: MatDialog,
    private service: ServiceService,
    public dialogRef: MatDialogRef<UpdateAcademicExperienceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    const experience = new AcademicExperience(
      this.data.id,
      this.data.title,
      this.data.place,
      this.data.period,
      this.data.type,
      this.data.user
    );
    this.service.updateAcademicExperience(experience).subscribe(p => {
      this.snackBar.open("La experiencia se actualizo correctamente.", "Éxito", {duration: 2000});
    })
    this.dialogRef.close();
  }
}


@Component({
  selector: 'delete-academic-experience-dialog',
  template: `
    <h1 mat-dialog-title>Eliminar</h1>
    <div mat-dialog-content>
      Desea eliminar la experiencia academica: {{data.title}}?
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close (click)="onNoClick()">NO</button>
      <button mat-button mat-dialog-close cdkFocusInitial (click)="delete()">SI</button>
    </div>
  `,
})
export class DeleteAcademicExperienceDialog {
  constructor(private service: ServiceService, private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<DeleteAcademicExperienceDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.service.deleteAcademicExperience(this.data.id).subscribe(p => {
      this.snackBar.open("La experiencia se elimino correctamente.", "Éxito", {duration: 2000});
    })
    this.dialogRef.close();
  }
}

