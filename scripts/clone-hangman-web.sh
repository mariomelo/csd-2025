#!/bin/bash

# Script para clonar o repositório hangman-web para cada grupo
# Execute este script COMO ROOT no servidor

set -e

echo "🔧 Clonando repositório hangman-web para cada grupo"
echo ""

GROUP_NAMES=("group0" "group1" "group2" "group3")
BASE_PORT=11000

for i in "${!GROUP_NAMES[@]}"; do
    GROUP="${GROUP_NAMES[$i]}"
    PORT=$((BASE_PORT + i))
    GROUP_DIR="/home/csd/$GROUP"

    echo "📦 Configurando $GROUP (porta $PORT)..."

    # Clonar repositório hangman-web para cada grupo
    if [ -d "$GROUP_DIR/.git" ] && [ -f "$GROUP_DIR/package.json" ]; then
        echo "  ⚠️  Repositório já clonado em $GROUP_DIR, pulando clone"
    else
        if [ -d "$GROUP_DIR" ] && [ ! -d "$GROUP_DIR/.git" ]; then
            echo "  ⚠️  Diretório $GROUP_DIR existe mas não é um repositório git válido. Removendo..."
            rm -rf "$GROUP_DIR"
        fi
        echo "  Clonando repositório hangman-web..."
        sudo -u csd git clone https://github.com/mariomelo/hangman-web.git "$GROUP_DIR"
    fi

    # Criar/atualizar arquivo .env com a porta
    echo "  Criando arquivo .env..."
    cat > "$GROUP_DIR/.env" <<EOF
PORT=$PORT
NODE_ENV=production
EOF

    # Ajustar permissões do .env
    chown csd:csd "$GROUP_DIR/.env"

    # Instalar dependências
    echo "  Instalando dependências npm..."
    sudo -u csd bash -c "cd $GROUP_DIR && npm install"

    echo "✅ $GROUP configurado na porta $PORT"
    echo ""
done

echo "✨ Todos os grupos foram configurados!"
echo ""
echo "📋 Grupos configurados:"
for i in "${!GROUP_NAMES[@]}"; do
    GROUP="${GROUP_NAMES[$i]}"
    PORT=$((BASE_PORT + i))
    echo "  - $GROUP: porta $PORT → /home/csd/$GROUP"
done
echo ""
echo "💡 Próximo passo: Execute ./setup-systemd-services.sh para criar os serviços"
