import CategoryProduct from "./CategoryProduct.model";
import CategoryService from "./CategoryService.model";

export default interface Categories{
    categoryId: number;
    categoryTitle: string;
    categoryType: CategoryProduct | CategoryService
} 