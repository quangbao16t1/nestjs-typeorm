import { IsDate, IsEmail, Matches, Max, MaxDate, MaxLength, Min, MinLength } from "class-validator";
import { Type } from 'class-transformer';


const mobileNumberRegex = /^(\+[0-9]{1,3}[- ]?)?[0-9]{9,10}$/;

export class UserCreateDto {

    @MinLength(4, {
        message: "FirstName is too short"
    })
    firstName: string

    @MinLength(4, {
        message: "FirstName is too short"
    })
    lastName: string

    @IsEmail()
    email: string

    @MinLength(8, {
        message: "Password too short, Password must be 8 characters. "
    })
    @MaxLength(20, {
        message: "Password isn't too long, password less than 20 characters"
    })
    // @Matches(/((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$!%*?&])[A-Za-z0-9@$!%*?&]+)+/g)
    password: string

    @MinLength(4)
    address: string

    @Matches(mobileNumberRegex)
    phoneNumber: string

    @Min(10)
    @Max(100)
    age: number

    avatar: string

    gender: string

    @IsDate()
    @Type(() => Date)
    @MaxDate(new Date())
    birthday: Date

    roleId: number
}

export default UserCreateDto;