import {Component, HostListener, Inject, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {Router} from "@angular/router";
import {ServiceService} from "../../../services/Service/service.service";
import {Skill} from "../../../domain/Skill";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {User} from "../../../domain/User";

export interface DialogData {
  id: number,
  title: string;
  percentage: number;
  user: User;
}

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {

  color: ThemePalette = 'accent';
  mode: ProgressSpinnerMode = 'determinate';
  logged: boolean = true;
  editMode: boolean = false;

  skills: Skill[] = [];

  constructor(public fb: FormBuilder, public router: Router, public dialog: MatDialog,
              private service: ServiceService) {
  }


  ngOnInit(): void {
    this.findSkillsByUser(1);
    console.log(this.editMode)
    // console.log(this.skills)
  }

  findSkillsByUser(id: number) {
    this.service.findSkillsByUser(id).subscribe(skillsX => {
      this.skills = skillsX;
    })
  }

  edit() {
    this.editMode = !this.editMode;
  }

  add() {

    const dialogRef = this.dialog.open(AddSkillDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  editSkill(skill: Skill) {
    const dialogRef = this.dialog.open(UpdateSkillDialog, {
        data: {
          id: skill.id,
          title: skill.title,
          percentage: skill.percentage,
          user: skill.user
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteSkill(skill: Skill) {
    const dialogRef = this.dialog.open(DeleteSkillDialog, {
        data: {
          id: skill.id,
          title: skill.title
        }
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // const elements = document.querySelectorAll('.animated-element');
  // const animatedElements = Array.from(elements).map(e => new AnimatedElement(e));
  //
  // window.addEventListener('scroll', function () {
  //   animatedElements.forEach(animatedElement => {
  //     const elementTop = animatedElement.element.getBoundingClientRect().top;
  //     if (elementTop < window.innerHeight) {
  //       animatedElement.element.classList.add('fade-in');
  //     }
  //   });
  // });


}

@Component({
  selector: 'update-skill-dialog',
  template: `
    <h1 mat-dialog-title>{{data.title}}</h1>
    <div mat-dialog-content>
      <mat-form-field appearance="fill">
        <mat-label>Habilidad</mat-label>
        <input matInput [(ngModel)]="data.title">
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill">
        <mat-label>Porcentage</mat-label>
        <input matInput [(ngModel)]="data.percentage">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Calcelar</button>
      <button mat-button cdkFocusInitial (click)="save()">Actualizar</button>
    </div>

  `,
})
export class UpdateSkillDialog {
  constructor(
    public router: Router, public fb: FormBuilder, private snackBar: MatSnackBar, public dialog: MatDialog,
    private service: ServiceService,
    public dialogRef: MatDialogRef<UpdateSkillDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    const skill = new Skill(
      this.data.id,
      this.data.title,
      this.data.percentage,
      this.data.user
    );
    this.service.updateSkill(skill).subscribe(p => {
      this.snackBar.open("La habilidad se actualizo correctamente.", "Éxito", {duration: 2000});
    })
    this.dialogRef.close();
  }
}


@Component({
  selector: 'add-skill-dialog',
  template: `
    <h1 mat-dialog-title>Crear habilidad</h1>
    <div mat-dialog-content>
      <mat-form-field appearance="fill">
        <mat-label>Habilidad</mat-label>
        <input matInput formControlName="title" type="text">
      </mat-form-field>
      <br>
      <mat-form-field appearance="fill">
        <mat-label>Porcentage</mat-label>
        <input matInput formControlName="percentage" type="number">
      </mat-form-field>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onNoClick()">Calcelar</button>
      <button mat-button cdkFocusInitial (click)="save()">Crear</button>
    </div>
  `
})
export class AddSkillDialog implements OnInit {

  @Input()
  formSkill: FormGroup = this.fb.group({
    id: [null, []],
    title: ['', [Validators.required, Validators.minLength(3)]],
    percentage: ['', [Validators.required]],
    user: ['', [Validators.required]],
  });
  user: any;

  constructor(
    public router: Router, public fb: FormBuilder, private snackBar: MatSnackBar, public dialog: MatDialog,
    private service: ServiceService,
    public dialogRef: MatDialogRef<AddSkillDialog>
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

  save() {
    const skill = new Skill(
      this.formSkill.get(['id'])?.value,
      this.formSkill.get(["title"])?.value,
      this.formSkill.get(["percentage"])?.value,
      this.user
    );
    this.service.saveSkill(skill).subscribe(p => {
        this.snackBar.open("La experiencia se registro correctamente.", "Éxito", {duration: 2000});
      },
      error => {
        this.snackBar.open(error, "Error", {duration: 2000});
      });
    this.dialogRef.close();
  }


}


@Component({
  selector: 'delete-skill-dialog',
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
export class DeleteSkillDialog {
  constructor(private service: ServiceService, private snackBar: MatSnackBar,
              public dialogRef: MatDialogRef<DeleteSkillDialog>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  delete(): void {
    this.service.deleteSkill(this.data.id).subscribe(p => {
      this.snackBar.open("La habilidad se elimino correctamente.", "Éxito", {duration: 2000});
    })
    this.dialogRef.close();
  }
}
