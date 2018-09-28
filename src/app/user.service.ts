import { Injectable, OnInit } from '@angular/core';
// для обращения к http
import { HttpClient } from '@angular/common/http';
////

// прототип получаемых данных
import {  IQueue, IAllGames, IPickedGames } from './DataInterface';
////

//
import { Observable } from 'rxjs';
////




@Injectable({
  providedIn: 'root'
})

export class UserService {
  public ic = 0;

  public game: IAllGames[]; // массив игр  типа интерфейса IAllGames[]

  // private global_url = 'https://gamecenterback.azurewebsites.net/api/Gametype/'; // сам сервер
   public global_url = 'http://3682530d.ngrok.io/api/Gametype/';
   public second_url = 'http://3682530d.ngrok.io/api/playermanager/';
  constructor(private http: HttpClient, // для предачи данных
  ) {
  }

  // private _url:string = 'https://jsonplaceholder.typicode.com/users/';//ссылка для получения данных

  public getAll(): Observable<IAllGames[]> {
    return this.http.get<IAllGames[]>(this.global_url); // передаем все данные с ссылки
  }

  public addGame(game: string): Observable<Object> { // добавляем игру
    console.log('addGame');
    return this.http.post(this.global_url + game, '');

  }
  public delGame(game: string): Observable<Object> {// удаляем игру
    console.log('delGame ' + game);
    return this.http.delete<Object>(this.global_url + 'delete/' + game);
  }
  public getAllPeople(): Observable<Object> { // получаем всех людей в очереди
    console.log(`getallpeople try to GET`);
    return this.http.get(`http://3682530d.ngrok.io/api/VkBot/getqueue/`);
  }
  public acceptUser(username: string): Observable<Object> {
    console.log( `acceptUser` );
    return this.http.put<Object>(this.second_url + 'accept/' + username, '');
  }

  public getAllPicked(): Observable<IPickedGames[]> {// получаем все выбранные игры
    console.log('getallpicked');
    return this.http.get<IPickedGames[]>(this.global_url + 'selected/'); // передаем все данные с ссылки;
  }

  public pickGame(gameid: string): Observable<Object> {// выбираем игру
    console.log('pickGame ' + [gameid]);
    return this.http.put<Object>(this.global_url + 'pickgames/', [gameid]); // посылаем запрос на изменение статуса на Selected
  }
  /* public pickGame(gameid:string){
     console.log('pickGame '+ [gameid]);
     if(this._hubConnection){
       return this._hubConnection.invoke('Pick',gameid); //посылаем данные на сервер
     }
     this._hubConnection.on('Pick', (data: any) => {   //получаем данные из сервера
       const received = `Received: ${data}`;

     });
   }
   */
  public unpickGame(gameid: string): Observable<Object> {// удаляем игру из выбранных
    console.log('unpickGame ' + [gameid]);
    return this.http.put<Object>(this.global_url + 'unpickgames/', [gameid]); // посылаем запрос на изменение статуса на Selected
  }

}






