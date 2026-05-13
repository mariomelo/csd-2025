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
    Então meu número de vidas deve permanecer o mesmo
    E a letra "s" deve ser adicionada aos meus palpites
    E eu devo ver uma mensagem dizendo que a letra "s" está na palavra
    E mostrar a palavra "s _ _ _ _"
    Mas o status do jogo deve permanecer "RUNNING" se eu tiver vidas restantes

  Cenário: Ganhar o jogo
    Quando eu palpito a letra "m"
    E eu palpito a letra "s"
    E eu palpito a letra "c"
    E eu palpito a letra "r"
    E eu palpito a letra "u"
    ## Quando eu palpito a letra "m" e a palavra actual é "s c r u _"
    Então meu número de vidas deve permanecer o mesmo
    ##E a letra "m" deve ser adicionada aos meus palpites
    ##E eu devo ver uma mensagem dizendo que a letra "m" está na palavra
    E mostrar a palavra "s c r u m"
    E o status do jogo deve passar para "WON"

  ### Cenário: Perder o jogo
