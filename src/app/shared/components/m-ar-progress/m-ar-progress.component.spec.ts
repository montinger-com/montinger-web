import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MArProgressComponent } from './m-ar-progress.component'

describe('MArProgressComponent', () => {
  let component: MArProgressComponent
  let fixture: ComponentFixture<MArProgressComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MArProgressComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(MArProgressComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
