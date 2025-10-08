import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateShippingDto } from './dto/create-shipping.dto';
import { UpdateShippingDto } from './dto/update-shipping.dto';

@Injectable()
export class ShippingService {
  private shippingOptions: any[] = []; // In-memory store for demonstration
  private nextId = 1;

  async create(createShippingDto: CreateShippingDto) {
    const newOption = { id: (this.nextId++).toString(), ...createShippingDto };
    this.shippingOptions.push(newOption);
    return newOption;
  }

  async findAll() {
    return this.shippingOptions;
  }

  async findOne(id: string) {
    const option = this.shippingOptions.find(opt => opt.id === id);
    if (!option) {
      throw new NotFoundException(`Shipping option with ID ${id} not found`);
    }
    return option;
  }

  async update(id: string, updateShippingDto: UpdateShippingDto) {
    const option = await this.findOne(id);
    Object.assign(option, updateShippingDto);
    return option;
  }

  async remove(id: string) {
    const index = this.shippingOptions.findIndex(opt => opt.id === id);
    if (index === -1) {
      throw new NotFoundException(`Shipping option with ID ${id} not found`);
    }
    this.shippingOptions.splice(index, 1);
  }
}

