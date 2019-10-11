import { Component, OnInit, ViewChild } from '@angular/core';
import { Message } from '../models/message';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../services/message.service';
import { FormBuilder, FormGroup, Validators, NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ConversationService } from '../services/conversation.service';
import { Conversation, PageWrapper } from '../models/conversation';

@Component({
  selector: 'app-conversation-details',
  templateUrl: './conversation-details.component.html',
  styleUrls: ['./conversation-details.component.scss']
})
export class ConversationDetailsComponent implements OnInit {

  messages: PageWrapper<Message>;
  conversationId: string;
  replyForm: FormGroup;
  conversation: Conversation;

  @ViewChild('formDirective', { static: true }) private formDirective: NgForm;

  constructor(private route: ActivatedRoute,
    private fb: FormBuilder,
    private authService: AuthService,
    private conversationService: ConversationService,
    private messageService: MessageService) {
    this.conversationId = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.fetchConversation();
    this.fetchMessages();
    this.createReplyForm();
  }

  fetchConversation() {
    this.conversationService.findById(this.conversationId)
      .subscribe(res => this.conversation = res);
  }

  fetchMessages() {
    this.messageService.findByConversationId(this.conversationId)
      .subscribe(res => this.messages = res);
  }

  createReplyForm() {
    this.replyForm = this.fb.group({
      message: ['', Validators.required],
      conversationId: [this.conversationId, Validators.required]
    });
  }

  sendReply() {
    if (this.replyForm.invalid) {
      return;
    };
    this.messageService.create(this.replyForm.value)
      .subscribe(res => {
        alert('Dodano odpowiedź');
        this.replyForm.reset();
        this.formDirective.resetForm();
        this.fetchMessages();
      });
  }
}
