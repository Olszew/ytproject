package com.agh.olszewska.controller;



import com.agh.olszewska.model.InitModel;
import com.agh.olszewska.model.StartData;
import com.agh.olszewska.model.YtPlaylist;
import com.agh.olszewska.service.YtChannelService;
import com.agh.olszewska.service.YtPlaylistItemService;
import com.agh.olszewska.service.YtPlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;


@RestController
public class ChannelController {

    @Autowired
    YtChannelService ytChannelService;

    @Autowired
    YtPlaylistService ytPlaylistService;

    @Autowired
    YtPlaylistItemService ytPlaylistItemService;

    @PostMapping(value = "/start", produces = "application/json")
    public StartData start(@RequestBody InitModel initModel) throws IOException {
        System.out.println(initModel.getAccessToken());
        StartData startData = new StartData();
        startData.setChannelExisting(ytChannelService.checkChanelExisting(initModel.getAccessToken()));

        return startData;


    }

    @PostMapping(value = "/start2", produces = "application/json")
    public List<YtPlaylist> start2(@RequestBody InitModel initModel ) throws IOException {



        return ytPlaylistItemService.getPlaylistItems(initModel.getAccessToken(),ytPlaylistService.getCreatedPlaylists(initModel.getAccessToken()));


    }



}
