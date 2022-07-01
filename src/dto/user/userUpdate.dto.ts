import { Type } from "class-transformer";
import { IsDate, IsEmail, Matches, Max, MaxDate, MaxLength, Min, MinLength } from "class-validator"

const mobileNumberRegex = /^(\+[0-9]{1,3}[- ]?)?[0-9]{9,10}$/;

export class UserUpdateDto {

    @MinLength(4, {
        message: "FirstName is too short"
    })
    firstName: string

    @MinLength(4, {
        message: "FirstName is too short"
    })
    lastName: string

    @MinLength(4)
    address: string

    @Matches(mobileNumberRegex)
    phoneNumber: string

    @Min(10)
    @Max(100)
    age: number

    avatar: string

    gender: string

    @Type(() => Date)
    @IsDate()
    @MaxDate(new Date())
    birthday: Date

    roleId: number
}