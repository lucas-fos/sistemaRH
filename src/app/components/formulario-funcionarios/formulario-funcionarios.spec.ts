import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioFuncionarios } from './formulario-funcionarios';

describe('FormularioFuncionarios', () => {
  let component: FormularioFuncionarios;
  let fixture: ComponentFixture<FormularioFuncionarios>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioFuncionarios],
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioFuncionarios);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
