package anto.es.intolerables.controllers;

import anto.es.intolerables.entities.Intolerancia;
import anto.es.intolerables.services.IntoleranciaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequiredArgsConstructor
@RequestMapping("/api/intolerancias")
public class IntoleranciaController {
    private final IntoleranciaService intoleranciaService;
    @GetMapping
    public ResponseEntity<List<Intolerancia>> findAll() {
        List<Intolerancia> intolerancias = intoleranciaService.findAll();
        return ResponseEntity.ok(intolerancias);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Intolerancia> obtenerIntoleranciaPorId(Integer id) {
        return intoleranciaService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
}
