package com.agh.olszewska.service;

import com.google.api.client.http.HttpRequest;
import com.google.api.client.http.HttpRequestInitializer;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.SearchResult;
import com.google.api.services.youtube.model.Video;
import com.google.api.services.youtube.model.VideoListResponse;
import com.google.api.services.youtube.model.VideoStatistics;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by Prezes94 on 2017-03-31.
 */


@Service
public class YtVideoService {



    private static YouTube youtube;

    public static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();


    public static final JsonFactory JSON_FACTORY = new JacksonFactory();

    @Value("${youtube.apikey}")
    String apiKey;


    public List<String> videos(List<SearchResult> resultList) throws IOException {
        List<String> listOfVideoIds = getVideosId(resultList);
        System.out.println(listOfVideoIds.toString());


        youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, new HttpRequestInitializer() {
            public void initialize(HttpRequest request) throws IOException {
            }
        }).setApplicationName("youtubeManager").build();
        YouTube.Videos.List listVideosRequest = youtube.videos().list("id,statistics");

            listVideosRequest.setId(stringParser(listOfVideoIds.toString()));

        listVideosRequest.setKey(apiKey);
        listVideosRequest.setFields("items(id,statistics/likeCount,statistics/dislikeCount,statistics/viewCount)");
        VideoListResponse listResponse = listVideosRequest.execute();

        List<String> list=checkRankOfVideo(listResponse);

        return list;


    }

    static private List<String> getVideosId(List<SearchResult> resultList) {

        List<String> listOfVideoIds = new ArrayList<String>();
        for (SearchResult searchResult : resultList) {
            String videoId = searchResult.getId().getVideoId();
            listOfVideoIds.add(videoId);

        }
        return listOfVideoIds;

    }

    static public List<String> checkRankOfVideo(VideoListResponse videoListResponse){

        List<String> rankedVideosRequest = new ArrayList<String>();
        for(Video video : videoListResponse.getItems()){
            VideoStatistics videoStatistics = video.getStatistics();
            System.out.print(video.getId());
            System.out.println(videoStatistics);
            int rateRatio=0;
            if (videoStatistics!=null&&videoStatistics.getLikeCount()!=null&&videoStatistics.getDislikeCount()!=null){
            rateRatio = videoStatistics.getLikeCount().compareTo(videoStatistics.getDislikeCount().multiply(new BigInteger("4")));
            System.out.println(rateRatio);}
            if ((rateRatio>0)){
              rankedVideosRequest.add(video.getId());

            }
            if (rankedVideosRequest.size()==20){
                return rankedVideosRequest;
            }
        }



        return rankedVideosRequest;
    }





    static private String stringParser(String str){
        if (str != null && str.length() > 0 ) {
            str = str.substring(1, str.length()-1);
        }
        return str;
    }
}


