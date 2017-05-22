package com.agh.olszewska.service;

import com.agh.olszewska.model.SearchData;
import com.google.api.client.googleapis.auth.oauth2.GoogleCredential;
import com.google.api.client.http.HttpTransport;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.*;
import com.google.common.collect.Lists;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

/**
 * Created by Prezes94 on 2017-03-31.
 */
@Service
public class YtPlaylistService {

    private static YouTube youtube;

    public static final HttpTransport HTTP_TRANSPORT = new NetHttpTransport();


    public static final JsonFactory JSON_FACTORY = new JacksonFactory();


    public void createPlaylist(List<String> listOfVideosId, SearchData searchData) throws IOException {

       List<String> scopes = Lists.newArrayList("https://www.googleapis.com/auth/youtube");

        GoogleCredential credential = new GoogleCredential().setAccessToken(searchData.getAccessToken());



            // This object is used to make YouTube Data API requests.
            youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
                    .setApplicationName("youtubemanager")
                    .build();

            // Create a new, private playlist in the authorized user's channel.
            String playlistId = insertPlaylist(searchData.getQuery());



            // If a valid playlist was created, add a video to that playlist.
            for (String videoId : listOfVideosId) {
                insertPlaylistItem(playlistId, videoId);
            }


        return ;
    }

    /**
     * Create a playlist and add it to the authorized account.
     */
    private static String insertPlaylist(String query) throws IOException {

        List<String> tagsList = new ArrayList<String >();
        tagsList.add("YTM");

        // This code constructs the playlist resource that is being inserted.
        // It defines the playlist's title, description, and privacy status.
        PlaylistSnippet playlistSnippet = new PlaylistSnippet();
        playlistSnippet.setTitle(query + Calendar.getInstance().getTime());
        playlistSnippet.setDescription("Selected videos for phrase"+query);
        playlistSnippet.setTags(tagsList);
        PlaylistStatus playlistStatus = new PlaylistStatus();
        playlistStatus.setPrivacyStatus("private");

        Playlist youTubePlaylist = new Playlist();
        youTubePlaylist.setSnippet(playlistSnippet);
        youTubePlaylist.setStatus(playlistStatus);

        // Call the API to insert the new playlist. In the API call, the first
        // argument identifies the resource parts that the API response should
        // contain, and the second argument is the playlist being inserted.
        YouTube.Playlists.Insert playlistInsertCommand =
                youtube.playlists().insert("snippet,status", youTubePlaylist);
        Playlist playlistInserted = playlistInsertCommand.execute();

        // Print data from the API response and return the new playlist's
        // unique playlist ID.

        return playlistInserted.getId();

    }

    /**
     * Create a playlist item with the specified video ID and add it to the
     * specified playlist.
     *
     * @param playlistId assign to newly created playlistitem
     * @param videoId    YouTube video id to add to playlistitem
     */
    private static String insertPlaylistItem(String playlistId, String videoId) throws IOException {

        // Define a resourceId that identifies the video being added to the
        // playlist.
        ResourceId resourceId = new ResourceId();
        resourceId.setKind("youtube#video");
        resourceId.setVideoId(videoId);

        // Set fields included in the playlistItem resource's "snippet" part.
        PlaylistItemSnippet playlistItemSnippet = new PlaylistItemSnippet();
        playlistItemSnippet.setTitle("First video in the test playlist");
        playlistItemSnippet.setPlaylistId(playlistId);
        playlistItemSnippet.setResourceId(resourceId);

        // Create the playlistItem resource and set its snippet to the
        // object created above.
        PlaylistItem playlistItem = new PlaylistItem();
        playlistItem.setSnippet(playlistItemSnippet);


        YouTube.PlaylistItems.Insert playlistItemsInsertCommand =
                youtube.playlistItems().insert("snippet,contentDetails", playlistItem);
        PlaylistItem returnedPlaylistItem = playlistItemsInsertCommand.execute();



        return returnedPlaylistItem.getId();

    }


    public List<Playlist> getCreatedPlaylists(String accessToken) throws IOException {

        GoogleCredential credential = new GoogleCredential().setAccessToken(accessToken);

        youtube = new YouTube.Builder(HTTP_TRANSPORT, JSON_FACTORY, credential)
                .setApplicationName("youtubemanager")
                .build();

        PlaylistListResponse playlistListResponse = youtube.playlists().
                list("id,snippet,contentDetails").setMine(true).execute();

        List<Playlist> playlistList = new ArrayList<Playlist>();

        for(Playlist playlist : playlistListResponse.getItems()){
            if(playlist.getSnippet().getTags()!=null&&playlist.getSnippet().getTags().contains("YTM")){
                playlistList.add(playlist);
            }


        }




        return  playlistList;




    }
}