import express from 'express';
// Importa o Helmet e CORS
import helmet from 'helmet';
import cors from 'cors';
import { db } from './src/db/index.js';
import { usuariosTable } from './src/db/schema.js';
import { eq } from 'drizzle-orm';
import { criptografarSenha, verificarSenha } from './utils/auth.js';
// Importa os schemas de validação criados com o Zod
import { registerSchema, loginSchema } from './src/schemas/auth.schema.js';
// Importa a função geradora de token e o middleware de segurança JWT
import { gerarToken } from './src/utils/jwt.js';
import { authMiddleware } from './src/middlewares/auth.middleware.js';

const app = express();

// Aplicando o Helmet para blindar os headers de segurança HTTP
app.use(helmet());

// Aplicando o CORS (por padrão libera requisições de de qualquer origem, ideal para desenvolvimento)
app.use(cors());

app.use(express.json());

// Rota de Cadastro (POST)
app.post('/register', async (req, res) => {
  try {
    // 0. O Zod faz a barreira inicial: verifica se o papel preenchido pelo cidadão está no formato correto (nome válido, email real, senha com tamanho mínimo)
    const validacao = registerSchema.safeParse(req.body);

    if (!validacao.success) {
      // Se o papel estiver rasurado ou fora das regras, o segurança barra na hora com os detalhes do erro
      return res.status(400).json({
        sucesso: false,
        erros: validacao.error.format(),
      });
    }

    // 1. O cidadão entrega um papel com os dados dele (já validados pelo Zod):
    const { nome, email, senha } = validacao.data;

    // 2. Antes de guardar a senha, passamos ela pelo triturador de segurança (Argon2):
    // (Para que ninguém, nem mesmo quem cuida do banco, saiba qual é a sua senha real)
    const senhaHash = await criptografarSenha(senha);

    // 3. O segurança pega o nome, o email e a senha triturada e guarda no fichário (Banco de Dados):
    await db.insert(usuariosTable).values({
      nome,
      email,
      senha: senhaHash,
    });

    // 4. O segurança sorri e diz: "Pronto, cadastrado com sucesso!"
    return res.status(201).json({ sucesso: true, mensagem: 'Usuário cadastrado com sucesso' });

  } catch (error) {
    // Se der algum problema (ex: o email já foi cadastrado antes), ele avisa o erro.
    return res.status(400).json({ sucesso: false, erro: 'Erro ao cadastrar' });
  }
});

// Rota de Login (POST)
app.post('/login', async (req, res) => {
  try {
    // 0. O Zod confere se o formato do email e da senha informados na entrada fazem o menor sentido estrutural
    const validacao = loginSchema.safeParse(req.body);

    if (!validacao.success) {
      // Se faltar informação ou o email estiver mal formatado, barra imediatamente
      return res.status(400).json({
        sucesso: false,
        erros: validacao.error.format(),
      });
    }

    // 1. A pessoa digita o email e a senha na maquininha da catraca:
    const { email, senha } = validacao.data;

    // 2. O segurança olha no fichário para ver se acha uma ficha com aquele email:
    const [usuario] = await db.select().from(usuariosTable).where(eq(usuariosTable.email, email));
    
    // Se o email não existir no fichário, o segurança bloqueia a entrada:
    if (!usuario) {
      return res.status(401).json({ sucesso: false, erro: 'Credenciais inválidas' });
    }

    // 3. Se achou o email, o segurança pega a senha que a pessoa digitou agora 
    // e confere com a senha triturada que está guardada no fichário:
    const senhaValida = await verificarSenha(senha, usuario.senha);
    
    // Se a senha estiver errada, a catraca continua travada:
    if (!senhaValida) {
      return res.status(401).json({ sucesso: false, erro: 'Credenciais inválidas' });
    }

    // 🌟 NOVIDADE: Se a senha estiver certa, geramos o crachá digital (token JWT) para o usuário
    const token = gerarToken(usuario);

    // 4. A catraca dá o sinal verde e entrega o token de acesso: "Login autorizado!"
    return res.status(200).json({ 
      sucesso: true, 
      mensagem: 'Login autorizado!',
      token // O cliente guarda esse token para as próximas requisições
    });

  } catch (error) {
    return res.status(500).json({ sucesso: false, erro: 'Erro interno' });
  }
});

// 🌟 NOVIDADE: Rota protegida por Middleware que exige o crachá (token JWT) válido
app.get('/perfil', authMiddleware, (req, res) => {
  return res.status(200).json({
    sucesso: true,
    mensagem: 'Você acessou uma rota protegida com sucesso!',
    usuarioLogado: req.usuario // Dados descriptografados diretamente do token pelo middleware
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000 🚀');
});