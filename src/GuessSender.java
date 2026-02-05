import java.util.*;


public class GuessSender {
    public String sendResponse(String message, String userForm){
        Scanner scanner = new Scanner("guess.html");
        StringBuilder parsedHTML = new StringBuilder();
        
        // Läser in html filen och lägger den som parsedHTML
        while (scanner.hasNext()){
            parsedHTML.append(scanner.nextLine()).append("\n");
        }
        scanner.close();

        String reponse = parsedHTML.toString();

        reponse = reponse.replace("{{message}}", message);
        reponse = reponse.replace("{{userForm}}", userForm);
        
        return reponse;

    }


}
