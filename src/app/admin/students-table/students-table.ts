import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-students-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './students-table.html',
  styleUrl: './students-table.scss'
})
export class StudentsTableComponent {
  
  // Adicionado a propriedade 'lastAccessDays' para a lógica de retenção
  students = [
    { id: 1, name: 'Lucas Ferreira', plan: 'Anual Premium', status: 'Em dia', phone: '5541999999999', lastAccessDays: 2 },
    { id: 2, name: 'Mariana Costa', plan: 'Mensal Flex', status: 'Atrasado', phone: '5541988888888', lastAccessDays: 21 },
    { id: 3, name: 'Pedro Almeida', plan: 'Plano Básico', status: 'Em dia', phone: '5541977777777', lastAccessDays: 5 },
    { id: 4, name: 'Camila Rocha', plan: 'Anual Premium', status: 'Atrasado', phone: '5541966666666', lastAccessDays: 18 },
    { id: 5, name: 'Felipe Soares', plan: 'Mensal Flex', status: 'Em dia', phone: '5541955555555', lastAccessDays: 28 }
  ];

  // Controles de Estado dos Filtros
  searchTerm: string = '';
  currentFilter: 'Todos' | 'Em dia' | 'Atrasado' = 'Todos';

  // Atualiza o termo de pesquisa capturando o evento de digitação
  onSearch(event: Event): void {
    this.searchTerm = (event.target as HTMLInputElement).value.toLowerCase();
  }

  // Atualiza a Tab de status selecionada
  setFilter(filter: 'Todos' | 'Em dia' | 'Atrasado'): void {
    this.currentFilter = filter;
  }

  // Getter inteligente: O HTML consome este método, não o array original
  get filteredStudents() {
    return this.students.filter(student => {
      const matchesSearch = student.name.toLowerCase().includes(this.searchTerm);
      const matchesTab = this.currentFilter === 'Todos' || student.status === this.currentFilter;
      return matchesSearch && matchesTab;
    });
  }

  contactStudent(student: any): void {
    let msg = '';
    
    // Lógica de prioridade de mensagem: Cobrança > Retenção > Relacionamento
    if (student.status === 'Atrasado') {
      msg = `Olá ${student.name}, aqui é da gerência da Getgym. Notamos uma pendência na sua mensalidade do plano ${student.plan}. Podemos ajudar com algo?`;
    } else if (student.lastAccessDays > 15) {
      msg = `Fala ${student.name}, sumiu dos treinos! Faz ${student.lastAccessDays} dias que não te vemos na academia. Bora voltar pro foco?`;
    } else {
      msg = `Olá ${student.name}, aqui é da Getgym! Tudo certo com seus treinos no plano ${student.plan}?`;
    }
      
    window.open(`https://wa.me/${student.phone}?text=${encodeURIComponent(msg)}`, '_blank');
  }
}