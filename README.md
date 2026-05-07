# 🎯 Jogo da Forca - CSD 2025

Template educativo para o ensino de desenvolvimento de software ágil.

## 📋 Sobre o Projeto

Este é um projeto template do jogo da forca criado para ensinar conceitos de desenvolvimento ágil, incluindo:

- ✅ Testes unitários com Jest
- ✅ Testes BDD com Cucumber
- ✅ Integração Contínua com GitHub Actions
- ✅ Cobertura de código
- ✅ Arquitetura Hexagonal
- ✅ Configuração modular

## 🚀 Comandos Disponíveis

### Instalação
```bash
npm install
```

### Executar o Jogo
```bash
npm start
```

### Testes

**Executar todos os testes:**
```bash
npm run test:all
```

**Testes unitários (Jest):**
```bash
npm test
```

**Testes com watcher (desenvolvimento):**
```bash
npm run test:watch
```

**Testes com cobertura de código:**
```bash
npm run test:coverage
```

**Testes BDD (Cucumber):**
```bash
npm run test:bdd
```


## 📁 Estrutura do Projeto

```
csd-2025/
├── .github/workflows/     # GitHub Actions (CI/CD)
├── src/
│   ├── domain/           # Lógica de negócio (Game Engine)
│   ├── adapters/         # Adaptadores (Dictionary, Config)
│   └── ports/            # Interfaces (Contratos)
├── tests/                # Testes unitários (Jest)
├── features/             # Testes BDD (Cucumber)
├── cli/                  # Interface de linha de comando
└── reports/              # Relatórios de testes
```

## 🎮 Como Jogar

1. Execute `npm start`
2. O jogo mostrará uma palavra oculta com underscores
3. Digite uma letra e pressione ENTER
4. Tente adivinhar a palavra antes de acabar as vidas!

## 🛠️ Para Desenvolvedores

### Implementação Necessária

Este é um template educativo. Os alunos devem implementar:

1. **Dictionary** (`src/adapters/dictionary.js`)
   - Leitura do arquivo de palavras
   - Seleção aleatória de palavras

2. **Game Engine** (`src/domain/game-engine.js`)
   - Lógica completa do jogo da forca
   - Validação de entradas
   - Controle do estado do jogo

3. **CLI** (`cli/index.js`)
   - Loop principal do jogo
   - Interação com o usuário

### Arquitetura Hexagonal

- **Ports**: Interfaces que definem os contratos
- **Adapters**: Implementações específicas (Dictionary, Config)
- **Domain**: Lógica de negócio pura (Game Engine)

### Configuração

Use o módulo `config.js` para alternar entre os adapters de dicionário.


## 📊 Cobertura de Código

Após executar `npm run test:coverage`, verifique:
- `coverage/lcov-report/index.html` - Relatório visual
- `coverage/` - Dados de cobertura

## 🔄 Integração Contínua

O projeto está configurado com GitHub Actions que:
- Executa os testes automaticamente em push/PR
- Gera relatórios de cobertura
- Utiliza Ubuntu e Node.js estável

## 🤝 Contribuindo

1. Implemente as funcionalidades dos módulos
2. Adicione testes para suas implementações
3. Mantenha alta a cobertura de código
4. Execute `npm run test:all` antes de fazer commit

---

**Nota**: Este é um projeto educativo. A implementação está intencionalmente incompleta para permitir o aprendizado prático.
