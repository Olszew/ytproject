package com.agh.olszewska.service;



import com.agh.olszewska.model.AnswerData;
import com.agh.olszewska.model.SearchData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class MainService {

    @Autowired
    YtSearchService ytSearchService;
    @Autowired
    YtVideoService ytVideoService;

    @Autowired
    YtPlaylistService ytPlaylistService;


    public AnswerData api(SearchData searchData){
     AnswerData answer = new AnswerData();


        try {
            List searchList = ytSearchService.search(searchData);

            List searchListFiltred = ytVideoService.videos(searchList);
            ytPlaylistService.createPlaylist(searchListFiltred,searchData);
        } catch (IOException e) {
            e.printStackTrace();
            answer.setMessage("Exception");
        }




        return answer;
    }
}
