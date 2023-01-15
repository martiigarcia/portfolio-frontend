import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {catchError, map, Observable, tap, throwError} from "rxjs";
import {User} from "../../domain/User";
import {WorkExperience} from "../../domain/WorkExperience";
import {Proyect} from "../../domain/Proyect";
import {Skill} from "../../domain/Skill";
import {AcademicExperience} from "../../domain/AcademicExperience";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private resourceUrl: string = environment.backendUrl;

  constructor(private http: HttpClient) {
  }

  findAll(): Observable<User[]> {
    return this.http.get<User[]>(this.resourceUrl + "user/list")
      .pipe(map(resp =>
          this.createUserList(resp)
        // users.map(user => this.createUser(user)
      ))
      ;
  }

  findOne(id: number): Observable<any> {
    return this.http.get<User>(this.resourceUrl + "user/find/" + id)
      .pipe(map(user =>
        // console.log(user)
        this.createUser(this.createUserObject(user))
      ));
  }

  updateMyData(user: User): Observable<any> {
    let pathconcat = this.resourceUrl + 'user/update/' + user.id + "?name=" + user.name +
      "&surname=" + user.surname + "&age=" + user.age + "&email=" + user.email + "&password=" + user.password + "&admin=" + user.admin;

    return this.http.put<any>(pathconcat, {}).pipe(
      catchError(error => {
        return throwError("La informacion no se pudo actualizar correctamente.");
      })
    )
  }
  updateMyInformation(info: string, id:number): Observable<any> {
    // let pathconcat = this.resourceUrl + 'user/update/' + user.id + "?name=" + user.name +
    //   "&surname=" + user.surname + "&age=" + user.age + "&email=" + user.email + "&password=" + user.password + "&admin=" + user.admin;

    return this.http.put<any>(this.resourceUrl + 'user/updateInformation/'+id, info).pipe(
      catchError(error => {
        return throwError("La informacion no se pudo actualizar correctamente.");
      })
    )
  }

  findWorkExperienceByUser(id: number): Observable<any> {
    return this.http.get<WorkExperience>(this.resourceUrl + "workExperience/byUser/" + id)
      .pipe(map(experiences =>
          this.createWorkExperienceList(experiences)
        // console.log(user)
        // this.createUser(this.createUserObject(user))
      ));
  }

  findProyectsByUser(id: number): Observable<any> {
    return this.http.get<Proyect>(this.resourceUrl + "proyect/byUser/" + id)
      .pipe(map(resp =>
          this.createProyectList(resp)
        // console.log(this.createProyectList(resp))

      ));
  }

  findSkillsByUser(id: number): Observable<any> {
    return this.http.get<User>(this.resourceUrl + "skill/byUser/" + id)
      .pipe(map(resp =>
          this.createSkillList(resp)
        // console.log(this.createProyectList(resp))

      ));
  }

  findAcademicExperienceByUser(id: number): Observable<any> {
    return this.http.get<AcademicExperience>(this.resourceUrl + "academicExperience/byUser/" + id)
      .pipe(map(experiences =>
          this.createAcademicExperienceList(experiences)
        // console.log(user)
        // this.createUser(this.createUserObject(user))
      ));
  }

  //CREADORES:
  private createSkillList(information: any): Skill[] {
    // console.log(information.proyects.map((proyect:any)=>this.createProyect(proyect)))
    return information.skills.map((skill: any) => this.createSkill(skill));
  }

  private createSkill(information: any): Skill {
    return new Skill(information.id, information.title, information.percentage, information.user);
  }

  private createProyectList(information: any): Proyect[] {
    // console.log(information.proyects.map((proyect:any)=>this.createProyect(proyect)))
    return information.proyects.map((proyect: any) => this.createProyect(proyect));
  }

  private createProyect(information: any): Proyect {
    return new Proyect(information.id, information.name, information.description, information.period, information.user)
  }

  private createWorkExperienceList(information: any): WorkExperience[] {
    // console.log(information)
    return information.experiences.map((experience: any) => this.createWorkExperience(experience));
  }

  private createWorkExperience(information: any): WorkExperience {
    return new WorkExperience(information.id, information.title, information.description, information.period, information.place, information.user)
  }

  private createAcademicExperienceList(information: any): AcademicExperience[] {
    // console.log(information)
    return information.experiences.map((experience: any) => this.createAcademicExperience(experience));
  }

  private createAcademicExperience(information: any): AcademicExperience {
    return new AcademicExperience(information.id, information.title, information.place, information.period, information.type, information.user)
  }

  private createUserList(information: any): User[] {
    return information.users.map((user: any) => this.createUser(user));
  }

  private createUser(information: any): User {
    // console.log(information.admin)
    return new User(information.id, information.name, information.surname,
      information.age, information.email, information.password, information.admin, information.information);
  }

  private createUserObject(information: any): User {
    return information.user;
  }


}
