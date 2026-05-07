#!/bin/bash

# Reseta todos os branches de grupo para o estado do main
# e restaura os stubs originais no servidor.
# Execute a partir da raiz do repositório local.

set -e

GROUP_NAMES=("group0" "group1" "group2" "group3")

echo "🔄 Resetando branches para o main..."
echo ""

git fetch origin

for group in "${GROUP_NAMES[@]}"; do
  git checkout "$group"
  git reset --hard origin/main
  git push --force origin "$group"
  echo "✅ $group resetado"
done

git checkout main

echo ""
echo "✨ Todos os branches resetados!"
echo ""
echo "💡 Para resetar os arquivos no servidor, execute como root:"
echo ""
echo "   for group in ${GROUP_NAMES[*]}; do"
echo "     sudo -u csd bash -c \"cd /home/csd/\$group && git reset --hard HEAD\""
echo "     sudo systemctl restart hangman-\$group"
echo "   done"
