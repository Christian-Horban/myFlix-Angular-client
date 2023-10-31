import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

/** API URL */
const apiUrl = 'https://horban-movie-api.herokuapp.com/';

/**
 * Service for user registration and movie-related functionalities.
 * @class
 */
@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  /**
   * Constructor that initializes the HttpClient module.
   * @param {HttpClient} http - The HTTP client to make API calls.
   */
  constructor(private http: HttpClient) {}

  /**
   * Registers a new user.
   * @param userDetails - User registration details.
   * @returns {Observable<any>} Observable of the API response.
   */
  public userRegistration(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'users', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Authenticates an existing user.
   * @param userDetails - User login details.
   * @returns {Observable<any>} Observable of the API response.
   */
  public userLogin(userDetails: any): Observable<any> {
    return this.http
      .post(apiUrl + 'login', userDetails)
      .pipe(catchError(this.handleError));
  }

  /**
   * Fetches all movies.
   * @returns {Observable<any>} Observable containing a list of all movies.
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Fetches details of a single movie by title.
   * @param {string} title - Title of the movie.
   * @returns {Observable<any>} Observable containing movie details.
   */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'movies/' + title, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Fetches details of a director by name.
   * @param {string} directorName - Name of the director.
   * @returns {Observable<any>} Observable containing director details.
   */
  getOneDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'director/' + directorName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Fetches details of a genre by name.
   * @param {string} genreName - Name of the genre.
   * @returns {Observable<any>} Observable containing genre details.
   */
  getOneGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'genre/' + genreName, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Fetches a user's favorite movies.
   * @param {string} username - Username of the user.
   * @returns {Observable<any>} Observable containing a list of favorite movies.
   */
  getFavoriteMovies(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .get(apiUrl + 'users/' + username + '/FavoriteMovies', {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Adds a movie to a user's list of favorite movies.
   *
   * @param {string} username - The username of the user.
   * @param {string} movieId - The ID of the movie to be added to the favorites.
   * @returns {Observable<any>} Observable of the API response, indicating success or failure.
   *
   * @example
   * service.addMovieToFavorites('johnDoe', '12345').subscribe(response => {
   *   console.log('Movie added to favorites:', response);
   * });
   */

  addMovieToFavorites(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .post(
        apiUrl + 'users/' + username + '/FavoriteMovies/' + movieId,
        {},
        {
          headers: new HttpHeaders({
            Authorization: 'Bearer ' + token,
          }),
        }
      )
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Removes a movie from a user's list of favorite movies.
   *
   * @param {string} username - The username of the user.
   * @param {string} movieId - The ID of the movie to be removed from the favorites.
   * @returns {Observable<any>} Observable of the API response, indicating success or failure.
   *
   * @example
   * service.removeMovieFromFavorites('johnDoe', '12345').subscribe(response => {
   *   console.log('Movie removed from favorites:', response);
   * });
   */

  removeMovieFromFavorites(username: string, movieId: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + username + '/FavoriteMovies/' + movieId, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Edits the details of an existing user.
   *
   * @param {any} updatedUser - An object containing the details of the user that need to be updated.
   *                            This object should have fields corresponding to the user attributes
   *                            that need updating.
   * @returns {Observable<any>} Observable of the API response, indicating success or failure of the update.
   *
   * @throws {HttpErrorResponse} Throws an error if the API call fails.
   *
   * @example
   * const updatedDetails = {
   *   Username: 'newUsername',
   *   Password: 'newPassword',
   *   Email: 'newEmail@example.com',
   *   Birthdate: '1990-01-01'
   * };
   * service.editUser(updatedDetails).subscribe(response => {
   *   console.log('User details updated:', response);
   * });
   *
   * @remarks
   * The user whose details are being updated is identified using the 'user' object from local storage.
   */

  editUser(updatedUser: any): Observable<any> {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const token = localStorage.getItem('token');
    return this.http
      .put(apiUrl + 'users/' + user.Username, updatedUser, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Deletes a specified user.
   *
   * @param {string} username - The unique identifier (username) of the user that needs to be deleted.
   * @returns {Observable<any>} Observable of the API response, indicating success or failure of the deletion.
   *
   * @throws {HttpErrorResponse} Throws an error if the API call fails.
   *
   * @example
   * const targetUsername = 'JohnDoe';
   * service.deleteUser(targetUsername).subscribe(response => {
   *   console.log('User deleted:', response);
   * });
   *
   * @remarks
   * The caller of this method must have valid authorization, usually granted through a token, to delete a user.
   * The method will attempt to retrieve this token from local storage and include it in the request headers.
   */

  deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http
      .delete(apiUrl + 'users/' + username, {
        headers: new HttpHeaders({
          Authorization: 'Bearer ' + token,
        }),
      })
      .pipe(map(this.extractResponseData), catchError(this.handleError));
  }

  /**
   * Extracts the data from the HTTP response.
   * @private
   * @param {any} res - The HTTP response.
   * @returns {any} - The data extracted from the response.
   */
  private extractResponseData(res: any): any {
    const body = res;
    return body || {};
  }

  /**
   * Handles HTTP errors.
   * @private
   * @param {HttpErrorResponse} error - The error object.
   * @returns {Observable<never>} - Observable to throw an error message.
   */
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, Error body is: ${JSON.stringify(
          error.error
        )}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }
}
