package com.analytics.autocratic.models;

import java.util.Objects;

public class FortuneFivehundredModel
{
    private int rank;
    private String name;
    private double revenue;
    private double revenuePercentChange;
    private double profits;
    private double profitsPercentChange;
    private double assets;
    private double marketValue;
    private int changeInRankFull1000;
    private int employees;
    private int changeInRank500Only;

    public FortuneFivehundredModel() {}

    public FortuneFivehundredModel(int id, String name, double revenue, double revenuePercentChange, double profits, double profitsPercentChange, double assets, double marketValue, int changeInRankFull1000, int employees, int changeInRank500Only)
    {
        this.rank = id;
        this.name = name;
        this.revenue = revenue;
        this.revenuePercentChange = revenuePercentChange;
        this.profits = profits;
        this.profitsPercentChange = profitsPercentChange;
        this.assets = assets;
        this.marketValue = marketValue;
        this.changeInRankFull1000 = changeInRankFull1000;
        this.employees = employees;
        this.changeInRank500Only = changeInRank500Only;
    }

    public int getRank() {
        return rank;
    }

    public void setRank(int rank) {
        this.rank = rank;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getRevenue() {
        return revenue;
    }

    public void setRevenue(double revenue) {
        this.revenue = revenue;
    }

    public double getRevenuePercentChange() {
        return revenuePercentChange;
    }

    public void setRevenuePercentChange(double revenuePercentChange) {
        this.revenuePercentChange = revenuePercentChange;
    }

    public double getProfits() {
        return profits;
    }

    public void setProfits(double profits) {
        this.profits = profits;
    }

    public double getProfitsPercentChange() {
        return profitsPercentChange;
    }

    public void setProfitsPercentChange(double profitsPercentChange) {
        this.profitsPercentChange = profitsPercentChange;
    }

    public double getAssets() {
        return assets;
    }

    public void setAssets(double assets) {
        this.assets = assets;
    }

    public double getMarketValue() {
        return marketValue;
    }

    public void setMarketValue(double marketValue) {
        this.marketValue = marketValue;
    }

    public int getChangeInRankFull1000() {
        return changeInRankFull1000;
    }

    public void setChangeInRankFull1000(int changeInRankFull1000) {
        this.changeInRankFull1000 = changeInRankFull1000;
    }

    public int getEmployees() {
        return employees;
    }

    public void setEmployees(int employees) {
        this.employees = employees;
    }

    public int getChangeInRank500Only() {
        return changeInRank500Only;
    }

    public void setChangeInRank500Only(int changeInRank500Only) {
        this.changeInRank500Only = changeInRank500Only;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        FortuneFivehundredModel that = (FortuneFivehundredModel) o;
        return rank == that.rank &&
                Double.compare(that.revenue, revenue) == 0 &&
                Double.compare(that.revenuePercentChange, revenuePercentChange) == 0 &&
                Double.compare(that.profits, profits) == 0 &&
                Double.compare(that.profitsPercentChange, profitsPercentChange) == 0 &&
                Double.compare(that.assets, assets) == 0 &&
                Double.compare(that.marketValue, marketValue) == 0 &&
                changeInRankFull1000 == that.changeInRankFull1000 &&
                employees == that.employees &&
                changeInRank500Only == that.changeInRank500Only &&
                Objects.equals(name, that.name);
    }

    @Override
    public int hashCode() {
        return Objects.hash(rank, name, revenue, revenuePercentChange, profits, profitsPercentChange, assets, marketValue, changeInRankFull1000, employees, changeInRank500Only);
    }
}
