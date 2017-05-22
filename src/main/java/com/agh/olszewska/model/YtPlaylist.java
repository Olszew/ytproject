package com.agh.olszewska.model;

import com.google.api.services.youtube.model.PlaylistItem;

import java.util.List;

/**
 * Created by Prezes94 on 2017-04-19.
 */
public class YtPlaylist {

    String title;

    String description;

    List<PlaylistItem> playlistItems;


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<PlaylistItem> getPlaylistItems() {
        return playlistItems;
    }

    public void setPlaylistItems(List<PlaylistItem> playlistItems) {
        this.playlistItems = playlistItems;
    }
}
