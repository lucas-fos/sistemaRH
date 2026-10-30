import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaFuncionarios } from './lista-funcionarios';

describe('ListaFuncionarios', () => {
  let component: ListaFuncionarios;
  let fixture: ComponentFixture<ListaFuncionarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaFuncionarios],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaFuncionarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
