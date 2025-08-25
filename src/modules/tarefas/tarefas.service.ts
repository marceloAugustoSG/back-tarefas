import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Tarefa } from 'generated/prisma';

@Injectable()
export class TarefasService {
  constructor(private prisma: PrismaService) { }

  async listar(): Promise<Tarefa[]> {
    return this.prisma.tarefa.findMany({
      orderBy: { orderIndex: 'asc' },
    });
  }

  async buscarPorId(id: number): Promise<Tarefa> {
    const tarefa = await this.prisma.tarefa.findUnique({ where: { id } });
    if (!tarefa) throw new NotFoundException('Tarefa não encontrada');
    return tarefa;
  }

  async criar(titulo: string, custo: number, data_limite: Date): Promise<Tarefa> {
    // Verifica se já existe tarefa com o mesmo titulo
    const existe = await this.prisma.tarefa.findUnique({
      where: { titulo },
    });
    if (existe) {
      throw new BadRequestException('Já existe uma tarefa com esse título');
    }

    // Pega a última ordem existente
    const ultimaTarefa = await this.prisma.tarefa.findFirst({
      orderBy: { orderIndex: 'desc' },
    });

    const novaOrdem = ultimaTarefa ? ultimaTarefa.orderIndex + 1 : 1;

    return this.prisma.tarefa.create({
      data: { titulo, custo, data_limite, orderIndex: novaOrdem },
    });
  }

  async editar(id: number, titulo: string, custo: number, data_limite: Date): Promise<Tarefa> {
    if (!titulo) throw new BadRequestException('O nome da tarefa é obrigatório');

    const existe = await this.prisma.tarefa.findUnique({
      where: { titulo: titulo },
    });

    if (existe && existe.id !== id) {
      throw new BadRequestException('Já existe uma tarefa com esse nome');
    }

    return this.prisma.tarefa.update({
      where: { id },
      data: { titulo, custo, data_limite },
    });
  }

  async excluir(id: number): Promise<Tarefa> {
    await this.buscarPorId(id); // valida se existe
    return this.prisma.tarefa.delete({ where: { id } });
  }

  async mover(id: number, direcao: 'up' | 'down'): Promise<Tarefa[]> {
    const tarefa = await this.buscarPorId(id);

    if (direcao === 'up') {
      const tarefaAcima = await this.prisma.tarefa.findFirst({
        where: { orderIndex: { lt: tarefa.orderIndex } },
        orderBy: { orderIndex: 'desc' },
      });

      if (!tarefaAcima) throw new BadRequestException('Já está na primeira posição');

      // troca ordens usando valor temporário para evitar conflito de unique
      await this.prisma.$transaction([
        this.prisma.tarefa.update({
          where: { id: tarefa.id },
          data: { orderIndex: -1 }, // valor temporário
        }),
        this.prisma.tarefa.update({
          where: { id: tarefaAcima.id },
          data: { orderIndex: tarefa.orderIndex },
        }),
        this.prisma.tarefa.update({
          where: { id: tarefa.id },
          data: { orderIndex: tarefaAcima.orderIndex },
        }),
      ]);
    }

    if (direcao === 'down') {
      const tarefaAbaixo = await this.prisma.tarefa.findFirst({
        where: { orderIndex: { gt: tarefa.orderIndex } },
        orderBy: { orderIndex: 'asc' },
      });

      if (!tarefaAbaixo) throw new BadRequestException('Já está na última posição');

      await this.prisma.$transaction([
        this.prisma.tarefa.update({
          where: { id: tarefa.id },
          data: { orderIndex: -1 }, // valor temporário
        }),
        this.prisma.tarefa.update({
          where: { id: tarefaAbaixo.id },
          data: { orderIndex: tarefa.orderIndex },
        }),
        this.prisma.tarefa.update({
          where: { id: tarefa.id },
          data: { orderIndex: tarefaAbaixo.orderIndex },
        }),
      ]);
    }

    return this.listar();
  }
}
