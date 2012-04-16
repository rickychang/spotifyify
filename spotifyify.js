function spotifyifySelection() {
    if (typeof window.getSelection != "undefined") {
        var sel = window.getSelection();
        if (sel.rangeCount) {
            var searchQuery = sel.toString();
            var spotifyApiUrl = 'http://ws.spotify.com/search/1/album.json?q=' + encodeURI(searchQuery);
            var spotifyRequest = new XMLHttpRequest();
            var albumURI = "";
            var range = sel.getRangeAt(0);
            var newNode = document.createElement('a');
            spotifyRequest.onreadystatechange= function() {
                if (spotifyRequest.readyState==4) {
                    if (spotifyRequest.status==200 || window.location.href.indexOf("http")==-1) {
                        var spotifyAPIResponse = JSON.parse(spotifyRequest.response);
                        try {
                            albumURI = spotifyAPIResponse['albums'][0]['href'];
                            newNode.href = albumURI;
                            range.surroundContents(newNode);
                            location.href = albumURI;
                        }
                        catch (err) {
                            return;
                        }
                    }
                }   
            }
            spotifyRequest.open("GET", spotifyApiUrl, true);
            spotifyRequest.send(null);
        }
    } 
};
