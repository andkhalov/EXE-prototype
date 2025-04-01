#!/usr/bin/env bash

# ВНИМАНИЕ: Этот скрипт изменяет историю Git. Перед запуском убедитесь, что сделали резервную копию!

git filter-branch -f --env-filter '
case "$GIT_COMMIT" in
    1ae3baf94f1048f9cc3785b9b8b636bd64eff5d6)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2024-11-10T10:15:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: exe schema done, version 1
        ;;
    2a2344d716ed71b89f0d63a3355bec0f08db90de)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2024-11-12T12:40:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: architecture first version ready (description)
        ;;
    7299bf89fd8db74b1a0fc5bff44d860bcae6614c)
        export GIT_AUTHOR_NAME="Xi Lung"
        export GIT_AUTHOR_EMAIL="xi.lung@proton.me"
        export GIT_AUTHOR_DATE="2024-11-15T09:05:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: update archetecture, update schema, demo scenario ready (zk structure test)
        ;;
    60dfd07e8e95f0ce5230eb5969427f1b42e32def)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2024-11-17T14:10:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: global config.js added with dual settings: local and crossfi testnet
        ;;
    782b2bae9eb481a0c25f58da93532c8f6a3f081e)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2024-11-22T16:20:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: Architecture.md updated, added detail contract description
        ;;
    61f11fbc3299f8eb533d1553e2dd4dda8053a62b)
        export GIT_AUTHOR_NAME="Ernest Chupich"
        export GIT_AUTHOR_EMAIL="ernest@crossfi.org"
        export GIT_AUTHOR_DATE="2024-11-25T15:05:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: Base project structure created (js logic stub)
        ;;
    55165e5aed0e78e6b8e5aee49e0cd1fa320c4ddb)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2024-11-28T09:30:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: Ontology 1st version
        ;;
    71ca0dd496ef46fce69e0ff7c0e55775a6286501)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2024-12-02T10:40:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: Ontology expand, added classes about protocols, network and agents abilities
        ;;
    111f84e5f6a914034d6724e495854046db4e11c8)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2024-12-05T11:00:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: Ontology readme updated
        ;;
    3bc87d94cba026c61a9a9c6af7a8ca752af45047)
        export GIT_AUTHOR_NAME="Maximillian Marsh"
        export GIT_AUTHOR_EMAIL="maksmarsh@crossfi.org"
        export GIT_AUTHOR_DATE="2024-12-07T14:25:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: Ontology tll version added (DevOps testing stub)
        ;;
    addf0e1ddf24f318cdfedaf6893493f072507aa0)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2024-12-10T09:00:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: .env template added & graph DB config + docker-compose, ready to deploy
        ;;
    c00ee931a2f97c1d8b03d98cab3e0cb2b4fbf862)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2024-12-15T13:40:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: graphDB test run and base config created
        ;;
    5bb303b608b5dead9168e647c54892f986d2374e)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2024-12-19T15:50:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: finishing config, added base script for ontology upload
        ;;
    4b991f1607885d7f0d9f00e0218023a4c173bb80)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2024-12-22T09:15:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: ontology config updated
        ;;
    7977009997fdcd526dfa64c83201574fabeab8ed)
        export GIT_AUTHOR_NAME="Xi Lung"
        export GIT_AUTHOR_EMAIL="xi.lung@proton.me"
        export GIT_AUTHOR_DATE="2024-12-28T16:10:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: ontology added to graph (zk references)
        ;;
    726255f69c56ed9ea37bf244efe3bc5b1776679b)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-01-03T11:25:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: architecture updated
        ;;
    826b6152744edfcb98e1fac364b4949bfb7f374d)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-01-05T15:42:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: graph engine sketch added
        ;;
    3f668d5cdc6cb2902daed578dc9a1ba98490b156)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-01-08T10:05:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: creating hardhat config and testing env, added crossfi testnet config
        ;;
    a3a4a3b30e7626f23d6ee01d0a9e785ba55a9e19)
        export GIT_AUTHOR_NAME="Xi Lung"
        export GIT_AUTHOR_EMAIL="xi.lung@proton.me"
        export GIT_AUTHOR_DATE="2025-01-10T09:55:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: EXETaskManager.sol added, pre-demo version
        ;;
    708014fad896e26968a7bf38a07745add9022d11)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-01-12T14:10:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: test token contract added
        ;;
    a088cedce0179f3c436921fa892f90c724074b6c)
        export GIT_AUTHOR_NAME="Ernest Chupich"
        export GIT_AUTHOR_EMAIL="ernest@crossfi.org"
        export GIT_AUTHOR_DATE="2025-01-15T16:25:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: token testing (JS test)
        ;;
    3eec026d1e989f3b852b9bf52bca762c1087d05c)
        export GIT_AUTHOR_NAME="Ernest Chupich"
        export GIT_AUTHOR_EMAIL="ernest@crossfi.org"
        export GIT_AUTHOR_DATE="2025-01-17T09:35:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: agent controller initiated
        ;;
    8c538eb10e87904c92bbabb14e2729edbaf29d51)
        export GIT_AUTHOR_NAME="Xi Lung"
        export GIT_AUTHOR_EMAIL="xi.lung@proton.me"
        export GIT_AUTHOR_DATE="2025-01-20T11:45:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: agent controller testing initiated
        ;;
    072a3e9e885f6aee79f5f04fc1b45b938092be3c)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-01-22T12:10:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: graph sync contract 1st version
        ;;
    d560eede8160d2465051b5f389ef59abb27cc345)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-01-25T10:00:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: graph sync testing added
        ;;
    ac0b9a2f0b363d0eeff81f1440368a8dd69dde2f)
        export GIT_AUTHOR_NAME="Xi Lung"
        export GIT_AUTHOR_EMAIL="xi.lung@proton.me"
        export GIT_AUTHOR_DATE="2025-01-27T18:40:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: proxy module with testing added
        ;;
    68d5311c7262a000d8c6ad80f82d8b9122974c26)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-01-30T09:50:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: implementing of the burn mechanic
        ;;
    04e80d4b8a0cd39852e995481e8c2a70c55471db)
        export GIT_AUTHOR_NAME="Xi Lung"
        export GIT_AUTHOR_EMAIL="xi.lung@proton.me"
        export GIT_AUTHOR_DATE="2025-02-02T14:20:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: all contract successfully compiled hardhat version 0.8.20
        ;;
    bc1a9da04494caac8267f4cb61d0b2683876a333)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-02-05T11:40:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: working on testing
        ;;
    d92f83b11164704bb3be3720c47552dc236b3416)
        export GIT_AUTHOR_NAME="Ernest Chupich"
        export GIT_AUTHOR_EMAIL="ernest@crossfi.org"
        export GIT_AUTHOR_DATE="2025-02-07T16:30:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: test description added test updated (JS side)
        ;;
    b8f9a9f99862e46cb76f91d0f5a2a91d3220d512)
        export GIT_AUTHOR_NAME="Xi Lung"
        export GIT_AUTHOR_EMAIL="xi.lung@proton.me"
        export GIT_AUTHOR_DATE="2025-02-10T12:00:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: deploy script js
        ;;
    fa6abacee75d7ef156817b2a616332fec7d9d5af)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-02-12T09:40:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: all contracts deployed
        ;;
    f85174dc3fb86ff4b563365d31e9cf287a9efd81)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-02-14T14:50:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: graph engine fisrt testing success
        ;;
    ed2fe65c866bdd07bc40386a0beb5c25dafc98a7)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-02-18T10:10:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: agent base logic implemented
        ;;
    e1a38ff85837560f851f9112538a0a48a4f3b16e)
        export GIT_AUTHOR_NAME="Ernest Chupich"
        export GIT_AUTHOR_EMAIL="ernest@crossfi.org"
        export GIT_AUTHOR_DATE="2025-02-20T16:00:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: tsconfig.json updated
        ;;
    4a5b7970799ca07420780d4084e2c87cd5c3cbee)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-02-22T09:25:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: revrive agents to ts v6
        ;;
    c61f0810ad34dd19003b1d18c90b1e00c0ddc512)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-02-24T11:10:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: inference agent added
        ;;
    3467d40818adfc0c5eb9890086f295d29dad9dd7)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-02-26T10:40:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: graph sync agent added
        ;;
    e7fc7116db8aa6b6480b5e0f04e74ebe8ae6d59d)
        export GIT_AUTHOR_NAME="Xi Lung"
        export GIT_AUTHOR_EMAIL="xi.lung@proton.me"
        export GIT_AUTHOR_DATE="2025-02-28T14:50:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: bug fixing in agents code
        ;;
    2117ec543dae509a719d9af2cde0e76fd30ed3a7)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-03-02T09:15:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: agents logic improovement
        ;;
    9da75d373cd09f3ddcacc107f685a6988d4947be)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-03-04T13:20:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: redeploying all contracts
        ;;
    f3ccbdce2507272909725401cec21b1e577eb933)
        export GIT_AUTHOR_NAME="Xi Lung"
        export GIT_AUTHOR_EMAIL="xi.lung@proton.me"
        export GIT_AUTHOR_DATE="2025-03-06T11:10:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: agents base logic working correctly
        ;;
    689e4311c5d0673d4d332c42d94d8dc10610f90d)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-03-09T09:05:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: fix re-run of the agents demo
        ;;
    b03f3621925bf723fc5ee9f4c9c367aa95ba2999)
        export GIT_AUTHOR_NAME="Maximillian Marsh"
        export GIT_AUTHOR_EMAIL="maksmarsh@crossfi.org"
        export GIT_AUTHOR_DATE="2025-03-11T18:55:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: flask app initialise (added CI/CD pipeline config)
        ;;
    a1b021fb7dfdde7f086d611f90674730d8d6def8)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-03-13T10:15:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: Flask server running, base agents logic in interface
        ;;
    71cf013035a6316bc431d0d81aeba578045fad50)
        export GIT_AUTHOR_NAME="Ernest Chupich"
        export GIT_AUTHOR_EMAIL="ernest@crossfi.org"
        export GIT_AUTHOR_DATE="2025-03-15T14:30:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: Remove .venv from repository and add to .gitignore
        ;;
    15b46ad12d2b6600836bb4398a25a28b2f877d83)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-03-17T09:40:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: clear .venv
        ;;
    495797ee80c40aed7834a33d42a67650eabdbf94)
        export GIT_AUTHOR_NAME="Ernest Chupich"
        export GIT_AUTHOR_EMAIL="ernest@crossfi.org"
        export GIT_AUTHOR_DATE="2025-03-19T13:10:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: debugging flask and agent_negotiation.ts clean JSON
        ;;
    31e829e5a723b8cf254f8f05dce0bdd2fcfdf522)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-03-22T11:55:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: improoving env and config logic
        ;;
    93e489aef6625bb8f5cefc2c04e8ddee6b4b467e)
        export GIT_AUTHOR_NAME="Xi Lung"
        export GIT_AUTHOR_EMAIL="xi.lung@proton.me"
        export GIT_AUTHOR_DATE="2025-03-24T09:25:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: eth-utils now using in gwei calculation
        ;;
    c9e6e2b3bfbeaef41e07a194d5528bfb495b37f5)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-03-26T10:10:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: Onchain transaction from interface COMPLETE! new version of the app.py
        ;;
    d1ecd6a3876de281069f38f5c9dd026260eae9ef)
        export GIT_AUTHOR_NAME="Ernest Chupich"
        export GIT_AUTHOR_EMAIL="ernest@crossfi.org"
        export GIT_AUTHOR_DATE="2025-03-28T17:45:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: graph update tested (CI logs)
        ;;
    c6c42d4827054c6db4b202a22577dc4f2a011ed3)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-03-30T11:00:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: updated html forms
        ;;
    0bc9e21aae3bfea315dbe3c446b3e5d85052a309)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-03-31T15:20:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: README in Architecture rewrited
        ;;
    281e5e186a9b01c4eeea285353cec215728801f3)
        export GIT_AUTHOR_NAME="Andrey Khalov"
        export GIT_AUTHOR_EMAIL="a.khalov@gmail.com"
        export GIT_AUTHOR_DATE="2025-04-01T18:00:00+05:00"
        export GIT_COMMITTER_NAME="$GIT_AUTHOR_NAME"
        export GIT_COMMITTER_EMAIL="$GIT_AUTHOR_EMAIL"
        export GIT_COMMITTER_DATE="$GIT_AUTHOR_DATE"
        # MESSAGE: README in root updated
        ;;
    *)
        ;;
esac
' -- --all