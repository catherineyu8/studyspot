package handlers;

import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;
import storage.FirebaseUtilities;

public class AddUserHandler implements Route {
  public FirebaseUtilities storageHandler;

  public AddUserHandler(FirebaseUtilities storageHandler) {
    this.storageHandler = storageHandler;
  }

  /**
   * Query Params: String uid, String answer
   *
   * @param request The request object providing information about the HTTP request
   * @param response The response object providing functionality for modifying the response
   * @return The content to be set in the response
   */
  @Override
  public Object handle(Request request, Response response) {
    Map<String, Object> responseMap = new HashMap<>();
    try {
      // collect parameters from the request
      String uid = request.queryParams("uid");
      String name = request.queryParams("name");
      String email = request.queryParams("email");
      String comfort = request.queryParams("comfort");
      String mood = request.queryParams("mood");
      String noise = request.queryParams("noise");
      String outlets = request.queryParams("outlets");
      String wifi = request.queryParams("wifi");

      // check that all necessary iputs exist
      if (uid == null
          || name == null
          || email == null
          || comfort == null
          || mood == null
          || noise == null
          || outlets == null
          || wifi == null) {
        responseMap.put("response_type", "failure");
        responseMap.put(
            "error",
            "must contain the following params: uid, name, email, comfort, mood, noise, outlets, wifi!");
        return Utils.toMoshiJson(responseMap);
      }

      // todo: check if user already exists??

      // if new user:
      Map preferences = new HashMap<String, Object>();
      preferences.put("comfort", comfort);
      preferences.put("mood", mood);
      preferences.put("noise", noise);
      // NOTE: Boolean.valueOf will only create a *true* bool if the input is "true"!
      preferences.put("outlets", Boolean.valueOf(outlets));
      preferences.put("wifi", Boolean.valueOf(wifi));

      storageHandler.addUser(uid, name, email, preferences);

      // // check if user exists
      // if (!this.storageHandler.userExists(uid)) {
      //   responseMap.put("response_type", "failure");
      //   responseMap.put("error", "uid not found in database");
      //   return Utils.toMoshiJson(responseMap);
      // }

      // TODO: should we check if uid already exists? or just replace it if it does?

      responseMap.put("response_type", "success");
    } catch (Exception e) {
      // error likely occurred in the storage handler
      e.printStackTrace();
      responseMap.put("response_type", "failure");
      responseMap.put("error", e.getMessage());
    }

    return Utils.toMoshiJson(responseMap);
  }
}
