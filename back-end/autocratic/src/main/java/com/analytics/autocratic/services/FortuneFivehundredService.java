package com.analytics.autocratic.services;

import com.analytics.autocratic.enums.FortuneFivehundredColumns;
import com.analytics.autocratic.models.FortuneFivehundredModel;
import org.openqa.selenium.By;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.chrome.ChromeOptions;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;
import org.yaml.snakeyaml.util.ArrayUtils;

import java.util.*;



public class FortuneFivehundredService
{
    private final ChromeDriver driver;
    private final WebDriverWait wait;
    private WebElement footerPopupIFrame = null;
    private WebElement fullScreenPopup = null;

    public FortuneFivehundredService()
    {
        ChromeOptions options = new ChromeOptions();
        options.addArguments("headless");
        System.setProperty("webdriver.chrome.driver", "/Users/tyler/workspace/back-end/autocratic/src/main/resources/chromedriver");
        driver = new ChromeDriver(options);
        wait = new WebDriverWait(this.driver, 10);
    }

    public void closeFooterPopupIfVisible()
    {
        try
        {
            footerPopupIFrame = wait.until(ExpectedConditions.visibilityOfElementLocated(new By.ByCssSelector("[id^=offer-0]")));
            driver.switchTo().frame(footerPopupIFrame);
            WebElement bottomPopupFooter = wait.until(ExpectedConditions.presenceOfElementLocated(new By.ById("close")));
            bottomPopupFooter.click();
            driver.switchTo().defaultContent();
        }
        catch (Exception e)
        {
            System.out.println("Footer popup not found.");
        }
    }

    public void closeFullScreenPopupIfVisible()
    {
        try
        {
            fullScreenPopup = wait.until(ExpectedConditions.presenceOfElementLocated(new By.ByClassName("bx-row-submit-no")));
            fullScreenPopup.click();
        }
        catch (Exception e)
        {
            System.out.println("Full screen popup not displayed.");
        }
    }

    public Map<Integer, ArrayList<FortuneFivehundredModel>> getCompanies(int beginYear, int endYear, int companiesPerYear, String url) throws Exception {

        Map<Integer, ArrayList<FortuneFivehundredModel>> tableRows = new TreeMap<>();

        int iteration = 1;
        while ( beginYear <= endYear )
        {
            try
            {
                driver.get(url + beginYear + "/search/");

                //Close bottom popup.
                this.closeFooterPopupIfVisible();

                tableRows.put(beginYear, this.getCompaniesHelper(beginYear, companiesPerYear));
            }
            catch ( Exception e )
            {
                if ( tableRows.size() < (iteration * companiesPerYear) )
                {
                    this.closeFooterPopupIfVisible();
                    this.closeFullScreenPopupIfVisible();
                    tableRows.put(beginYear, this.getCompaniesHelper(beginYear, companiesPerYear));
                }
            }
            iteration++;
            beginYear++;
        }



        return tableRows;
    }

    private ArrayList<FortuneFivehundredModel> getCompaniesHelper(int beginYear, int companiesPerYear) throws Exception
    {
        ArrayList<FortuneFivehundredModel> fortuneFivehundredModels = new ArrayList<>();
        List<WebElement> columnElements = wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(new By.ByCssSelector("[class^=searchResults__columnTitle]")));
        ArrayList<String> columns = new ArrayList<>();
        for ( WebElement columnElement : columnElements )
        {
            if (columnElement.getAttribute("innerText").contains("($M)") || columnElement.getAttribute("innerText").contains("—") )
            {
                if ( columnElement.getAttribute("innerText").indexOf('(') != -1 && !columnElement.getAttribute("innerText").contains("—") )
                {
                    columns.add(columnElement.getAttribute("innerText").substring(0, columnElement.getAttribute("innerText").indexOf('(') - 1).toLowerCase());
                }
                else
                {
                    columns.add(columnElement.getAttribute("innerText").substring(0, columnElement.getAttribute("innerText").indexOf('—') - 1).toLowerCase());
                }
            }
            else
            {
                columns.add(columnElement.getAttribute("innerText").toLowerCase());
            }
        }

        // Get top 100 companies.
        while (fortuneFivehundredModels.size() < companiesPerYear)
        {
            List<WebElement> tableRows = wait.until(ExpectedConditions.presenceOfAllElementsLocatedBy(new By.ByClassName("rt-tr-group")));

            for ( WebElement row : tableRows )
            {
                String rowText = row.getAttribute("innerText");
                String[] cells = rowText.split("\\n");

                FortuneFivehundredModel model = new FortuneFivehundredModel();


                for ( int i = 0; i < cells.length; i++ )
                {
                    if ( columns.get(i).equals(FortuneFivehundredColumns.RANK.getColumn()) )
                    {
                        model.setRank(Integer.parseInt(cells[i].replaceAll("[$,%]", "")));
                    }
                    else if ( columns.get(i).equals(FortuneFivehundredColumns.NAME.getColumn()) )
                    {
                        model.setName(cells[i]);
                    }
                    else if ( columns.get(i).equals(FortuneFivehundredColumns.REVENUE.getColumn()) )
                    {
                        model.setRevenue(Double.parseDouble(cells[i].replaceAll("[$,%]", "").replaceAll("[\\-]", "0")));
                    }
                    else if ( columns.get(i).equals(FortuneFivehundredColumns.REVENUE_PERCENT_CHANGE.getColumn()) )
                    {
                        model.setRevenuePercentChange(Double.parseDouble(cells[i].replaceAll("[$,%]", "").replaceAll("[\\-]", "0")));
                    }
                    else if ( columns.get(i).equals(FortuneFivehundredColumns.PROFITS.getColumn()) )
                    {
                        model.setProfits(Double.parseDouble(cells[i].replaceAll("[$,%]", "").replaceAll("[\\-]", "0")));
                    }
                    else if ( columns.get(i).equals(FortuneFivehundredColumns.PROFITS_PERCENT_CHANGE.getColumn()) )
                    {
                        model.setProfitsPercentChange(Double.parseDouble(cells[i].replaceAll("[$,%]", "").replaceAll("[\\-]", "0")));
                    }
                    else if ( columns.get(i).equals(FortuneFivehundredColumns.ASSETS.getColumn()) )
                    {
                        model.setAssets(Double.parseDouble(cells[i].replaceAll("[$,%]", "").replaceAll("[\\-]", "0")));
                    }
                    else if ( columns.get(i).equals(FortuneFivehundredColumns.MARKET_VALUE.getColumn()) )
                    {
                        model.setMarketValue(Double.parseDouble(cells[i].replaceAll("[$,%]", "").replaceAll("[\\-]", "0")));
                    }
                    else if ( columns.get(i).equals(FortuneFivehundredColumns.CHANGE_IN_RANK_FULL_1000.getColumn()) )
                    {
                        model.setChangeInRankFull1000(Integer.parseInt(cells[i].replaceAll("[$,%]", "").replaceAll("[\\-]", "0")));
                    }
                    else if ( columns.get(i).equals(FortuneFivehundredColumns.EMPLOYEES.getColumn()) )
                    {
                        model.setEmployees(Integer.parseInt(cells[i].replaceAll("[$,%]", "").replaceAll("[\\-]", "0")));
                    }
                    else if ( columns.get(i).equals(FortuneFivehundredColumns.CHANGE_IN_RANK_500_ONLY.getColumn()) )
                    {
                        model.setChangeInRank500Only(Integer.parseInt(cells[i].replaceAll("[$,%]", "").replaceAll("[\\-]", "0")));
                    }
                }

                fortuneFivehundredModels.add(model);
            }

            WebElement nextWrapper = wait.until(ExpectedConditions.presenceOfElementLocated(new By.ByClassName("-next")));
            nextWrapper.click();
        }

        return fortuneFivehundredModels;
    }
}
