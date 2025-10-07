# Guia de Configuração - Continuous Delivery Multi-Grupo

Este guia explica como configurar o servidor para suportar múltiplos grupos trabalhando em paralelo, cada um com sua própria instância do jogo da forca.

## 📋 Visão Geral

- **Estratégia**: Branches separados (um para cada grupo)
- **Usuário no servidor**: `csd` (não-root, mais seguro)
- **Estrutura**: Cada grupo tem sua pasta em `/home/csd/groupX`
- **Portas**: Cada grupo usa uma porta diferente (3000, 3001, 3002, ...)

## 🏗️ Arquitetura

```
Repositório GitHub
├── main (template - protegido, só você commita)
├── group0 → deploy → /home/csd/group0 (porta 3000) [exemplo]
├── group1 → deploy → /home/csd/group1 (porta 3001)
├── group2 → deploy → /home/csd/group2 (porta 3002)
└── group3 → deploy → /home/csd/group3 (porta 3003)
```

## 🚀 Setup Inicial do Servidor

Execute estes passos **UMA VEZ** no servidor, como root:

### 1. Criar usuário e estrutura de diretórios

```bash
# No servidor, como root (ou com sudo)
cd /tmp
git clone <seu-repositorio> csd-setup
cd csd-setup/scripts

# Tornar scripts executáveis
chmod +x *.sh

# Executar setup do usuário
sudo ./setup-server-user.sh
```

Isso criará:
- Usuário `csd`
- Diretórios `/home/csd/group1`, `/home/csd/group2`, etc.
- Arquivos `.env` com portas diferentes para cada grupo

### 2. Gerar chave SSH para deploy

```bash
# Gerar chave SSH para o usuário csd
sudo -u csd ssh-keygen -t ed25519 -C 'csd@deploy' -f /home/csd/.ssh/id_ed25519 -N ''

# Exibir a chave PRIVADA (para adicionar aos GitHub Secrets)
sudo cat /home/csd/.ssh/id_ed25519
```

### 3. Configurar GitHub Secrets

No seu repositório GitHub, vá em **Settings → Secrets and variables → Actions** e configure:

- `SERVER_HOST`: O IP ou hostname do seu servidor
- `SSH_PRIVATE_KEY`: A chave privada gerada acima (conteúdo completo do arquivo)

**IMPORTANTE**:
- ⚠️ **REMOVA** a chave antiga do usuário `melomario` dos secrets
- ⚠️ **NUNCA** commite a chave privada no repositório

### 4. Configurar serviços systemd (opcional)

```bash
# No servidor, como root
cd /tmp/csd-setup/scripts

# Criar serviços para cada grupo
sudo ./setup-systemd-services.sh
```

**Nota**: O script `setup-sudo-restart.sh` não é necessário porque a aplicação web monitora os arquivos e recarrega automaticamente quando há alterações.

### 5. Verificar instalação

O script `setup-server-user.sh` já clona o repositório `hangman-web` e instala as dependências para cada grupo automaticamente.

Verifique se tudo está ok:

```bash
# Verificar se os diretórios foram criados
ls -la /home/csd/

# Verificar se node_modules foi instalado
ls /home/csd/group1/node_modules/
```

### 6. Criar e iniciar serviços systemd

```bash
# Criar serviços (usa o arquivo .service do repositório hangman-web)
cd /tmp/csd-setup/scripts
sudo ./setup-systemd-services.sh
```

### 7. Iniciar serviços

```bash
# Iniciar e habilitar todos os serviços
sudo systemctl enable --now hangman-group1
sudo systemctl enable --now hangman-group2
sudo systemctl enable --now hangman-group3
sudo systemctl enable --now hangman-group4

# Verificar status
sudo systemctl status hangman-group1
sudo systemctl status hangman-group2
sudo systemctl status hangman-group3
sudo systemctl status hangman-group4
```

## 👥 Configuração para os Grupos

### Para cada grupo de alunos:

1. **Criar branch do grupo**:
```bash
# No repositório local
git checkout main
git pull origin main
git checkout -b group1
git push -u origin group1
```

2. **Proteger o branch main**:
   - GitHub → Settings → Branches → Add rule
   - Branch name pattern: `main`
   - ✅ Require pull request before merging
   - ✅ Require approvals: 1 (você)

3. **Dar acesso ao grupo**:
   - Adicionar os alunos como colaboradores
   - Cada grupo trabalha apenas no seu branch

### Workflow de desenvolvimento dos alunos:

```bash
# Alunos clonam o repositório
git clone <repositorio>
cd csd-2025

# Mudam para o branch do grupo deles
git checkout group1

# Desenvolvem normalmente
# ... fazem alterações em lib/engine/ ...

# Commitam e fazem push
git add .
git commit -m "Implementa funcionalidade X"
git push origin group1

# O deploy acontece AUTOMATICAMENTE! 🎉
```

## 🔍 Monitoramento e Manutenção

### Verificar status dos serviços

```bash
# Como root ou melomario
sudo systemctl status hangman-group1
sudo systemctl status hangman-group2
```

### Ver logs

```bash
# Logs em tempo real
sudo journalctl -u hangman-group1 -f

# Últimas 100 linhas
sudo journalctl -u hangman-group1 -n 100
```

### Acessar aplicações

- Group 0 (exemplo): `http://seu-servidor:3000`
- Group 1: `http://seu-servidor:3001`
- Group 2: `http://seu-servidor:3002`
- Group 3: `http://seu-servidor:3003`

### Reiniciar manualmente um serviço

```bash
sudo systemctl restart hangman-group1
```

## 🔐 Segurança Implementada

✅ **Resolvido**: Usuário dedicado não-root (`csd`)
✅ **Resolvido**: Chave SSH não está mais no repositório
✅ **Resolvido**: Cada grupo tem isolamento (pastas separadas)
✅ **Resolvido**: Permissões mínimas necessárias
✅ **Resolvido**: Branch `main` protegido (só você pode modificar)

## 🎯 Mapeamento Branch → Deploy

| Branch | Deploy Path | Porta | URL | Observação |
|--------|-------------|-------|-----|------------|
| group0 | /home/csd/group0 | 3000 | http://servidor:3000 | Exemplo |
| group1 | /home/csd/group1 | 3001 | http://servidor:3001 | - |
| group2 | /home/csd/group2 | 3002 | http://servidor:3002 | - |
| group3 | /home/csd/group3 | 3003 | http://servidor:3003 | - |
| main | ❌ não faz deploy | - | - | Template |

## 🆘 Troubleshooting

### Deploy falha com "Permission denied"

```bash
# Verificar permissões
sudo ls -la /home/csd/group1
sudo chown -R csd:csd /home/csd/group*
```

### Serviço não inicia

```bash
# Ver erro específico
sudo journalctl -u hangman-group1 -n 50

# Verificar se as dependências estão instaladas
sudo -u csd bash -c "cd /home/csd/group1 && npm install"
```

### Porta já em uso

```bash
# Verificar qual processo está usando a porta
sudo lsof -i :3000

# Parar o serviço conflitante
sudo systemctl stop hangman-group1
```

## 📚 Comandos Úteis

```bash
# Ver todos os serviços hangman
sudo systemctl list-units "hangman-*"

# Parar todos os serviços
for i in {0..3}; do sudo systemctl stop hangman-group$i; done

# Iniciar todos os serviços
for i in {0..3}; do sudo systemctl start hangman-group$i; done

# Ver uso de porta de todos os grupos
for port in {3000..3003}; do echo "Port $port:"; sudo lsof -i :$port; done
```

## 🎓 Recomendação Final

**Use branches** para os grupos por estes motivos:

1. ✅ Mais fácil para os alunos começarem
2. ✅ Você mantém controle do template (branch main)
3. ✅ Deploy automático baseado no nome do branch
4. ✅ Histórico completo de cada grupo
5. ✅ Pode fazer updates no template e grupos fazem merge

Se preferir repositórios separados, você precisaria:
- Criar 4 repositórios
- Configurar secrets em cada um
- Gerenciar updates manualmente em cada repo
