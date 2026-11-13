# Contratos GT Studio com painel admin

- `admin.html`: painel só seu. Você escolhe o pacote, ajusta valores e gera um link de contrato para cada cliente.
- `index.html`: a tela que a cliente abre pelo link (`index.html?c=...`), preenche tudo, assina e baixa o contrato.
- `contrato.js`: texto do contrato, montado a partir do que você definiu no painel.
- `config.js`, `styles.css`, `fx.js`, `supabase.sql`: configuração, visual e banco.

## Como usar no dia a dia

1. Abra `admin.html` e entre com seu e-mail e senha.
2. Em **Novo contrato**, digite o nome do cliente, escolha o pacote base (Básico, Intermediário, Completo ou Personalizado) e mude o que quiser: valor, % de entrada, dia do restante, prazo, rodadas de ajustes, lista do que está incluso e texto de promoção.
3. Clique em **Gerar link do contrato** e copie o link ou a mensagem pronta para o WhatsApp.
4. Quando o cliente assinar, o contrato aparece em **Contratos** como "Assinado", com todos os dados, e você pode baixar a cópia.

Os valores iniciais de cada pacote são os preços normais (R$ 800, R$ 1.000 e R$ 1.200). Para promoção, mude o valor e escreva o texto da promoção.

## Configuração (uma vez só)

1. Crie uma conta e um projeto grátis em https://supabase.com.
2. Em **SQL Editor**, cole o conteúdo de `supabase.sql` e clique em Run. Se já tinha rodado a versão antiga, rode antes `drop table if exists public.contratos;` (apaga os contratos de teste).
3. Em **Authentication > Sign In / Providers > Email**, desligue **"Allow new users to sign up"**.
4. Em **Authentication > Users > Add user**, crie o usuário com o e-mail gabrimot83@gmail.com e uma senha forte e nova, escolhida ali. A senha fica só no Supabase, nunca no código.
5. Em **Settings > API**, copie a Project URL e a anon key e cole em `config.js`.
6. Suba todos os arquivos no GitHub e ligue o GitHub Pages (Settings > Pages > branch main, pasta root).

## Segurança

- A senha do admin não está no código. A cliente não acessa a tabela: só consegue abrir e assinar o contrato do link dela, por duas funções do banco. Só o seu e-mail, logado, lê, cria e apaga contratos.
- O link de cada contrato tem um código aleatório e longo. Quem tiver o link consegue ver os termos e assinar uma vez, então envie só para o cliente certo.
- A anon key no `config.js` é pública de propósito. Quem protege os dados são as regras do `supabase.sql`, por isso rode o arquivo completo.
- O `config.js` também tem sua chave Pix (CPF). Em repositório público, qualquer pessoa vê. Se não quiser isso, apague essas linhas e envie o Pix pelo WhatsApp, ou use repositório privado com Netlify ou Vercel.
- O contrato assinado é um aceite eletrônico simples. Para mais segurança jurídica, vale conferir o modelo com um advogado.
