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
    iso_date(): string{
        //https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
        let today = new Date().toISOString().slice(0, 10)
        return today;

    }

    

    helloPage():string{
     const Messagv = "<html><body>Hello world</body></html>";
        return  Messagv;
     
    }

    findAllItems():Items_Interface[]{
        return this.items;
    }

    findItemsById(id:number):Items_Interface{
        return this.items.find(item => item.id === id);
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
        date_from: this.iso_date(),
    };
     
         this.items.push(temClassDto)
         return temClassDto;
    }
}