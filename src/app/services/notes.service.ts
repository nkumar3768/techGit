import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  //baseURL:string="http://localhost:8089/";
  baseURL:string="https://application-service.herokuapp.com/"

  constructor(private http: HttpClient) { }

  saveNotes(noteJson): Observable<any> {
    return this.http.post(this.baseURL + 'saveNotes', noteJson);
  }

  readNotes(): Observable<any>{
    return this.http.get(this.baseURL + "notes");
  }
}
