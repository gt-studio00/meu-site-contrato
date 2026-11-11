# Contrato GT Studio com painel admin

- `index.html`: tela que a cliente preenche e assina. Os dados vão para o banco quando ela assina.
- `admin.html`: painel só seu (login com e-mail e senha) para ver os contratos recebidos.
- `config.js`, `styles.css`, `supabase.sql`: configuração, visual e banco.
- `contrato.js`: texto das cláusulas (usado na tela da cliente, no download e no painel). `fx.js`: efeitos visuais.

No painel você abre um contrato e pode baixar, copiar os dados ou apagar.

## Configuração (uma vez só)

1. Crie uma conta e um projeto grátis em https://supabase.com.
2. Em **SQL Editor**, cole o conteúdo de `supabase.sql` e clique em Run.
3. Em **Authentication > Sign In / Providers > Email**, **desligue "Allow new users to sign up"**. Assim ninguém além de você cria conta.
4. Em **Authentication > Users > Add user**, crie o usuário com o e-mail gabrimot83@gmail.com e a senha que você quiser (marque "Auto Confirm User"). Quanto mais forte, melhor. A senha fica só no Supabase, nunca no código.
5. Em **Settings > API**, copie a Project URL e a anon key e cole em `config.js`.
6. Suba todos os arquivos no GitHub e ligue o GitHub Pages (Settings > Pages > branch main, pasta root).

Endereços: `.../index.html` para a cliente e `.../admin.html` para você.

## Segurança

- A senha do admin não está no código. Quem protege os dados é o login do Supabase mais as regras (RLS) do `supabase.sql`: a cliente só consegue enviar, e só o seu e-mail consegue ler.
- A anon key no `config.js` é pública de propósito. Sem as regras do RLS ela não serviria de proteção, por isso rode o SQL completo.
- O `config.js` também contém sua chave Pix (CPF). Em repositório público, qualquer pessoa vê. Se não quiser isso, apague as linhas do Pix e envie a chave pelo WhatsApp, ou use repositório privado com Netlify/Vercel.
- O contrato assinado é um aceite eletrônico simples. Para mais segurança jurídica, vale conferir com um advogado.
