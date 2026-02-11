import java.io.*;
import java.net.*;
import java.util.Scanner;
import arcade.GuessMyNumberGame;
//import arcade.mastermindGame;

public class Server {

    private static final int port = 8989;

    public static void main(String[] args) {
        new Server();
    }

    public Server() {
        try (ServerSocket serverSocket = new ServerSocket(this.port)) {
            System.out.println("Listening on port: " + this.port);

            while (true) {

                try (Socket socket = serverSocket.accept();
                     BufferedReader in = new BufferedReader(new InputStreamReader(socket.getInputStream()));
                     BufferedWriter out = new BufferedWriter(new OutputStreamWriter(socket.getOutputStream()))) {

                    String line;
                    while ((line = in.readLine()) != null) { // read
                        System.out.println(" <<< " + line); // log

                        if (line.matches("GET\\s+.*")) {
                            // process the GET request, får datan från servern
                            // raden med GET har alltid formatet GET <method> <path> <httpVersion>
                            String[] spaceSplitLine = line.split(" ");
                            String method = spaceSplitLine[0];
                            String path = spaceSplitLine[1];
                            String httpVersion = spaceSplitLine[2];

                            System.out.println("Method: " + method);
                            System.out.println("Path: " + path);
                            System.out.println("Version: " + httpVersion);

                            // initaliserar guessSender, guessNumberGame och mastermindGame
                            GuessSender guessSender = new GuessSender();
                            GuessMyNumberGame guessNumberGame = new GuessMyNumberGame();

                            String welcomeMessage = guessNumberGame.welcomeMessage();
                            String request = guessSender.sendResponse(welcomeMessage, """
                            <form method='POST'>
                                <input type='number' name='guess'>
                                <input type='submit' value='submit'>
                            </form>
                            """);
                            
                            // 2. Put it in the "Envelope" (HTTP Protocol)
                            out.write("HTTP/1.1 200 OK\n"); // Status line
                            out.write("Content-Type: text/html\n"); // Type header
                            out.write("Content-Length: " + request.length() + "\n"); // Size header
                            out.write("\n"); 
                            // 3. Send the content
                            out.write(request);
                            out.flush();
                            break;
                                                    
                        } else if (line.matches("POST\\s+.*")) {
                            // process the POST request skickar data till servern (responsen)
                            String[] spaceSplitLine = line.split("-"); // splittar hela post requesten till en sträng
                            String url = spaceSplitLine[1];

                            if (url.contains("mastermind")){
                                // masterind implementation
                            } else if (url.contains("guessmynumber")) {
                                // guessmynumber implementation
                            }
                        }
                    }

                    System.out.println(" >>> " + "HTTP RESPONSE"); // log
                    out.write("HTTP RESPONSE"); // write
                    out.flush(); // flush

                } catch (IOException e) {
                    System.err.println(e.getMessage());
                }

            }
        } catch (IOException e) {
            System.err.println(e.getMessage());
            System.err.println("Could not listen on port: " + this.port);
            System.exit(1);
        }
    }
}
