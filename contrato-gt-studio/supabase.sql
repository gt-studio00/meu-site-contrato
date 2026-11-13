-- Rode este arquivo inteiro no Supabase: SQL Editor > New query > Run.
-- Se você já rodou a versão antiga, apague a tabela velha antes (isso apaga os contratos de teste):
--   drop table if exists public.contratos;

create table if not exists public.contratos (
  id uuid primary key default gen_random_uuid(),
  criado_em timestamptz not null default now(),
  status text not null default 'pendente' check (status in ('pendente','assinado')),
  cliente text not null check (char_length(cliente) between 2 and 200),
  pacote text not null check (char_length(pacote) between 2 and 80),
  valor numeric not null check (valor > 0),
  entrada_pct int not null default 30 check (entrada_pct between 1 and 100),
  vencimento_dia int not null default 5 check (vencimento_dia between 1 and 28),
  prazo_dias int not null default 7 check (prazo_dias between 1 and 365),
  ajustes int not null default 3 check (ajustes between 0 and 50),
  itens text not null check (char_length(itens) between 3 and 4000),
  promo_texto text check (promo_texto is null or char_length(promo_texto) <= 600),
  empresa text, cnpj text, representante text, cpf text, endereco text, contato text, assinatura text,
  aceite boolean not null default false,
  assinado_em timestamptz,
  vencimento date
);

alter table public.contratos enable row level security;
revoke all on public.contratos from anon;
grant select, insert, update, delete on public.contratos to authenticated;

-- Somente o seu e-mail, logado, cria, vê, altera e apaga contratos.
drop policy if exists "admin total" on public.contratos;
create policy "admin total" on public.contratos for all to authenticated
  using ((auth.jwt() ->> 'email') = 'gabrimot83@gmail.com')
  with check ((auth.jwt() ->> 'email') = 'gabrimot83@gmail.com');

-- A cliente (sem login) só acessa o contrato do link dela, por duas funções.
create or replace function public.ver_contrato(p_id uuid) returns json
language sql security definer set search_path = public as $$
  select json_build_object('status', status, 'cliente', cliente, 'pacote', pacote, 'valor', valor,
    'entrada_pct', entrada_pct, 'vencimento_dia', vencimento_dia, 'prazo_dias', prazo_dias,
    'ajustes', ajustes, 'itens', itens, 'promo_texto', promo_texto)
  from public.contratos where id = p_id;
$$;

create or replace function public.assinar_contrato(p_id uuid, p_empresa text, p_cnpj text, p_rep text,
  p_cpf text, p_end text, p_ctt text, p_ass text, p_aceite boolean) returns json
language plpgsql security definer set search_path = public as $$
declare c public.contratos; v date;
begin
  if p_aceite is not true then raise exception 'aceite obrigatorio'; end if;
  if char_length(coalesce(p_empresa,'')) not between 2 and 200 or char_length(coalesce(p_cnpj,'')) <> 18
     or char_length(coalesce(p_rep,'')) not between 5 and 200 or char_length(coalesce(p_cpf,'')) <> 14
     or char_length(coalesce(p_end,'')) not between 8 and 300 or char_length(coalesce(p_ctt,'')) not between 8 and 200
     or char_length(coalesce(p_ass,'')) not between 5 and 200 then
    raise exception 'dados invalidos';
  end if;
  select * into c from public.contratos where id = p_id and status = 'pendente' for update;
  if not found then raise exception 'contrato indisponivel'; end if;
  v := (date_trunc('month', now() at time zone 'America/Sao_Paulo') + interval '1 month')::date + (c.vencimento_dia - 1);
  update public.contratos set empresa = p_empresa, cnpj = p_cnpj, representante = p_rep, cpf = p_cpf,
    endereco = p_end, contato = p_ctt, assinatura = p_ass, aceite = true, status = 'assinado',
    assinado_em = now(), vencimento = v where id = p_id;
  return json_build_object('assinado_em', now(), 'vencimento', v);
end $$;

revoke all on function public.ver_contrato(uuid) from public;
revoke all on function public.assinar_contrato(uuid, text, text, text, text, text, text, text, boolean) from public;
grant execute on function public.ver_contrato(uuid) to anon, authenticated;
grant execute on function public.assinar_contrato(uuid, text, text, text, text, text, text, text, boolean) to anon, authenticated;
