import java.io.*;
import java.net.*;

public class Server {

    private final int port = 8989;

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
                            
                        } else if (line.matches("POST\\s+.*")) {
                            // process the POST request skickar data till servern (responsen)
                            String[] spaceSplitLine = line.split(" ");
                            String method = spaceSplitLine[0];
                            String path = spaceSplitLine[1];
                            String httpVersion = spaceSplitLine[2];
                            // parsar på samma sätt som get requesten 

                            System.out.println("Method: " + method);
                            System.out.println("Path: " + path);
                            System.out.println("Version: " + httpVersion);
                            
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
