#!/bin/bash

# Script para criar serviços systemd para cada grupo
# Execute este script COMO ROOT no servidor

set -e

echo "🔧 Criando serviços systemd para cada grupo"
echo ""

GROUP_NAMES=("group0" "group1" "group2" "group3")
BASE_PORT=3000

for i in "${!GROUP_NAMES[@]}"; do
    GROUP="${GROUP_NAMES[$i]}"
    PORT=$((BASE_PORT + i))
    SERVICE_NAME="hangman-$GROUP"
    SERVICE_FILE="/home/csd/$GROUP/.service"

    echo "📝 Criando serviço $SERVICE_NAME (porta $PORT)..."

    # Verificar se existe arquivo .service no repositório
    if [ -f "$SERVICE_FILE" ]; then
        echo "    Usando arquivo .service do repositório hangman-web"
        # Copiar e adaptar o arquivo .service
        cp "$SERVICE_FILE" "/etc/systemd/system/$SERVICE_NAME.service"
        # Substituir placeholders se necessário (assumindo que o .service usa variáveis de ambiente)
    else
        echo "    ⚠️  Arquivo .service não encontrado, criando padrão..."
        # Criar arquivo de serviço systemd padrão
        cat > "/etc/systemd/system/$SERVICE_NAME.service" <<EOF
[Unit]
Description=Hangman Game - $GROUP
After=network.target

[Service]
Type=simple
User=csd
WorkingDirectory=/home/csd/$GROUP
Environment=NODE_ENV=production
Environment=PORT=$PORT
ExecStart=/usr/bin/node server.js
Restart=always
RestartSec=10
StandardOutput=journal
StandardError=journal
SyslogIdentifier=$SERVICE_NAME

[Install]
WantedBy=multi-user.target
EOF
    fi

    echo "✅ Serviço $SERVICE_NAME criado"
done

# Recarregar systemd
echo ""
echo "🔄 Recarregando systemd..."
systemctl daemon-reload

echo ""
echo "✅ Serviços criados com sucesso!"
echo ""
echo "📋 Comandos úteis:"
echo ""
for GROUP in "${GROUP_NAMES[@]}"; do
    SERVICE_NAME="hangman-$GROUP"
    echo "# $GROUP:"
    echo "  sudo systemctl start $SERVICE_NAME      # Iniciar"
    echo "  sudo systemctl stop $SERVICE_NAME       # Parar"
    echo "  sudo systemctl restart $SERVICE_NAME    # Reiniciar"
    echo "  sudo systemctl status $SERVICE_NAME     # Ver status"
    echo "  sudo systemctl enable $SERVICE_NAME     # Ativar no boot"
    echo "  sudo journalctl -u $SERVICE_NAME -f     # Ver logs"
    echo ""
done

echo "💡 Para iniciar todos os serviços agora e habilitá-los no boot:"
for GROUP in "${GROUP_NAMES[@]}"; do
    SERVICE_NAME="hangman-$GROUP"
    echo "  sudo systemctl enable --now $SERVICE_NAME"
done
