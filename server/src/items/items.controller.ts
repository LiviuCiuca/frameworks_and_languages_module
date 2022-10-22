import { Body, ConsoleLogger, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Post, Query, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
import { isArray } from 'class-validator';
import { isEmpty } from 'cypress/types/lodash';
import { ItemClassDto } from './ClassDTO/itemsClass.dto';
import { Items_Interface } from './items-Model/items-model';
import { ItemsService } from './items.service';


@Controller('')
export class ItemsController {
    constructor(private ItemsService: ItemsService) {}

    @Get('')
    firstPage(){
       var testtt = this.ItemsService.helloPage();
       return testtt;
    }

    @Get('/items')
    findAllItems(@Query() getItemFilter: ItemClassDto):Items_Interface[]{
      if(Object.keys(getItemFilter).length){
         return this.ItemsService.findFilteredItems(getItemFilter);
      }
      else{
        return this.ItemsService.findItems();}
    }

    @Get('/item/:id')
    findItemByID(@Param('id', ParseIntPipe) id : number):Items_Interface{
       const item = this.ItemsService.findItemsById(Number(id));
       return item;
    }
       //dto --> according to the doc. defines how the data is sent over the network, we want to ensure that the received data matches this DTO
    @Post('/item')
    @UsePipes(ValidationPipe)
    createItem(@Body() Create_Item: ItemClassDto ):Items_Interface{
       return this.ItemsService.CreateItem(Create_Item);
    }

    @Delete('/item/:id')
    removeItemById(@Param('id',ParseIntPipe) id: number):void{
      const found = this.ItemsService.findItemsById(id) 
      if(isNaN(found.id)){
         throw new HttpException('item not found!', HttpStatus.NOT_FOUND)
      }
      else {
         this.ItemsService.removeItemById(id);
      throw new HttpException('Item Deleted!', HttpStatus.NO_CONTENT);
   }
    }
}
