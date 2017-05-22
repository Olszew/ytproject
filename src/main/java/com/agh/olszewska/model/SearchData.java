package com.agh.olszewska.model;


public class SearchData {
    private String accessToken;

    private String query;

    private String categoryId;

    private String duration;

    public String getDuration() {
        return duration;
    }

    public void setDuration(String duration) {
        this.duration = duration;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }




    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    @Override
    public String toString() {
        return "SearchData{" +
                "accessToken='" + accessToken + '\'' +
                ", query='" + query + '\'' +
                '}';
    }
}
