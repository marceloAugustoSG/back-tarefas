import { Module } from '@nestjs/common';
import { TarefasModule } from './modules/tarefas/tarefas.module';
import { PrismaService } from './modules/prisma/prisma.service';

@Module({
  imports: [TarefasModule],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule { }
