#language: pt

Funcionalidade: Motor do Jogo - Palpitar Letra
  Como um jogador
  Eu quero palpitar letras no jogo da forca
  Para que eu possa tentar descobrir a palavra secreta

  Contexto:
    Dado que a palavra secreta é "scrum"
    E que o jogo foi iniciado

  Cenário: Jogador faz um palpite errado
    Quando eu palpito a letra "z"
    Então meu número de vidas deve diminuir em 1
    E a letra "z" deve ser adicionada aos meus palpites
    E eu devo ver uma mensagem dizendo que a letra "z" não está na palavra
    Mas o status do jogo deve permanecer "RUNNING" se eu tiver vidas restantes

  Cenário: Jogador faz um palpite correto
    Quando eu palpito a letra "s"
    Então meu número de vidas não deve diminuir
    E a letra "s" deve ser adicionada aos meus palpites
    E eu devo ver uma mensagem dizendo que a letra "s" está na palavra
    E mostrar a palavra "s _ _ _ _ "
    Mas o status do jogo deve permanecer "RUNNING" se eu tiver vidas restantes