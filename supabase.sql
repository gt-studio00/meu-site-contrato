-- Rode este arquivo inteiro no SQL Editor do Supabase (pode rodar mais de uma vez).

create table if not exists public.contratos (
  id uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),
  empresa text not null check (char_length(empresa) between 2 and 200),
  cnpj text not null check (char_length(cnpj) = 18),
  representante text not null check (char_length(representante) between 5 and 200),
  cpf text not null check (char_length(cpf) = 14),
  endereco text not null check (char_length(endereco) between 8 and 300),
  contato text not null check (char_length(contato) between 8 and 200),
  assinatura text not null check (char_length(assinatura) between 5 and 200),
  aceite boolean not null check (aceite = true),
  pacote text not null default 'Completo',
  valor numeric not null default 1000,
  entrada numeric not null default 300,
  restante numeric not null default 700,
  vencimento date not null
);

alter table public.contratos enable row level security;

drop policy if exists "cliente envia contrato" on public.contratos;
drop policy if exists "admin le contratos" on public.contratos;
drop policy if exists "admin apaga contratos" on public.contratos;

-- Qualquer pessoa (logada ou não) pode ENVIAR um contrato, nunca ler.
create policy "cliente envia contrato" on public.contratos
  for insert to anon, authenticated
  with check (aceite = true and pacote = 'Completo' and valor = 1000 and entrada = 300 and restante = 700);

-- Só o seu e-mail lê e apaga.
create policy "admin le contratos" on public.contratos
  for select to authenticated
  using ((auth.jwt() ->> 'email') = 'gabrimot83@gmail.com');

create policy "admin apaga contratos" on public.contratos
  for delete to authenticated
  using ((auth.jwt() ->> 'email') = 'gabrimot83@gmail.com');

grant insert on public.contratos to anon, authenticated;
grant select, delete on public.contratos to authenticated;

notify pgrst, 'reload schema';
