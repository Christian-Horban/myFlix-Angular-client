import { Component, OnInit } from '@angular/core';
import { UserRegistrationService } from '../fetch-api-data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MovieDetailComponent } from '../movie-detail/movie-detail.component';
import { Router } from '@angular/router';

/**
 * A component representing a movie card.
 */
@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss'],
})
export class MovieCardComponent implements OnInit {
  /** An array of movies */
  movies: any[] = [];

  /**
   * Constructs the MovieCard component.
   *
   * @param fetchApiData Service for fetching API data.
   * @param dialog Dialog service from Angular Material.
   * @param snackBar Snackbar service for showing notifications.
   * @param router Service for routing.
   */
  constructor(
    public fetchApiData: UserRegistrationService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  /**
   * Angular lifecycle method called on component initialization.
   */
  ngOnInit(): void {
    const user = localStorage.getItem('user');

    if (!user) {
      this.router.navigate(['welcome']);
      return;
    }

    this.getMovies();
  }

  /**
   * Fetches all movies from the API and sets them to the movies property.
   */
  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;

      return this.movies;
    });
  }

  /**
   * Opens a dialog showing genre details.
   *
   * @param genre The genre details to display.
   */
  openGenreDialog(genre: any): void {
    this.dialog.open(MovieDetailComponent, {
      data: {
        title: genre.Name,
        content: genre.Description,
      },
    });
  }

  /**
   * Opens a dialog showing movie synopsis.
   *
   * @param synopsis The synopsis to display.
   */
  openSynopsisDialog(synopsis: string): void {
    this.dialog.open(MovieDetailComponent, {
      data: {
        title: 'Description',
        content: synopsis,
      },
    });
  }

  /**
   * Opens a dialog showing director details.
   *
   * @param director The director details to display.
   */
  openDirectorDialog(director: any): void {
    this.dialog.open(MovieDetailComponent, {
      data: {
        title: director.Name,
        content: director.Bio,
      },
    });
  }

  /**
   * Removes a movie from the user's favorites and shows a snackbar notification.
   *
   * @param id The movie ID to remove from favorites.
   */
  removeFavorite(id: string): void {
    const username = JSON.parse(localStorage.getItem('user') || '{}').Username;
    this.fetchApiData.removeMovieFromFavorites(username, id).subscribe(() => {
      this.snackBar.open('removed from favorites', 'OK', {
        duration: 2000,
      });
    });
  }

  /**
   * Adds a movie to the user's favorites and shows a snackbar notification.
   *
   * @param id The movie ID to add to favorites.
   */
  addFavorite(id: string): void {
    const username = JSON.parse(localStorage.getItem('user') || '{}').Username;
    this.fetchApiData.addMovieToFavorites(username, id).subscribe(() => {
      this.snackBar.open('added to favorites', 'OK', {
        duration: 2000,
      });
    });
  }
}
