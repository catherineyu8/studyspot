package handlers;

import java.util.HashMap;
import java.util.Map;
import spark.Request;
import spark.Response;
import spark.Route;
import storage.FirebaseUtilities;

public class GetUserInfoHandler implements Route {
  public FirebaseUtilities storageHandler;

  public GetUserInfoHandler(FirebaseUtilities storageHandler) {
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

      // check that uid exists, and does not overlap with one that already exists in db
      if (uid == null) {
        responseMap.put("response_type", "failure");
        responseMap.put("error", "uid cannot be null!");
        return Utils.toMoshiJson(responseMap);
      }

      Map<String, Object> result = storageHandler.getUser(uid);
      if (result == null) {
        responseMap.put("response_type", "failure");
        responseMap.put("error", "storage handler failed to find the user!");
      } else {
        responseMap.put("response_type", "success");
        responseMap.put("user_info", result);
      }
    } catch (Exception e) {
      // error likely occurred in the storage handler
      e.printStackTrace();
      responseMap.put("response_type", "failure");
      responseMap.put("error", e.getMessage());
    }

    return Utils.toMoshiJson(responseMap);
  }
}
