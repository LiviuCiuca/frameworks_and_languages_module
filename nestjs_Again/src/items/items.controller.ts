import { Controller,Get, HttpException, HttpStatus, HttpCode , Param, ParseIntPipe, Body , Delete, Post,Res,Req, UsePipes, ValidationPipe, ConsoleLogger, ParseFloatPipe} from '@nestjs/common';
import { ItemClassDto } from './ClassDTO/itemsClass.dto';
import { Items_Interface } from './items-Model/items-model';
import { ItemsService } from './items.service';



@Controller('')
export class ItemsController {
    constructor(private ItemsService: ItemsService) {}

   

    //dto --> according to the doc. defines how the data is sent over the network, we want to ensure that the reveived data matches this DTO
    @Post('/item')
    @UsePipes(ValidationPipe)
    createItem(@Body() Create_ItemClassDto: ItemClassDto ){
        var createdIte = this.ItemsService.CreateItem(Create_ItemClassDto);
        if(createdIte.user_id != null){
         //console.log(HttpStatus.CREATED);
        return createdIte;
    }
        else throw new HttpException('Item Not created!', HttpStatus.METHOD_NOT_ALLOWED);
    }
    
    // }
    @Get('')
    firstPage(){
        var testtt = this.ItemsService.helloPage();
       return testtt;
    }
    @Get('/items')
    findAllItems():Items_Interface[]{
        return this.ItemsService.findAllItems();
    }

    @Get('/item/:id')
    findItemByID(@Param('id', ParseIntPipe) id : number):Items_Interface{
       const item = this.ItemsService.findItemsById(Number(id));
       //console.log(typeof id); 
       if(item)
       return item;
       else throw new HttpException('Item Not Found!', HttpStatus.NOT_FOUND);
    }

    @Delete('/item/:id')
    removeItemById(@Param('id') id: number){
       this.ItemsService.removeItemById(id);
      throw new HttpException('Item Deleted!', HttpStatus.NO_CONTENT); 
    }
}
