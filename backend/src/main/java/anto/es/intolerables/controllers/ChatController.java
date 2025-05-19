package anto.es.intolerables.controllers;

import anto.es.intolerables.dto.ChatRequestDTO;
import anto.es.intolerables.dto.ChatResponseDTO;
import anto.es.intolerables.services.GroqService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/chat")
public class ChatController {

    private final GroqService groqService;

    public ChatController(GroqService groqService) {
        this.groqService = groqService;
    }

    @PostMapping
    public ChatResponseDTO chat(@RequestBody ChatRequestDTO request) {
        String respuesta = groqService.getGroqResponse(request.getMessage());
        return new ChatResponseDTO(respuesta);
    }
}
