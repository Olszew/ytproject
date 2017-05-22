package com.agh.olszewska.service;

import com.agh.olszewska.model.SearchData;
import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;


@Service
public class YtSearchService {

private static final long NUMBER_OF_VIDEOS_RETURNED = 50;

private static YouTube youtube;

    public static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();

    /**
     * Define a global instance of the JSON factory.
     */
    public static final JsonFactory JSON_FACTORY = new JacksonFactory();

@Value("${youtube.apikey}")
  String apiKey;

public List<SearchResult> search(SearchData searchData) throws IOException {


        youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, new HttpRequestInitializer() {
            public void initialize(HttpRequest request) throws IOException {
            }
        }).setApplicationName("youtubeManager").build();

        YouTube.Search.List search = youtube.search().list("id,snippet");

        search.setKey(apiKey);
        search.setQ(searchData.getQuery());
        search.setVideoDuration(searchData.getDuration());
        if (searchData.getCategoryId() != "") {
            search.setVideoCategoryId(searchData.getCategoryId());
        }

        search.setOrder("viewCount");
        search.setType("video");
        search.setRegionCode("US");
        search.setRelevanceLanguage("PL");
        search.setFields("items(id/videoId,snippet/title)");
        search.setMaxResults(NUMBER_OF_VIDEOS_RETURNED);
        SearchListResponse searchResponse = search.execute();
        List<SearchResult> searchResultList = searchResponse.getItems();

        return searchResultList;

    }


}



