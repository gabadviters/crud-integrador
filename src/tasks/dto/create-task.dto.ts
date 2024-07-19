import { IsDate, IsNumber, IsString, Max, MaxLength, Min, MinLength } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(15)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(100)
  description: string;

  @IsDate()
  scheduledTime?: string;

  @IsNumber()
  @Min(1)
  @Max(3)
  priority?: number;
}
