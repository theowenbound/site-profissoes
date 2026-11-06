/* DADOS EDITÁVEIS DO SITE.
   Regra: null = informação ainda não verificada (aparece como "A verificar").
   Só preencha depois de confirmar no e-MEC ou no site oficial da instituição. */

const ETAPAS = [
  {t:"Identificação do problema", o:"Entender qual dificuldade real o sistema deve resolver e para quem.", q:"Usuários, clientes, analistas e gestores.", i:"Resolver o problema errado desperdiça todo o trabalho seguinte.", e:"Uma clínica perde consultas porque pacientes esquecem os horários. O problema é a falta de lembretes, não a falta de um aplicativo."},
  {t:"Levantamento de requisitos", o:"Registrar o que o sistema deve fazer e como deve se comportar, incluindo desempenho e segurança.", q:"Analistas de requisitos, clientes e equipe técnica.", i:"Evita mal-entendidos e serve de base para os testes.", e:"\"Enviar lembrete 24 horas antes da consulta\" e \"proteger os dados dos pacientes\"."},
  {t:"Planejamento e arquitetura", o:"Decidir a estrutura do sistema, as tecnologias, a divisão em partes e os prazos.", q:"Arquitetos de software, líderes técnicos e gerentes de projeto.", i:"Mudar a estrutura no fim do projeto costuma ser caro e difícil.", e:"Separar a tela de agendamento, as regras de marcação e o armazenamento dos dados."},
  {t:"Desenvolvimento", o:"Programar as funcionalidades seguindo o plano.", q:"Pessoas desenvolvedoras, como front-end e back-end.", i:"Transforma o planejamento em software que funciona.", e:"Implementar a tela de agendamento e o envio automático de lembretes."},
  {t:"Testes e correções", o:"Verificar se o sistema cumpre os requisitos e procurar falhas.", q:"Especialistas em qualidade, desenvolvedores e usuários de teste.", i:"Falhas achadas antes do uso real custam menos e causam menos prejuízo.", e:"Testar o que acontece quando dois pacientes tentam marcar o mesmo horário."},
  {t:"Implantação", o:"Colocar o sistema em uso real, em servidores, lojas de aplicativos ou na rede da empresa.", q:"Desenvolvedores e equipes de infraestrutura.", i:"É a passagem do ambiente de testes para o uso real, que exige cuidado para não interromper o serviço.", e:"Publicar o aplicativo da clínica e treinar a recepção para usá-lo."},
  {t:"Manutenção e evolução", o:"Corrigir problemas, adaptar o sistema a mudanças e adicionar melhorias.", q:"Toda a equipe.", i:"Necessidades, leis e dispositivos mudam, então o software precisa mudar junto.", e:"Adicionar consultas por vídeo depois que a clínica passa a atender à distância."}
];

/* Faixas preliminares vindas do Documento Mestre. NÃO verificadas. */
const NIVEIS = [
  {n:"Estagiário", f:"R$ 1.000 a R$ 2.500", nota:"Refere-se à bolsa de estágio, que não é salário.", r:"Executa tarefas guiadas, apoia testes e correções simples e aprende com a equipe.", c:"Fundamentos de lógica e programação, vontade de aprender.", v:"Pode levar a uma vaga júnior, dependendo do desempenho e das oportunidades."},
  {n:"Júnior", f:"R$ 4.000 a R$ 6.500", r:"Implementa funcionalidades com acompanhamento de pessoas mais experientes.", c:"Uma linguagem de programação, controle de versão, noções de testes.", v:"Depende de experiência acumulada, qualidade das entregas e vagas disponíveis."},
  {n:"Pleno", f:"R$ 7.000 a R$ 12.000", r:"Trabalha com autonomia em partes do sistema e revisa o trabalho de colegas.", c:"Domínio de tecnologias do dia a dia, boas práticas de projeto e comunicação.", v:"Pode seguir para especialização técnica ou liderança, conforme interesse e oportunidade."},
  {n:"Sênior", f:"R$ 12.000 a R$ 20.000 ou mais", r:"Toma decisões técnicas, orienta a equipe e atua na arquitetura.", c:"Visão ampla do sistema, experiência com problemas complexos, mentoria.", v:"Caminhos incluem arquitetura, gestão técnica ou especialização profunda."}
];

/* Instituições da pesquisa inicial (Documento Mestre, seção 4.7).
   cat: A = Engenharia de Software, B = cursos relacionados.
   rede: pública ou privada. Demais campos: null até verificar. */
const FACULDADES = [
  {nome:"PUCPR", cat:"A", rede:"Privada", curso:"Engenharia de Software"},
  {nome:"Universidade Positivo", cat:"A", rede:"Privada", curso:"Engenharia de Software"},
  {nome:"UniBrasil", cat:"A", rede:"Privada", curso:"Engenharia de Software"},
  {nome:"UniSenai Paraná", cat:"A", rede:"Privada", curso:"Engenharia de Software"},
  {nome:"UniCuritiba", cat:"A", rede:"Privada", curso:"Engenharia de Software"},
  {nome:"Universidade Tuiuti do Paraná", cat:"A", rede:"Privada", curso:"Engenharia de Software"},
  {nome:"UTFPR", cat:"B", rede:"Pública", curso:"Sistemas de Informação"},
  {nome:"UTFPR", cat:"B", rede:"Pública", curso:"Engenharia de Computação"},
  {nome:"UFPR", cat:"B", rede:"Pública", curso:"Ciência da Computação"}
].map(f => Object.assign({grau:null, modalidade:null, campus:null, duracao:null, mensalidade:null, link:null}, f));

const ANALOGIAS = [
  {t:"Hunter x Hunter", c:"Todo sistema é definido por regras: o que ele pode fazer e quais limites precisa respeitar.", a:"O Nen funciona como o conjunto de regras e possibilidades do sistema. As categorias lembram especializações. Condições e restrições lembram requisitos e limitações técnicas, e o treino lembra a evolução de competências."},
  {t:"One Piece", c:"A arquitetura define como as partes de um sistema se organizam e se conectam, e cada pessoa da equipe assume uma função.", a:"Construir um navio é como projetar a arquitetura. A tripulação é a equipe de desenvolvimento, as funções diferentes são as especializações e a integração da tripulação é a integração dos componentes."},
  {t:"JoJo's Bizarre Adventure", c:"Um sistema é feito de funcionalidades, cada uma com comportamento próprio e condições para funcionar.", a:"Cada Stand lembra uma funcionalidade específica. Habilidades são comportamentos, limitações são condições de execução, e capacidades diferentes representam soluções técnicas diferentes."},
  {t:"Jujutsu Kaisen", c:"Programas seguem lógica condicional: certas regras só valem sob certas condições, e alguns ambientes têm regras próprias.", a:"Técnicas lembram regras de funcionamento e restrições lembram condições técnicas. Uma Expansão de Domínio lembra um ambiente isolado, com regras definidas por ele mesmo."},
  {t:"Jogos digitais", c:"Um sistema complexo reúne vários subsistemas que precisam trabalhar juntos.", a:"Um jogo combina progressão, mecânicas, inteligência artificial, interface, combate, mapas, salvamento, física e interação entre elementos. Se um deles falha, o conjunto sente."},
  {t:"Música e Avenged Sevenfold", c:"Integração: componentes e pessoas diferentes precisam funcionar em harmonia para o resultado final existir.", a:"Uma música reúne instrumentos, ritmos e elementos que precisam se encaixar. Um software depende da colaboração entre componentes e profissionais da mesma forma."}
];

/* FEIRA DE PROFISSÕES: adicione aqui os registros REAIS depois do evento.
   Coloque os arquivos em assets/feira/ e use o formato abaixo.
   Fotos:  {src:"assets/feira/foto1.jpg", alt:"Descrição da imagem", legenda:"Texto opcional"}
   Vídeos: {src:"assets/feira/video1.mp4", legenda:"Texto opcional"}
   Só publique imagens de outras pessoas com autorização. */
const FEIRA = { fotos: [], videos: [] };
