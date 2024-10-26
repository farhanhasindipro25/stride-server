import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  constructor(private categoriesService: CategoriesService){}
}
