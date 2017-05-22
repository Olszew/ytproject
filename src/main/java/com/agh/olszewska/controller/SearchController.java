package com.agh.olszewska.controller;



import com.agh.olszewska.model.AnswerData;
import com.agh.olszewska.model.SearchData;
import com.agh.olszewska.service.MainService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;


@RestController
public class SearchController {

    @Autowired
    MainService mainService;



    @PostMapping(value = "/api3", produces = "application/json",consumes ="application/json")
    public AnswerData api(@RequestBody SearchData searchData)  {


        return mainService.api(searchData);
    }






}
