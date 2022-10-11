import { Body, ConsoleLogger, Controller, Delete, Get, HttpCode, HttpException, HttpStatus, Param, ParseFloatPipe, ParseIntPipe, Post, Query, Req, Res, UsePipes, ValidationPipe } from '@nestjs/common';
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
       //dto --> according to the doc. defines how the data is sent over the network, we want to ensure that the reveived data matches this DTO
    @Post('/item')
    @UsePipes(ValidationPipe)
    createItem(@Body() Create_Item: ItemClassDto ){

        var createdIte = this.ItemsService.CreateItem(Create_Item);

if(createdIte.user_id != null){
   //console.log(HttpStatus.CREATED);
   return createdIte;
  }
  else throw new HttpException('Item Not created!', HttpStatus.METHOD_NOT_ALLOWED);
  }
       

    @Delete('/item/:id')
    @UsePipes(ValidationPipe)
    removeItemById(@Param('id') id: number):void{

       this.ItemsService.removeItemById(id);
       throw new HttpException('Item Deleted!', HttpStatus.NO_CONTENT);
    }
}
