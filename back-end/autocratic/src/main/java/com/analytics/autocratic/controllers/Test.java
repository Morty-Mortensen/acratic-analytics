package com.analytics.autocratic.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class Test {

    @GetMapping("/hello")
    public Map<String, String> myTestEndpoint() {
        Map<String, String> test = new HashMap<>();
        test.put("number1", "I did it!!!");
        return test;
    }

    @ResponseStatus(value = HttpStatus.CREATED)
    @PostMapping("/postit")
    public Object myPostTest(@RequestBody Object myFavoritePostit) {
        return null;
    }

    @GetMapping("/postit/{id}")
    public Object getMyPostObject(@PathVariable("id") int myPostitId) {
        return null;
    }

    @PutMapping("/postit/{id}")
    public Object editMyPostit(@PathVariable("id") int myPostitToEdit) {
        return "null";
    }


    @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "The postit was not found.")
    @ExceptionHandler(IllegalArgumentException.class)
    public void handleTheBadRequest() {
        // Nothing to do.
    }
}
