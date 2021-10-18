import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListMarketModalPage } from './list-market-modal.page';

describe('ListMarketModalPage', () => {
  let component: ListMarketModalPage;
  let fixture: ComponentFixture<ListMarketModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListMarketModalPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListMarketModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
