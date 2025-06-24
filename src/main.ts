import 'reflect-metadata';
import 'dotenv/config';
import { Api } from './api/api';
import { AvaliacaoApi } from './api/avaliacao.api';
import { LivroApi } from './api/livro.api';
import { UsuarioApi } from './api/usuario.api';

const app = Api.build();

AvaliacaoApi.build(app);
LivroApi.build(app);
UsuarioApi.build(app);

app.start();
