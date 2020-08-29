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
import java.util.LinkedHashMap;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class FortuneFivehundredController
{

    FortuneFivehundredController() throws MalformedURLException {

    }

    @RequestMapping(value="/accounting/web-to-csv/fortune-500", method = RequestMethod.POST)
    public Map<Integer, ArrayList<FortuneFivehundredModel>> getFortuneFivehundredByYears(@RequestBody LinkedHashMap<String, String> fortune) throws Exception {

        int startYear = Integer.parseInt(fortune.get("startDate"));
        int endYear = Integer.parseInt(fortune.get("endDate"));
        int companiesPerYear = Integer.parseInt(fortune.get("companiesPerYear"));
        String url = "https://fortune.com/fortune500/";

        FortuneFivehundredService fortuneFivehundredService = new FortuneFivehundredService();
        return fortuneFivehundredService.getCompanies(startYear, endYear, companiesPerYear, url);
    }

}
