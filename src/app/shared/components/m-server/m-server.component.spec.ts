import { ComponentFixture, TestBed } from '@angular/core/testing'

import { MServerComponent } from './m-server.component'

describe('MServerComponent', () => {
  let component: MServerComponent
  let fixture: ComponentFixture<MServerComponent>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MServerComponent]
    })
    .compileComponents()

    fixture = TestBed.createComponent(MServerComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
