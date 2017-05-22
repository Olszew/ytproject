var GoogleAuth;
var SCOPE = 'https://www.googleapis.com/auth/youtube';
export function handleClientLoad() {
    // Load the API's client and auth2 modules.
    // Call the initClient function after the modules load.
    gapi.load('client:auth2', initClient);
}

export function initClient() {
    // Retrieve the discovery document for version 3 of YouTube Data API.
    // In practice, your app can retrieve one or more discovery documents.
    var discoveryUrl = 'https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest';

    // Initialize the gapi.client object, which app uses to make API requests.
    // Get API key and client ID from API Console.
    // 'scope' field specifies space-delimited list of access scopes.
    gapi.client.init({
        'apiKey': 'AIzaSyAXG3WlXzaqwRjnEj6OqfTSPIem6MV8X9Y',
        'discoveryDocs': [discoveryUrl],
        'clientId': '85159034377-kohf1ommpuelap4omhvh8pmbe4426j05.apps.googleusercontent.com',
        'scope': SCOPE
    }).then(function () {
        GoogleAuth = gapi.auth2.getAuthInstance();

        // Listen for sign-in state changes.
        GoogleAuth.isSignedIn.listen(updateSigninStatus);

        // Handle initial sign-in state. (Determine if user is already signed in.)
        var user = GoogleAuth.currentUser.get();
        setSigninStatus();

        // Call handleAuthClick function when user clicks on
        //      "Sign In/Authorize" button.

        $('#sign-in-or-out-button').click(function() {
handleLogin()
        });
        $('#revoke-access-button').click(function() {
            revokeAccess();
        });
    });
}

export function handleLogin() {
    if (GoogleAuth.isSignedIn.get()) {
        // User is authorized and has clicked 'Sign out' button.
        GoogleAuth.signOut();
    } else {
        // User is not signed in. Start Google auth flow.
        GoogleAuth.signIn();
    }
}

export function revokeAccess() {
    console.log('revoke');
    GoogleAuth.disconnect();

}

export function setSigninStatus(isSignedIn) {
    var user = GoogleAuth.currentUser.get();
    var isAuthorized = user.hasGrantedScopes(SCOPE);
    if (isAuthorized) {
        $('#sign-in-or-out-button').html('Sign out');
        $('#revoke-access-button').show();
        $('#auth-status h2').html('You are logged on');
        $('#auth-status h3').html(user.getBasicProfile().getEmail());
        $('#MainForm').show();
    } else {
        $('#sign-in-or-out-button').html('Sign In');
        $('#revoke-access-button').hide();
        $('#auth-status h2').html('Please login');
        $('#auth-status h3').html('').hide();
        $('#MainForm').hide();
    }
}

export function updateSigninStatus(isSignedIn) {
    setSigninStatus();
}