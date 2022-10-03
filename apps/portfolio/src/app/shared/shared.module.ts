import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { IconsModule } from './icons.module';

@NgModule({
  exports: [NgOptimizedImage, IconsModule],
  imports: [CommonModule, NgOptimizedImage, IconsModule],
})
export class SharedModule {}
