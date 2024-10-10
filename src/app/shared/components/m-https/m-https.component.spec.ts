import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MHttpsComponent } from './m-https.component'

describe('MHttpsComponent', () => {
  let component: MHttpsComponent
  let fixture: ComponentFixture<MHttpsComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MHttpsComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(MHttpsComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
