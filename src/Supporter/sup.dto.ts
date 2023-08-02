import{IsNotEmpty, IsEmail,MinLength} from "class-validator";
export class CreatesupDto {
  @IsNotEmpty()
    username: string;
    @IsNotEmpty()
    @MinLength(6)
    password: string;
    @IsEmail()
    email:string;
   
   

  }
  