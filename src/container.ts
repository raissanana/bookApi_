import { container } from 'tsyringe';

import { LivroDAO } from './dao/livro.dao';
import { LivroServico } from './servico/livro.servico';
import { LivroControle } from './controle/livro.controle';

import { UsuarioDAO } from './dao/usuario.dao';
import { UsuarioServico } from './servico/usuario.servico';
import { UsuarioControle } from './controle/usuario.controle';

import { AvaliacaoDAO } from './dao/avaliacao.dao';
import { AvaliacaoServico } from './servico/avaliacao.servico';
import { AvaliacaoControle } from './controle/avaliacao.controle';

container.registerSingleton(LivroDAO, LivroDAO);
container.registerSingleton(LivroServico, LivroServico);
container.registerSingleton(LivroControle, LivroControle);

container.registerSingleton(UsuarioDAO, UsuarioDAO);
container.registerSingleton(UsuarioServico, UsuarioServico);
container.registerSingleton(UsuarioControle, UsuarioControle);

container.registerSingleton(AvaliacaoDAO, AvaliacaoDAO);
container.registerSingleton(AvaliacaoServico, AvaliacaoServico);
container.registerSingleton(AvaliacaoControle, AvaliacaoControle);
