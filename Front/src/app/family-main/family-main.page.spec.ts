import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FamilyMainPage } from './family-main.page';

describe('FamilyMainPage', () => {
  let component: FamilyMainPage;
  let fixture: ComponentFixture<FamilyMainPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FamilyMainPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FamilyMainPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
