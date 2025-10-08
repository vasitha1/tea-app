import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from '../../entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// import { Category } from '../../entities/category.entity'; // Removed Category entity import
// import { CloudinaryService } from '../cloudinary/cloudinary.service'; // Commented out CloudinaryService

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    // @InjectRepository(Category) // Removed Category repository injection
    // private readonly categoryRepository: Repository<Category>,
//    private readonly cloudinaryService: CloudinaryService, // Commented out CloudinaryService
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    // const { categoryId, imageUrl, imagePublicId, ...productData } = createProductDto; // Removed categoryId, imagePublicId
    // const category = await this.categoryRepository.findOne({
    //   where: { id: categoryId },
    // });

    // if (!category) {
    //   throw new NotFoundException(`Category with ID ${categoryId} not found`);
    // }

    const product = this.productRepository.create({ ...createProductDto }); // Directly use createProductDto
    return this.productRepository.save(product);
  }

  async findAll(
    search?: string,
    // categoryId?: string, // Removed categoryId parameter
  ): Promise<Product[]> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      // .leftJoinAndSelect('product.category', 'category'); // Removed category join

    if (search) {
      queryBuilder.andWhere(
        '(LOWER(product.name) LIKE LOWER(:search) OR LOWER(product.shortDescription) LIKE LOWER(:search) OR LOWER(product.longDescription) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
    }

    // if (categoryId) {
    //   queryBuilder.andWhere('product.categoryId = :categoryId', { categoryId });
    // }

    return queryBuilder.getMany();
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({
      where: { id },
      relations: ['reviews', 'wishlists'], // Removed 'category' from relations
    });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    // const { categoryId, imageUrl, imagePublicId, ...updateData } = updateProductDto; // Removed categoryId, imagePublicId

    // if (categoryId) {
    //   const category = await this.categoryRepository.findOne({
    //     where: { id: categoryId },
    //   });
    //   if (!category) {
    //     throw new NotFoundException(`Category with ID ${categoryId} not found`);
    //   }
    //   product.category = category;
    // }

//    if (updateData.imageUrl && product.imagePublicId) {
//      await this.cloudinaryService.deleteImage(product.imagePublicId);
//    }

    // Object.assign(product, { ...updateData, imageUrl, imagePublicId }); // Removed categoryId, imagePublicId
    Object.assign(product, updateProductDto); // Directly assign updateProductDto
    return this.productRepository.save(product);
  }

  async remove(id: string): Promise<void> {
    const product = await this.findOne(id);

//    if (product.imagePublicId) {
//      await this.cloudinaryService.deleteImage(product.imagePublicId);
//    }

    await this.productRepository.remove(product);
  }
}
