import { Args, Int, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CategoriesService } from './categories.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Resolver((of) => Category)
export class CategoriesResolver {
  constructor(private categoriesService: CategoriesService) {}
  @Mutation(() => Category)
  createCategory(@Args('categoryInput') categoryInput: CreateCategoryDto) {
    return this.categoriesService.createCategory(categoryInput);
  }

  @Query(() => Category, { nullable: true })
  getCategoryById(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.getCategoryById(id);
  }

  @Mutation(() => Category)
  updateCategory(
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(updateCategoryInput);
  }

  @Query(() => [Category])
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Mutation(() => Category)
  deleteCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.deleteCategory(id);
  }
}
