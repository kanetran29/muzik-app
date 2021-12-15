import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table'; 
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

@NgModule({
    declarations: [],
    exports: [
        MatToolbarModule,
        MatIconModule,
        MatMenuModule,
        MatButtonModule,
        MatRippleModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatProgressSpinnerModule,
        MatDialogModule,
        MatCheckboxModule,
        MatCardModule,
        MatTableModule ,
        MatFormFieldModule,
        MatPaginatorModule,
        MatSortModule
    ]
})
export class AudioRecognizerSharedMaterialModule { }
