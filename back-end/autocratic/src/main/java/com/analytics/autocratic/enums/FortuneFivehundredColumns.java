package com.analytics.autocratic.enums;

public enum FortuneFivehundredColumns
{
    RANK("rank"),
    NAME("name"),
    REVENUE("revenues"),
    REVENUE_PERCENT_CHANGE("revenue percent change"),
    PROFITS("profits"),
    PROFITS_PERCENT_CHANGE("profits percent change"),
    ASSETS("assets"),
    MARKET_VALUE("market value"),
    CHANGE_IN_RANK_FULL_1000("change in rank (full 1000)"),
    EMPLOYEES("employees"),
    CHANGE_IN_RANK_500_ONLY("change in rank (500 only)");

    private String column;

    FortuneFivehundredColumns(String column)
    {
        this.column = column;
    }

    public String getColumn()
    {
        return this.column;
    }
}
