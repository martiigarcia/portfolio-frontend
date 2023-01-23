import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
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
export class ServiceService {
  private resourceUrl: string = environment.backendUrl;

  constructor(private http: HttpClient) {
  }

  //SERVICIO:

  //User:
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

  updateMyInformation(info: string, id: number): Observable<any> {
    // let pathconcat = this.resourceUrl + 'user/update/' + user.id + "?name=" + user.name +
    //   "&surname=" + user.surname + "&age=" + user.age + "&email=" + user.email + "&password=" + user.password + "&admin=" + user.admin;

    return this.http.put<any>(this.resourceUrl + 'user/updateInformation/' + id, info).pipe(
      catchError(error => {
        return throwError("La informacion no se pudo actualizar correctamente.");
      })
    )
  }

  //Work Experience:
  findWorkExperienceByUser(id: number): Observable<any> {
    return this.http.get<WorkExperience>(this.resourceUrl + "workExperience/byUser/" + id)
      .pipe(map(experiences =>
          this.createWorkExperienceList(experiences)
        // console.log(user)
        // this.createUser(this.createUserObject(user))
      ));
  }

  saveWorkExperience(experience: WorkExperience): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    const body = {
      "description": experience.description,
      "title": experience.title,
      "period": experience.period,
      "place": experience.place,
      "user": {
        "id": experience.user.id
      }
    }

    return this.http.post<WorkExperience>(this.resourceUrl + "workExperience/save", body, options)
      .pipe(catchError(error => {
          return throwError("La informacion no se pudo registrar correctamente.");
        })
      );
  }

  updateWorkExperience(experience: WorkExperience): Observable<any> {
    let pathconcat = this.resourceUrl + 'workExperience/update/' + experience.id + "?title=" + experience.title +
      "&description=" + experience.description + "&period=" + experience.period + "&place=" + experience.place;

    return this.http.put<any>(pathconcat, {}).pipe(
      catchError(error => {
        return throwError("La informacion no se pudo actualizar correctamente.");
      })
    )
  }

  deleteWorkExperience(id: number): Observable<any> {
    return this.http.delete<any>(this.resourceUrl + "workExperience/delete/" + id).pipe(
      catchError(error => {
        return throwError("La informacion no se pudo actualizar correctamente.");
      })
    )
  }


  //Proyects:
  findProyectsByUser(id: number): Observable<any> {
    return this.http.get<Proyect>(this.resourceUrl + "proyect/byUser/" + id)
      .pipe(map(resp =>
          this.createProyectList(resp)
        // console.log(this.createProyectList(resp))

      ));
  }

  saveProyect(proyect: Proyect): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    const body = {
      "description": proyect.description,
      "name": proyect.name,
      "period": proyect.period,
      "user": {
        "id": proyect.user.id
      }
    }

    return this.http.post<Proyect>(this.resourceUrl + "proyect/save", body, options)
      .pipe(catchError(error => {
          return throwError("La informacion no se pudo registrar correctamente.");
        })
      );
  }

  updateProyect(proyect: Proyect): Observable<any> {
    let pathconcat = this.resourceUrl + 'proyect/update/' + proyect.id + "?name=" + proyect.name +
      "&description=" + proyect.description + "&period=" + proyect.period ;

    return this.http.put<any>(pathconcat, {}).pipe(
      catchError(error => {
        return throwError("La informacion no se pudo actualizar correctamente.");
      })
    )
  }

  deleteProyect(id: number): Observable<any> {
    return this.http.delete<any>(this.resourceUrl + "proyect/delete/" + id).pipe(
      catchError(error => {
        return throwError("La informacion no se pudo actualizar correctamente.");
      })
    )
  }


  //Skills:
  findSkillsByUser(id: number): Observable<any> {
    return this.http.get<User>(this.resourceUrl + "skill/byUser/" + id)
      .pipe(map(resp =>
          this.createSkillList(resp)
        // console.log(this.createProyectList(resp))

      ));
  }

  saveSkill(skill: Skill): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    const body = {
      "percentage": skill.percentage,
      "title": skill.title,
      "user": {
        "id": skill.user.id
      }
    }

    return this.http.post<Skill>(this.resourceUrl + "skill/save", body, options)
      .pipe(catchError(error => {
          return throwError("La informacion no se pudo registrar correctamente.");
        })
      );
  }

  updateSkill(skill: Skill): Observable<any> {
    let pathconcat = this.resourceUrl + 'skill/update/' + skill.id + "?title=" + skill.title +
      "&percentage=" + skill.percentage ;

    return this.http.put<any>(pathconcat, {}).pipe(
      catchError(error => {
        return throwError("La informacion no se pudo actualizar correctamente.");
      })
    )
  }

  deleteSkill(id: number): Observable<any> {
    return this.http.delete<any>(this.resourceUrl + "skill/delete/" + id).pipe(
      catchError(error => {
        return throwError("La informacion no se pudo actualizar correctamente.");
      })
    )
  }


  //Academic Experience:
  findAcademicExperienceByUser(id: number): Observable<any> {
    return this.http.get<AcademicExperience>(this.resourceUrl + "academicExperience/byUser/" + id)
      .pipe(map(experiences =>
          this.createAcademicExperienceList(experiences)
        // console.log(user)
        // this.createUser(this.createUserObject(user))
      ));
  }

  saveAcademicExperience(experience: AcademicExperience): Observable<any> {
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    const options = {headers: headers};
    const body = {
      "place": experience.place,
      "title": experience.title,
      "period": experience.period,
      "type": experience.type,
      "user": {
        "id": experience.user.id
      }
    }

    return this.http.post<AcademicExperience>(this.resourceUrl + "academicExperience/save", body, options)
      .pipe(catchError(error => {
          return throwError("La informacion no se pudo registrar correctamente.");
        })
      );
  }

  updateAcademicExperience(experience: AcademicExperience): Observable<any> {
    let pathconcat = this.resourceUrl + 'academicExperience/update/' + experience.id + "?title=" + experience.title +
      "&place=" + experience.place + "&period=" + experience.period + "&type=" + experience.type;

    return this.http.put<any>(pathconcat, {}).pipe(
      catchError(error => {
        return throwError("La informacion no se pudo actualizar correctamente.");
      })
    )
  }

  deleteAcademicExperience(id: number): Observable<any> {
    return this.http.delete<any>(this.resourceUrl + "academicExperience/delete/" + id).pipe(
      catchError(error => {
        return throwError("La informacion no se pudo actualizar correctamente.");
      })
    )
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
