#!/bin/bash

# Script para permitir que o usuário csd reinicie os serviços hangman sem senha
# Execute este script COMO ROOT no servidor

set -e

echo "🔧 Configurando permissões sudo para usuário csd"
echo ""

# Criar arquivo sudoers para o usuário csd
SUDOERS_FILE="/etc/sudoers.d/csd-hangman"

cat > "$SUDOERS_FILE" <<'EOF'
# Permitir que o usuário csd reinicie os serviços hangman sem senha
csd ALL=(ALL) NOPASSWD: /bin/systemctl restart hangman-group*
csd ALL=(ALL) NOPASSWD: /bin/systemctl start hangman-group*
csd ALL=(ALL) NOPASSWD: /bin/systemctl stop hangman-group*
csd ALL=(ALL) NOPASSWD: /bin/systemctl status hangman-group*
EOF

# Ajustar permissões do arquivo sudoers
chmod 0440 "$SUDOERS_FILE"

# Validar o arquivo sudoers
if visudo -c -f "$SUDOERS_FILE"; then
    echo "✅ Configuração sudoers criada com sucesso!"
    echo ""
    echo "O usuário 'csd' agora pode executar:"
    echo "  sudo systemctl restart hangman-group1"
    echo "  sudo systemctl restart hangman-group2"
    echo "  etc..."
    echo ""
    echo "Sem precisar de senha!"
else
    echo "❌ Erro na configuração sudoers!"
    rm "$SUDOERS_FILE"
    exit 1
fi
