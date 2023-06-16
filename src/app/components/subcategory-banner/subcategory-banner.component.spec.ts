import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubcategoryBannerComponent } from './subcategory-banner.component';

describe('SubcategoryBannerComponent', () => {
  let component: SubcategoryBannerComponent;
  let fixture: ComponentFixture<SubcategoryBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubcategoryBannerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubcategoryBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
