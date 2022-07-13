import { Type } from "class-transformer";
import { IsArray, IsOptional, IsString } from "class-validator";

export class QueryDto {
  @IsOptional()
  @Type(() => String)
  keyword?: string

  @IsString()
  @IsOptional()
  limit?: number;

  @IsString()
  @IsOptional()
  page?: number;

  @IsOptional()
  @Type(() => String)
  filter?: string;
}