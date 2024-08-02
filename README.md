# Desafio BMG

O projeto está disponível neste [link](https://investingpig.netlify.app/).

## Instalação
> [!IMPORTANT]
> OBS: todos os comandos são considerando a pasta root (bmg-challenge) como inicial.

O projeto está divido entre a **backend e frontend**, então serão necessárias duas instalações, uma dentro da pasta **challenge-backend**:

    $ cd challenge-backend
    $ npm install

E outra na pasta **challenge-frontend**:

    $ cd challenge-frontend
    $ npm install

## Rodando o projeto

Novamente, como o projeto está dividido em duas partes, primeiro iniciamos o **backend**:

    $ cd challenge-backend
    $ npm start

E depois o **front**:

    $ cd challenge-frontend
    $ npm dev

Para o funcionamento correto do projeto, são necessários os arquivos de variáveis de ambiente, **.env** para o backend e **.env.local** para o frontend.
Estes arquivos serão enviados no email contendo a minha solução do desafio.

Também será enviada uma collection do Postman para utilização da API no ambiente local.
>[!CAUTION]
> **Lembrando de utilizar a mesma porta especificada no arquivo .env**.


## Testes End to End

Como foi especificado do desafio, escolhi por testes e2e por testarem de uma forma mais completa a utilização do app.
Para rodar os testes basta rodar o seguinte comando:

    $ cd challenge-backend
    $ npm run test:e2e

## Detalhes do projeto

O backend foi desenvolvido utilizando **NestJS** e o frontend **NextJS**.
A estrutura do projeto foi construída seguindo as documentações oficiais das duas frameworks, visando um desenvolvimento de fácil compreensão.

A autenticação foi feita usando **token JWT**, que ficam salvos na sessionStorage na parte do frontend da aplicação.

O projeto tem somente duas páginas, uma para a realização do Login/Criação de conta de usuário e
uma de dashboard, com as informações e ações relacionadas as carteiras de investimentos.

## Features Futuras

Uma das features que pode ser implementada é a parte de **recuperação de conta**, via email cadastrado.
Para criar essa feature, os passos que serão seguidos são os seguintes:

1. Criação de endpoints no backend:
   2. Criar uma rota para gerar um token de recuperação de senha e enviar por email;
   3. Criar uma rota para atualizar a nova senha.
   

2. Criação de páginas no frontend:
   3. Página para realizar a requisição de nova senha;
   4. Página em que o usuário usaria o token de recuperação de senha recebido por email para realizar a troca da senha.

Esses passos garantem uma recuperação de senha secura e de fácil utilização para o usuário.

Outra feature interessante seria a integração do backend com alguma API de dados reais de investimentos,
como por exemplo a [Stooq](https://stooq.com/t/), uma API que tem informações dos preços das ações de várias empresas.
