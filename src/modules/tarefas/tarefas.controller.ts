import { Controller, Get, Post, Body, Param, Delete, Put, Query } from '@nestjs/common';
import { TarefasService } from './tarefas.service';

@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) { }

  @Get()
  listar() {
    return this.tarefasService.listar();
  }

  @Post()
  criar(@Body() body: { titulo: string; custo: number; data_limite: string }) {
    return this.tarefasService.criar(body.titulo, body.custo, new Date(body.data_limite));
  }

  @Put(':id')
  editar(
    @Param('id') id: string,
    @Body() body: { titulo: string; custo: number; data_limite: string }) {
    return this.tarefasService.editar(
      +id,
      body.titulo,       // aqui vai para "nome"
      Number(body.custo),
      new Date(body.data_limite)
    );
  }

  @Delete(':id')
  excluir(@Param('id') id: string) {
    return this.tarefasService.excluir(+id);
  }

  @Put(':id/mover')
  mover(@Param('id') id: string, @Query('direcao') direcao: 'up' | 'down') {
    return this.tarefasService.mover(+id, direcao);
  }
}
