import java.util.*;
import java.io.*;


public class GuessSender {

    public String sendResponse(String message, String userForm){
        StringBuilder parsedHTML = new StringBuilder();

        try (Scanner scanner = new Scanner(new File("guess.html"))){
            // Läser in html filen och lägger den som parsedHTML
            while (scanner.hasNext()){
                parsedHTML.append(scanner.nextLine()).append("\n");
            }
            
        } catch (Exception e) {
            //Fallback om ngt är fel med inlästa filen 
            return "<html><body>" + message + userForm + "</html></body>";
        }

        String reponse = parsedHTML.toString();

        reponse = reponse.replace("{{message}}", message);
        reponse = reponse.replace("{{userForm}}", userForm);
        
        return reponse;

    }


}
