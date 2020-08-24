package com.analytics.autocratic.services;

import com.analytics.autocratic.models.FortuneFivehundredModel;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.util.ArrayList;
import java.util.List;

public class FortuneFivehundredService
{
    private final ChromeDriver driver;

    public FortuneFivehundredService()
    {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("headless");
        options.setBinary("/Users/tyler/workspace/back-end/autocratic/src/main/resources");
        driver = new ChromeDriver();

        //        System.setProperty("webdriver.chrome.driver", "/Users/tyler/workspace/back-end/autocratic/src/main/resources");

//        options.add_argument('headless');
    }

    public ArrayList<FortuneFivehundredModel> getCompanies(String beginYear, String endYear, String url)
    {
        ArrayList<FortuneFivehundredModel> allTableRows = new ArrayList<>();
        try
        {
            driver.get(url);
            this.getCompaniesHelper(beginYear, endYear, allTableRows);
        }
        catch ( Exception e )
        {
            if ( allTableRows.size() < 100 )
            {
                this.getCompaniesHelper(beginYear, endYear, allTableRows);
            }
        }

        return allTableRows;
    }

    private ArrayList<FortuneFivehundredModel> getCompaniesHelper(String beginYear, String endYear, ArrayList<FortuneFivehundredModel> fortuneFivehundredModels)
    {
        WebDriverWait wait = new WebDriverWait(this.driver, 20);
        WebElement iframe = wait.until(ExpectedConditions.visibilityOfElementLocated(new By.ByCssSelector("[id^=offer-0]")));

        driver.switchTo().frame(iframe);

        WebElement bottomPopupFooter = wait.until(ExpectedConditions.presenceOfElementLocated(new By.ById("close")));
        bottomPopupFooter.click();

        driver.switchTo().defaultContent();

        while (fortuneFivehundredModels.size() < 100)
        {
            List<WebElement> tableRows = wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(new By.ByClassName("rt-tr-group")));

            for ( WebElement row : tableRows )
            {
                String rowText = row.getAttribute("innerText");
                String[] cells = rowText.split("\\n");

                fortuneFivehundredModels.add(new FortuneFivehundredModel(
                        Integer.parseInt(cells[0]),
                        cells[1],
                        Double.parseDouble(cells[2]),
                        Double.parseDouble(cells[3]),
                        Double.parseDouble(cells[4]),
                        Double.parseDouble(cells[5]),
                        Double.parseDouble(cells[6]),
                        Double.parseDouble(cells[7]),
                        Integer.parseInt(cells[8]),
                        Integer.parseInt(cells[9]),
                        Integer.parseInt(cells[10])
                ));


                WebElement nextWrapper = wait.until(ExpectedConditions.presenceOfElementLocated(new By.ByClassName("-next")));
                nextWrapper.click();
            }

        }

        return fortuneFivehundredModels;
    }
}
