import { Injectable, MethodNotAllowedException, NotFoundException} from '@nestjs/common';
import { ItemClassDto } from './ClassDTO/itemsClass.dto';
import { Items_Interface } from './items-Model/items-model';


// the logic of the server
@Injectable()
export class ItemsService {

    // an array of my objects
    private items: Items_Interface[] = [];
    //counter
    private auto_id=1;

    //method to increment ID called on every post 
    auto_Id(){
        var id = this.auto_id++;
        return id;
    }

    //method to set the current date
    iso_date(): string{
        //https://stackoverflow.com/questions/1531093/how-do-i-get-the-current-date-in-javascript
        let today = new Date().toISOString().slice(0, 10)
        return today;
    }

    //returns html message
    helloPage():string{
     const Messagv = "<html><body>Hello world</body></html>";
        return  Messagv;
    }

    //the query logic, getting all the items then filter them by the user_id 
    findFilteredItems(getItemFilter: ItemClassDto):Items_Interface[]{

        const {user_id} = getItemFilter; 
        
        let item = this.findItems();
        if(user_id) item = this.items.filter(item=> item.user_id === user_id );

        return item;
    }

    //gets all items 
    findItems():Items_Interface[]{
        return this.items;
    }

    //gets item by id, if not return a 404 status code 
    findItemsById(id:number):Items_Interface{
        const item_found = this.items.find(item => item.id === id);
        if(!item_found){
            throw new NotFoundException();
        }
        return item_found;
    }

    //replaces the array with a new array that does`t contain the found item
    removeItemById(id:number){
       this.items = this.items.filter(items => items.id !== id);
    }
    
    // post logic, where 
    CreateItem(Create_ItemClassDto : ItemClassDto):Items_Interface{
        //distracting the dto object
        const{user_id,keywords,description,image,lat,lon} = Create_ItemClassDto;

        //an object that inherits the interface data
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
    // if the object array is empty then return 405 status code
    // if not empty push the new item to array  
        if(Object.keys(temClassDto).length === 0){
            throw new MethodNotAllowedException();
        }
            this.items.push(temClassDto)
            return temClassDto;
    }
}