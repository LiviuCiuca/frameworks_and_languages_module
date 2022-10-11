import { IsArray, IsDecimal, IsEmpty, IsNotEmpty, IsNumber, IsNumberString, IsString } from "class-validator";



//added validation
export class ItemClassDto
 {
  //@IsNumberString()
  id:number;

  //@IsString()
  user_id: string;

  //@IsNotEmpty()
  keywords: [];

  //@IsNotEmpty()
  description: string;
  
  //i have to set to a image url
  //image: string;
  
  //@IsNumberString()
  lat:number;
  
 // @IsDecimal()
  lon: number;

  
//   @IsDate()
//   date_from: VarDate;
  }
 
  