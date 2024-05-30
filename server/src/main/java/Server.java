import static spark.Spark.after;

import handlers.AddUserHandler;
import java.io.IOException;
import spark.Filter;
import spark.Spark;
import storage.FirebaseUtilities;

/** Top Level class for our project, utilizes spark to create and maintain our server. */
public class Server {

  /**
   * Sets up server using Spark Instantiates FirebaseUtilities to use for database handlers and
   * Datasources to use for geojson handlers Sets up endpoints for respective handlers
   */
  public static void setUpServer() {
    int port = 3232;
    Spark.port(port);

    after(
        (Filter)
            (request, response) -> {
              response.header("Access-Control-Allow-Origin", "*");
              response.header("Access-Control-Allow-Methods", "*");
            });

    // StorageInterface firebaseUtils;
    try {

      FirebaseUtilities fb = new FirebaseUtilities();

      // used for daily quiz
      //   Spark.get("add-DQ-answer", new AddDQAnswerHandler(fb));
      // Spark.get("get-DQ", new GetDQHandler(fb));

      Spark.get("add-user", new AddUserHandler(fb));
      // Spark.get("get-user-info", new GetUserInfoHandler(fb));
      // Spark.get("add-spot", new AddStudySpotHandler(fb));

      Spark.notFound(
          (request, response) -> {
            response.status(404); // Not Found
            System.out.println("ERROR");
            return "404 Not Found - The requested endpoint does not exist.";
          });
      Spark.init();
      Spark.awaitInitialization();

      System.out.println("Server started at http://localhost:" + port);
    } catch (IOException e) {
      e.printStackTrace();
      System.err.println(
          "Error: Could not initialize Firebase. Likely due to firebase_config.json not being found. Exiting.");
      System.exit(1);
    }
  }

  /**
   * Runs Server.
   *
   * @param args none
   */
  public static void main(String[] args) {
    setUpServer();
  }
}
