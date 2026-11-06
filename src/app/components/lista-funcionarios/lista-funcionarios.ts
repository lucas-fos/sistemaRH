import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Colaborador } from '../../models/colaborador';
import { ColaboradoresService } from '../../services/colaboradores';

@Component({
  selector: 'app-lista-funcionarios',
  imports: [RouterLink],
  templateUrl: './lista-funcionarios.html',
  styleUrl: './lista-funcionarios.css',
})
export class ListaFuncionarios implements OnInit {

  private readonly colaboradoresService = inject(ColaboradoresService);

  protected readonly colaboradores = signal<Colaborador[]>([]);
  protected readonly carregando = signal(true);
  protected readonly erro = signal('');
  protected readonly mensagemExclusao = signal('');

  ngOnInit(): void {
    this.colaboradoresService.listar().subscribe({

      next: (lista) => {
        this.colaboradores.set(lista);
        this.carregando.set(false);
      },

      error: (erro) => {
        console.error('Erro ao carregar colaboradores:', erro);
        this.erro.set('Não foi possível carregar os colaboradores.');
        this.carregando.set(false);
      }

    });
  }

  protected excluir(id: number): void {
    this.mensagemExclusao.set('');

    this.colaboradoresService.excluir(id).subscribe({

      next: () => {
        this.colaboradores.update(lista =>
          lista.filter(colaborador => colaborador.id !== id)
        );

        this.mensagemExclusao.set('Funcionário excluído com sucesso!');
      },

      error: (erro) => {
        console.error('Erro ao excluir funcionário:', erro);
        this.mensagemExclusao.set('Não foi possível excluir o funcionário.');
      }

    });
  }

}