import {Component, HostListener, Inject, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {ProgressSpinnerMode} from '@angular/material/progress-spinner';
import {Router} from "@angular/router";
import {UserServiceService} from "../../../services/UserService/user-service.service";
import {Skill} from "../../../domain/Skill";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";

export interface DialogData {
  title: string;
  percentage: number;
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
              private userServiceService: UserServiceService) {
  }


  ngOnInit(): void {
    this.findSkillsByUser(1);
    console.log(this.editMode)
    // console.log(this.skills)
  }

  findSkillsByUser(id: number) {
    this.userServiceService.findSkillsByUser(id).subscribe(skillsX => {
      console.log(skillsX);
      this.skills = skillsX;
    })
  }


  openDialog() {
    const dialogRef = this.dialog.open(DialogContentExampleDialog, {
      data: {title: "Html", percentage: 75},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  deleteSkill() {
    alert("DELETE")
  }

  edit() {
    this.editMode = !this.editMode;
  }

  add() {
    console.log("add event")
    const dialogRef = this.dialog.open(AddSkillDialog, {
      data: {title: "", percentage: 0},
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}

@Component({
  selector: 'dialog-content-example-dialog',
  templateUrl: 'dialog-content-example-dialog.html',
})
export class DialogContentExampleDialog {
  constructor(
    public dialogRef: MatDialogRef<DialogContentExampleDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  onNoClick(): void {
    console.log(this.data);
    this.dialogRef.close();
  }
}


@Component({
  selector: 'dialog-content-example-dialog',
  template: `
    <h1 mat-dialog-title>Crear habilidad</h1>
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
      <button mat-button [mat-dialog-close]="data.title" cdkFocusInitial>Crear</button>
    </div>
  `
})
export class AddSkillDialog {
  constructor(
    public dialogRef: MatDialogRef<AddSkillDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  onNoClick(): void {
    console.log(this.data);
    this.dialogRef.close();
  }
}
