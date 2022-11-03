import {  IsNotEmpty, IsString } from "class-validator";


//https://docs.nestjs.com/techniques/validation
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
  
  
  image: string;
  
 //@IsNumberString()
  lat:number;
  
  //@IsDecimal()
  lon: number;

  
//   @IsDate()
   date_from: Date;
  }
 
  