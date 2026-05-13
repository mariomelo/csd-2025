#language: pt

Funcionalidade: Motor do Jogo - Palpitar Letra
  Como um jogador
  Eu quero palpitar letras no jogo da forca
  Para que eu possa tentar descobrir a palavra secreta

  Contexto:
    Dado que a palavra secreta é "scrum"
    E que o jogo foi iniciado

Cenário: Jogador faz um palpite correto
    Quando eu palpito a letra "s"
    Então meu número de vidas não deve diminuir
    E a letra "s" deve ser adicionada aos meus palpites
    E eu devo ver uma mensagem dizendo que a letra "s" está na palavra
    E mostrar a palavra "s _ _ _ _"
    Mas o status do jogo deve permanecer "RUNNING" se eu tiver vidas restantes

  Cenário: Jogador faz um palpite errado
    Quando eu palpito a letra "z"
    Então meu número de vidas deve diminuir em 1
    E a letra "z" deve ser adicionada aos meus palpites
    E eu devo ver uma mensagem dizendo que a letra "z" não está na palavra
    Mas o status do jogo deve permanecer "RUNNING" se eu tiver vidas restantes

  Cenário: Jogador faz um palpite correto
    Quando eu palpito a letra "s"
    E eu palpito a letra "c"
    E eu palpito a letra "r"
    E eu palpito a letra "u"
    E eu palpito a letra "m"
    Então meu número de vidas não deve diminuir
    E a letra "s" deve ser adicionada aos meus palpites
    E a letra "c" deve ser adicionada aos meus palpites
    E a letra "r" deve ser adicionada aos meus palpites
    E a letra "u" deve ser adicionada aos meus palpites
    E a letra "m" deve ser adicionada aos meus palpites
    E mostrar a palavra "s c r u m"
    Mas o status do jogo deve permanecer "RUNNING" se eu tiver vidas restantes

Cenário: Jogador faz um palpite errado
    Quando eu palpito a letra "t"
    E eu palpito a letra "z"
    E eu palpito a letra "d"
    E eu palpito a letra "e"
    E eu palpito a letra "n"
    E eu palpito a letra "f"
    Então meu número de vidas deve ser igual a 0
    E as letras ["t", "z"] deve ser adicionadas aos meus palpites
    E a letra "t" deve ser adicionada aos meus palpites
    E a letra "z" deve ser adicionada aos meus palpites
    E a letra "d" deve ser adicionada aos meus palpites
    E a letra "e" deve ser adicionada aos meus palpites
    E a letra "n" deve ser adicionada aos meus palpites
    E a letra "f" deve ser adicionada aos meus palpites
    Mas o status do jogo deve alterar para "LOST" se eu não tiver vidas restantes