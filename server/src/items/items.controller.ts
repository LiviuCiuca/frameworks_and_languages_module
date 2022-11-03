import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseIntPipe, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ItemClassDto } from './ClassDTO/itemsClass.dto';
import { Items_Interface } from './items-Model/items-model';
import { ItemsService } from './items.service';

//main controller
@Controller('')
export class ItemsController {
    constructor(private ItemsService: ItemsService) {}

    //this controller is responsible for displaying html text on the root path
    @Get('')
    firstPage(){
       var testtt = this.ItemsService.helloPage();
       return testtt;
    }

    //this controller returns the items found by the query string
    //if theres no query string then returns all items
    @Get('/items')
    findAllItems(@Query() getItemFilter: ItemClassDto):Items_Interface[]{
      if(Object.keys(getItemFilter).length){
         return this.ItemsService.findFilteredItems(getItemFilter);
      }
      else{
        return this.ItemsService.findItems();}
    }

    //Explicit conversion https://docs.nestjs.com/techniques/validation#explicit-conversion
    //get controller that returns all items found by an id
    @Get('/item/:id')
    findItemByID(@Param('id', ParseIntPipe) id : number):Items_Interface{
      return this.ItemsService.findItemsById(Number(id));
    }

    //dto --> according to the doc. defines how the data is sent over the network, we want to ensure that the received data matches this DTO
    // use pipes validates the data if anything not according with our spec , returns 400 status code
    //Post --> sends new data into our array
    @Post('/item')
    @UsePipes(ValidationPipe)
    createItem(@Body() Create_Item: ItemClassDto ):Items_Interface{
      return this.ItemsService.CreateItem(Create_Item);
    }

    // Explicit conversion https://docs.nestjs.com/techniques/validation#explicit-conversion
    // https://melvingeorge.me/blog/make-simple-delete-request-api-endpoint-nestjs
    // if the id of the "found" object is null then return status code 404 -> else delete item
    @Delete('/item/:id')
    removeItemById(@Param('id',ParseIntPipe) id: number):void{
      const found = this.ItemsService.findItemsById(id) 
      if(isNaN(found.id)){
         throw new HttpException('item not found!', HttpStatus.NOT_FOUND)
      }
      
      this.ItemsService.removeItemById(found.id);
      throw new HttpException('Item Deleted!', HttpStatus.NO_CONTENT);
    }
}
