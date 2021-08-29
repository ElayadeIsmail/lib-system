import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  createCategory(categoryInput: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepo.create(categoryInput);
    return this.categoryRepo.save(category);
  }

  async deleteCategory(id: number): Promise<Category> {
    const category = await this.categoryRepo.findOne(id);
    if (!category) {
      throw new NotFoundException('Category does not exist with this id');
    }
    return this.categoryRepo.remove(category);
  }

  async updateCategory(
    updateCategoryInput: UpdateCategoryDto,
  ): Promise<Category> {
    const { id, name } = updateCategoryInput;
    const category = await this.categoryRepo.findOne(id);
    if (!category) {
      throw new NotFoundException('There is no Category with this ID');
    }
    category.name = name;
    return this.categoryRepo.save(category);
  }

  getCategoryById(id: number): Promise<Category> {
    if (!id) {
      throw new NotFoundException('There is no Category with this ID');
    }
    return this.categoryRepo.findOne(id);
  }

  getAllCategories(): Promise<Category[]> {
    return this.categoryRepo.find();
  }
}
