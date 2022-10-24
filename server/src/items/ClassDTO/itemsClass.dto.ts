import { IsArray, IsDecimal, IsEmpty, isNotEmpty, IsNotEmpty, IsNumber, isNumberString, IsNumberString, IsString } from "class-validator";



//added validation
export class ItemClassDto
 {
  //@IsNumberString()
  id:number;

  @IsString()
  @IsNotEmpty()
  user_id: string;

  @IsNotEmpty()
  keywords: [];

  @IsNotEmpty()
  description: string;
  
  //i have to set to a image url
  image: string;
  
 //@IsNumberString()
  lat:number;
  
  //@IsDecimal()
  lon: number;

  
//   @IsDate()
   date_from: Date;
  }
 
  