insert into usuario(
	nome,
	nome_usuario,
	cpf,
	senha,
	numero_telefone,
	email,
	data_nascimento,
	perfil_sistema,
	`status`,
	data_alteracao_status
)
values(
	'joao maziteli',
	'joao',
	'471.292.823-41',
	'$2a$10$Ur/LZS2sLeqGoF1KOWBSb.dswpVs77Bot.Lwc1PjB9u/v9OaBRhMe',
	'(12) 31231-5624',
	'joao.maziteli@hotmail.com',
	'2001-01-18',
	0,
	1,
	'2023-06-06'
);

insert into usuario(
	nome,
	nome_usuario,
	cpf,
	senha,
	numero_telefone,
	email,
	data_nascimento,
	perfil_sistema,
	`status`,
	data_alteracao_status
)
values(
	'joao estoque',
	'joao estoque',
	'399.099.070-54',
	'$2a$10$Ur/LZS2sLeqGoF1KOWBSb.dswpVs77Bot.Lwc1PjB9u/v9OaBRhMe',
	'(12) 31231-5324',
	'joao.estoque@hotmail.com',
	'2001-01-18',
	1,
	1,
	'2023-06-06'
);

insert into cliente(
	nome_completo,
	cpf,
	email,
	senha,
	data_nascimento,
	genero,
	perfil_sistema
)
values(
	'joao cliente',
	'471.292.823-41',
	'joao.maziteli@hotmail.com',
	'$2a$10$Ur/LZS2sLeqGoF1KOWBSb.dswpVs77Bot.Lwc1PjB9u/v9OaBRhMe',
	'2001-01-02',
	0,
	2
);

insert into endereco(
	cep,
	logradouro,
	bairro,
	numero,
	complemento,
	cidade,
	uf,
	faturamento,
	entrega,
	id_cliente
)
values(
	'05844150',
	'Rua Manuel Antonio de Freitas' ,
	'Jardim Sao Luis',
	520,
	'casa',
	'Sao Paulo',
	'SP',
	true,
	false,
	1
);

	
insert into endereco(
	cep,
	logradouro,
	bairro,
	numero,
	complemento,
	cidade,
	uf,
	faturamento,
	entrega,
	id_cliente
)
values(
	'05844150',
	'Rua Manuel Antonio de Freitas',
	'Jardim Sao Luis',
	'520',
	'casa',
	'Sao Paulo',
	'SP',
	false,
	true,
	1
);

-- insert into produto(
-- 	nome,
-- 	avaliacao,
-- 	descricao,
-- 	preco,
-- 	qtd,
-- 	status,
-- 	data_alteracao_status,
-- 	foto_principal
-- )
-- values(
-- 	'pendrive',
-- 	'5',
-- 	'pendrive pirata',
-- 	'120',
-- 	17,
-- 	1,
-- 	'2023-06-06',
-- 	''
-- );

-- insert into produto_foto(
-- 	nome_foto,
-- 	caminho_fisico,
-- 	id_produto
-- )
-- values(
-- 	'img1',
-- 	'./fotos-sistema/1/img1.jpeg',
-- 	'1'
-- );

-- insert into produto_foto(
-- 	nome_foto,
-- 	caminho_fisico,
-- 	id_produto
-- )
-- values(
-- 	'img2',
-- 	'./fotos-sistema/1/img2.jpeg',
-- 	'1'
-- );

-- update produto
-- set foto_principal = 'img1'
-- where id = 1;
