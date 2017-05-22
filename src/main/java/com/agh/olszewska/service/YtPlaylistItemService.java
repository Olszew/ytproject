package com.agh.olszewska.service;

import com.agh.olszewska.model.YtPlaylist;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.Playlist;
import com.google.api.services.youtube.model.PlaylistItemListResponse;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Service
public class YtPlaylistItemService {

    private static YouTube youtube;

    public static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();


    public static final JsonFactory JSON_FACTORY = new JacksonFactory();

public List<YtPlaylist> getPlaylistItems(String accessToken, List<Playlist> playlists) throws IOException {


    GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);



    // This object is used to make YouTube Data API requests.
    youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
            .setApplicationName("youtubemanager")
            .build();

List<YtPlaylist> playlistItemList = new ArrayList<YtPlaylist>();

for(Playlist playlist : playlists){
    YtPlaylist ytPlaylist = new YtPlaylist();
    ytPlaylist.setTitle(playlist.getSnippet().getTitle());
    ytPlaylist.setDescription(playlist.getSnippet().getDescription());
    YouTube.PlaylistItems.List playlistItemRequest =
            youtube.playlistItems().list("id,contentDetails,snippet");
    playlistItemRequest.setPlaylistId(playlist.getId());
    playlistItemRequest.setMaxResults((long)20);
    playlistItemRequest.setFields("items/id, items/snippet/publishedAt, items/snippet/title");
    PlaylistItemListResponse playlistItemListResponse = playlistItemRequest.execute();
    ytPlaylist.setPlaylistItems(playlistItemListResponse.getItems());
    playlistItemList.add(ytPlaylist);
}


return playlistItemList;

}




}
