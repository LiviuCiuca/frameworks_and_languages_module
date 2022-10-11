import { Injectable } from '@nestjs/common';
import { ItemClassDto } from './ClassDTO/itemsClass.dto';
import { Items_Interface } from './items-Model/items-model';


@Injectable()
export class ItemsService {
    // test values
    private items: Items_Interface[] = [];
    private auto_id=1;
    
    auto_Id(){
        var id = this.auto_id++;
        return id;
    }

    

    helloPage():string{
     const Messagv = "<html><body>Hello world</body></html>";
        return  Messagv;
     
    }

    findAllItems():Items_Interface[]{
        return this.items;
    }

    findItemsById(Id:number):Items_Interface{
        return this.items.find(item => item.id === Id);
    }

    removeItemById(id:number){
        this.items = this.items.filter(items => items.id !== id); 
      
    }
    CreateItem(Create_ItemClassDto : ItemClassDto):Items_Interface{
        //distracting the dto object
        const{user_id,keywords,description,lat,lon} = Create_ItemClassDto;

        const temClassDto : Items_Interface = {
        id : this.auto_Id(),
        user_id,
        keywords,
        description,
        lat,
        lon,
    };
     
         this.items.push(temClassDto)
         return temClassDto;
    }
}