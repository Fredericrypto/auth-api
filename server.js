import express from 'express';
import { db } from './src/db/index.js';
import { usuariosTable } from './src/db/schema.js';
import { eq } from 'drizzle-orm';
import { criptografarSenha, verificarSenha } from './utils/auth.js';

const app = express();

app.use(express.json());

// Rota de Cadastro (POST)
app.post('/register', async (req, res) => {
  try {
    // 1. O cidadão entrega um papel com os dados dele:
    const { nome, email, senha } = req.body;

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
    // 1. A pessoa digita o email e a senha na maquininha da catraca:
    const { email, senha } = req.body;

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

    // 4. Se a senha estiver certa, a catraca dá o sinal verde: "Login autorizado!"
    return res.status(200).json({ sucesso: true, mensagem: 'Login autorizado!' });

  } catch (error) {
    return res.status(500).json({ sucesso: false, erro: 'Erro interno' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000 🚀');
});