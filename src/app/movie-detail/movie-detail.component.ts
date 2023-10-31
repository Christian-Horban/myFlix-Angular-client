import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

/**
 * A component representing a detailed view of a movie inside a dialog.
 */
@Component({
  selector: 'app-movie-detail-dialog',
  templateUrl: './movie-detail.component.html',
  styleUrls: ['./movie-detail.component.scss'],
})
export class MovieDetailComponent implements OnInit {
  /**
   * Constructs the MovieDetailComponent.
   *
   * @param data The data to be displayed inside the dialog. Contains title and content of the movie.
   */
  constructor(
    @Inject(MAT_DIALOG_DATA)
    public data: {
      title: string;
      content: string;
    }
  ) {}

  /**
   * Angular lifecycle method called on component initialization.
   */
  ngOnInit(): void {}
}
