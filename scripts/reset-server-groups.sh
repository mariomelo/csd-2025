#!/bin/bash

# Restaura os stubs originais do hangman-web no servidor e reinicia os serviços.
# Execute como root no servidor.

set -e

GROUP_NAMES=("group0" "group1" "group2" "group3")

echo "🔄 Resetando arquivos no servidor..."
echo ""

for group in "${GROUP_NAMES[@]}"; do
  GROUP_DIR="/home/csd/$group"

  if [ ! -d "$GROUP_DIR/.git" ]; then
    echo "⚠️  $group não encontrado em $GROUP_DIR, pulando..."
    continue
  fi

  sudo -u csd bash -c "cd $GROUP_DIR && git reset --hard HEAD"
  sudo systemctl restart "hangman-$group"
  echo "✅ $group resetado e serviço reiniciado"
done

echo ""
echo "✨ Servidor resetado com sucesso!"
