import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsDateString,
  IsInt,
} from 'class-validator';

export class CreateTarefaDto {
  @IsString()
  @IsNotEmpty({ message: 'O título não pode ser vazio.' })
  titulo: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O custo não pode ser vazio.' })
  custo: number;

  @IsDateString()
  @IsNotEmpty({ message: 'A data limite não pode ser vazia.' })
  data_limite: Date;

  @IsInt()
  @IsNotEmpty({ message: 'O orderIndex não pode ser vazio.' })
  orderIndex: number;
}