package com.ii.app.services.interfaces;

import com.ii.app.dto.in.ConversationIn;
import com.ii.app.dto.out.ConversationOut;
import com.ii.app.models.enums.ConversationDirection;

import java.util.List;

public interface ConversationService {
    ConversationOut create(ConversationIn conversationIn);

    List<ConversationOut> findAll();

    List<ConversationOut> findByConversationDirection(ConversationDirection.ConversationDirectionType conversationDirectionType);
}
