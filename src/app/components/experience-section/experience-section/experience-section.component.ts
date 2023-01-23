import {Component, Inject, Input, OnInit} from '@angular/core';
import {WorkExperience} from "../../../domain/WorkExperience";
import {Router} from "@angular/router";
import {ServiceService} from "../../../services/Service/service.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {User} from "../../../domain/User";

export interface DialogData {
  id: number;
  title: string;
  description: string;
  period: string;
  place: string;
  user: User;
}

@Component({
  selector: 'app-experience-section',
  templateUrl: './experience-section.component.html',
  styleUrls: ['./experience-section.component.css']
})
export class ExperienceSectionComponent implements OnInit {
  logged: boolean = true;
  editMode: boolean = false;
  experiences: WorkExperience[] = [];


  constructor(public router: Router, public fb: FormBuilder, private snackBar: MatSnackBar, public dialog: MatDialog,
              private service: ServiceService) {
  }

  ngOnInit(): void {
    this.getExperiencesByUser(1);
  }

  getExperiencesByUser(id: number): void {
    this.service.findWorkExperienceByUser(id).subscribe(experience => {
      this.experiences = experience;
    })
  }

  edit(): void {
    this.editMode = !this.editMode;
  }

  add(): void {
    const dialogRef = this.dialog.open(AddWorkExperienceDialog);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  delete(experience: WorkExperience): void {
    const dialogRef = this.dialog.open(DeleteWorkExperienceDialog, {
      data:
        {
          id: experience.id,
          title: experience.title
        }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  editExperience(experience: WorkExperience): void {
    const dialogRef = this.dialog.open(UpdateWorkExperienceDialog, {
      data: {
        title: experience.title,
        description: experience.description,
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
    <h1 mat-dialog-title>Registrar experiencia laboral</h1>
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
export class AddWorkExperienceDialog implements OnInit {

  @Input()
  formExperience: FormGroup = this.fb.group({
    id: [null, []],
    title: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(10)]],
    period: ['', [Validators.required]],
    place: ['', [Validators.required]],
    user: ['', [Validators.required]],

  });
  user: any;

  constructor(public router: Router, public fb: FormBuilder, private snackBar: MatSnackBar, public dialog: MatDialog,
              private service: ServiceService,
              public dialogRef: MatDialogRef<AddWorkExperienceDialog>
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
    const experience = new WorkExperience(
      this.formExperience.get(['id'])?.value,
      this.formExperience.get(["title"])?.value,
      this.formExperience.get(["description"])?.value,
      this.formExperience.get(["period"])?.value,
      this.formExperience.get(["place"])?.value,
      this.user
    );
    this.service.saveWorkExperience(experience).subscribe(p => {
        this.snackBar.open("La experiencia se registro correctamente.", "Éxito", {duration: 2000});
      },
      error => {
        this.snackBar.open(error, "Error", {duration: 2000});
      });
    this.dialogRef.close();
  }
}


@Component({
  selector: 'update-work-experience-dialog',
  // templateUrl: 'update-work-experience-dialog.html',
  template: `
    <h1 mat-dialog-title>Actualizar experiencia laboral</h1>
    <div mat-dialog-content style="width: 500px">
      <mat-form-field appearance="fill" style="width: 100%">
        <mat-label>Nombre</mat-label>
        <input matInput type="text" [(ngModel)]="data.title">
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
export class UpdateWorkExperienceDialog {
  constructor(
    public router: Router, public fb: FormBuilder, private snackBar: MatSnackBar, public dialog: MatDialog,
    private service: ServiceService,
    public dialogRef: MatDialogRef<UpdateWorkExperienceDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    const experience = new WorkExperience(
      this.data.id,
      this.data.title,
      this.data.description,
      this.data.period,
      this.data.place,
      this.data.user
    );
    this.service.updateWorkExperience(experience).subscribe(p => {
      this.snackBar.open("La experiencia se actualizo correctamente.", "Éxito", {duration: 2000});
    })
    this.dialogRef.close();
  }
}


@Component({
  selector: 'delete-work-experience-dialog',
  template: `
    <h1 mat-dialog-title>Eliminar</h1>
    <div mat-dialog-content>
      Desea eliminar la experiencia laboral: {{data.title}}?
    </div>
    <div mat-dialog-actions>
      <button mat-button mat-dialog-close (click)="onNoClick()">NO</button>
      <button mat-button mat-dialog-close cdkFocusInitial (click)="delete()">SI</button>
    </div>
  `,
})
export class DeleteWorkExperienceDialog {
  constructor(private service: ServiceService, private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<DeleteWorkExperienceDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.service.deleteWorkExperience(this.data.id).subscribe(p => {
      this.snackBar.open("La experiencia se elimino correctamente.", "Éxito", {duration: 2000});
    })
    this.dialogRef.close();
  }
}
