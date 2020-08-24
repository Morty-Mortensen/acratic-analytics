package com.analytics.autocratic.controllers;

import com.analytics.autocratic.models.FortuneFivehundredModel;
import com.analytics.autocratic.services.FortuneFivehundredService;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.*;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.springframework.web.bind.annotation.*;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.lang.reflect.Field;
import java.net.MalformedURLException;
import java.net.URL;
import java.util.ArrayList;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class FortuneFivehundredController
{

    FortuneFivehundredController() throws MalformedURLException {

    }

    @GetMapping("/accounting/web-to-csv/fortune-500/{fortune}")
    public Map<String, String> getFortuneFivehundredByYears(@RequestBody Object fortune) throws NoSuchFieldException {

        Field startYear = fortune.getClass().getField("beginYear");
        Field endYear = fortune.getClass().getField("beginYear");
        Field url = fortune.getClass().getField("beginYear");

        FortuneFivehundredService fortuneFivehundredService = new  FortuneFivehundredService();
        ArrayList<FortuneFivehundredModel> fortuneFivehundredRows = fortuneFivehundredService.getCompanies(startYear.toString(), endYear.toString(), url.toString());

        //Still need to serialize the model to send back.

//        driver.get("https://fortune.com/fortune500/2020/search/");
        return null;
    }

}
