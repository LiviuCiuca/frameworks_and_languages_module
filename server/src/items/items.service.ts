import { HttpException, Injectable, MethodNotAllowedException, NotFoundException, HttpStatus } from '@nestjs/common';
import { IsEmpty } from 'class-validator';
import { ItemClassDto } from './ClassDTO/itemsClass.dto';
import { Items_Interface } from './items-Model/items-model';



@Injectable()
export class ItemsService {

    private items: Items_Interface[] = [];
    private auto_id=1;

    auto_Id(){
        var id = this.auto_id++;
        return id;
    }

    iso_date(): string{
        //https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
        let today = new Date().toISOString().slice(0, 10)
        return today;
    }

    helloPage():string{
     const Messagv = "<html><body>Hello world</body></html>";
        return  Messagv;
    }

    findFilteredItems(getItemFilter: ItemClassDto):Items_Interface[]{

        const {user_id} = getItemFilter; 

        let item = this.findItems();
        if(user_id) item = this.items.filter(item=> item.user_id === user_id );

        return item;
    }

    findItems():Items_Interface[]{
        return this.items;
    }

    findItemsById(id:number):Items_Interface{
        const item_found = this.items.find(item => item.id === id);
        if(!item_found){
            throw new NotFoundException();
        }
        return item_found;
    }

    removeItemById(id:number){
        //const found = this.findItemsById(id)
        // if (isNaN(found.id)){
        //     throw new NotFoundException();
        // } 
        // else{
       this.items = this.items.filter(items => items.id !== id);
      // throw new HttpException('item deleted', HttpStatus.NO_CONTENT)
   // }
    }

    CreateItem(Create_ItemClassDto : ItemClassDto):Items_Interface{
        //distracting the dto object
        const{user_id,keywords,description,image,lat,lon} = Create_ItemClassDto;

        const temClassDto : Items_Interface = {
        id : this.auto_Id(),
        user_id,
        keywords,
        description,
        image,
        lat,
        lon,
        date_from: this.iso_date(),
    };
    try{
        if(temClassDto.user_id.length){
            this.items.push(temClassDto)
            return temClassDto;
        }} catch{
            throw new MethodNotAllowedException();
        }
    }
}