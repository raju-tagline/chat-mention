import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuillMentionComponent } from './quill-mention.component';

describe('QuillMentionComponent', () => {
  let component: QuillMentionComponent;
  let fixture: ComponentFixture<QuillMentionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuillMentionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuillMentionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
