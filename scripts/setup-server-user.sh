#!/bin/bash

# Script para configurar o usuário CSD no servidor
# Execute este script COMO ROOT no servidor

set -e

echo "🔧 Configurando usuário CSD para Continuous Delivery"
echo ""

# Criar usuário csd se não existir
if id "csd" &>/dev/null; then
    echo "✅ Usuário 'csd' já existe"
else
    echo "📝 Criando usuário 'csd'..."
    useradd -m -s /bin/bash csd
    echo "✅ Usuário 'csd' criado"
fi

# Criar estrutura de diretórios para os grupos
echo ""
echo "📁 Criando estrutura de diretórios..."

GROUP_NAMES=("group0" "group1" "group2" "group3")
BASE_PORT=3000

for i in "${!GROUP_NAMES[@]}"; do
    GROUP="${GROUP_NAMES[$i]}"
    GROUP_DIR="/home/csd/$GROUP"

    echo "  - Criando diretório $GROUP..."

    # Criar diretório do grupo se não existir
    mkdir -p "$GROUP_DIR"

    echo "✅ $GROUP criado"
done

# Ajustar permissões
echo ""
echo "🔐 Ajustando permissões..."
chown -R csd:csd /home/csd
chmod 755 /home/csd

for GROUP in "${GROUP_NAMES[@]}"; do
    if [ -d "/home/csd/$GROUP" ]; then
        chmod -R 755 "/home/csd/$GROUP"
    fi
done

echo ""
echo "✅ Configuração concluída!"
echo ""
echo "📋 Próximos passos:"
echo "1. Clonar repositório hangman-web para cada grupo:"
echo "   sudo ./clone-hangman-web.sh"
echo ""
echo "2. Gerar chave SSH para o usuário csd:"
echo "   sudo -u csd ssh-keygen -t ed25519 -C 'csd@deploy' -f /home/csd/.ssh/id_ed25519 -N ''"
echo ""
echo "3. Adicionar a chave PRIVADA aos GitHub Secrets (SSH_PRIVATE_KEY):"
echo "   sudo cat /home/csd/.ssh/id_ed25519"
echo ""
echo "4. Configurar os serviços systemd para cada grupo:"
echo "   sudo ./setup-systemd-services.sh"
echo ""
echo "📊 Diretórios criados:"
for GROUP in "${GROUP_NAMES[@]}"; do
    echo "  - /home/csd/$GROUP"
done
