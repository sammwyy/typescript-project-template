import { createServer, IncomingMessage, Server, ServerResponse} from 'http';

class App {

  private readonly server: Server;

  constructor() {
    this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
      this.onRequestReceived(req, res);
    });
  }

  private onRequestReceived (req: IncomingMessage, res: ServerResponse) {
    res.statusCode = 200;

    if (req.url == "/ping") {
      res.write("Pong");
      res.end();
    }

    else {
      res.write("<h1>Hello world</h1>");
      res.write("<p>Environment: " + process.env.NODE_ENV + "</p>");
      res.end();
    }
  }

  public close () {
    return new Promise((resolve) => {
      this.server.close(() => {
        resolve(true);
      });
    });
  }

  public listen (port: number, host: string) {
    return new Promise((resolve, reject) => {
      try {
        this.server.listen(port, host, () => {
          resolve(true);
        });
      } catch (e) {
        reject(e);
      }
    })
  }
}

const app = new App();
export default app;
