import 'reflect-metadata';
import 'dotenv/config';

import { Api } from './api/api';
import { AvaliacaoApi } from './api/avaliacao.api';
import { LivroApi } from './api/livro.api';
import { UsuarioApi } from './api/usuario.api';

import { container } from 'tsyringe';
import { LivroDAO } from './dao/livro.dao';
import { AvaliacaoDAO } from './dao/avaliacao.dao';
import { LivroServico } from './servico/livro.servico';

container.registerSingleton(LivroDAO, LivroDAO);
container.registerSingleton(AvaliacaoDAO, AvaliacaoDAO);
container.registerSingleton(LivroServico, LivroServico);

const app = Api.build();

AvaliacaoApi.build(app);
LivroApi.build(app);
UsuarioApi.build(app);

app.start();
