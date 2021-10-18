import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerListaPage } from './ver-lista.page';

describe('VerListaPage', () => {
  let component: VerListaPage;
  let fixture: ComponentFixture<VerListaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerListaPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerListaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
