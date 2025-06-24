import express, { Express, Request, Response } from 'express';

export class Api {
  private constructor(readonly app: Express) {}

  public static build(): Api {
    const app = express();
    app.use(express.json());
    return new Api(app);
  }

  public start(): void {
    this.app.listen(3000, () => {
      console.log('Server rodando na porta 3000.');
    });
  }

  public addRota(
    rota: string,
    metodo: string,
    funcao: (request: Request, response: Response) => void
  ): void {
    switch (metodo.toUpperCase()) {
      case 'GET':
        this.app.get(rota, funcao);
        break;
      case 'POST':
        this.app.post(rota, funcao);
        break;
      case 'PUT':
        this.app.put(rota, funcao);
        break;
      case 'PATCH':
        this.app.patch(rota, funcao);
        break;
      case 'DELETE':
        this.app.delete(rota, funcao);
        break;
      default:
        console.error(`Método HTTP não suportado: ${metodo}`);
    }
  }
}
