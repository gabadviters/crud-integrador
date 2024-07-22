import { IsNumber, IsOptional, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  description: string;

  @IsString()
  @IsOptional()
  scheduledTime: string;

  @IsNumber()
  @Min(1)
  @Max(3)
  @IsOptional()
  priority: number;
}
