import type { QuestionnairesCardType, Questionnairetype } from "./types";

export const routeParam = "route";
export const questionnaireParam = "questionnaire";
export const localResultsKey = "results";
export const defaultQuestionnaireValue = 5;

const MPHQuestions_Adult: Questionnairetype = {
  "0": [
    "Ik voel mij gezond",
    "Ik voel mij fit",
    "Ik heb geen klachten of pijn",
    "Ik slaap goed",
    "Ik eet goed",
    "Ik ben tevreden over mijn seksualiteit",
    "Ik herstel snel na inspanning. Bijvoorbeeld na het sporten",
    "Ik kan makkelijk bewegen. Bijvoorbeeld traplopen, wandelen of fietsen",
  ],
  "1": [
    "Ik kan dingen goed onthouden",
    "Ik kan mij goed concentreren",
    "Ik kan zien, horen, praten, lezen",
    "Ik voel mij vrolijk",
    "Ik accepteer mijzelf zoals ik ben",
    "Ik zoek naar oplossingen om moeilijke situaties te veranderen",
    "Ik heb controle over mijn leven",
  ],
  "2": [
    "Ik heb een zinvol leven",
    "Ik heb 's morgen zin in de dag",
    "Ik heb idealen die ik graag wil bereiken",
    "Ik heb vertrouwen in mijn eigen toekomst",
    "Ik accepteer het leven zoals het komt",
    "Ik ben dankbaar voor wat het leven mij biedt",
    "Ik wil mijn hele leven blijven leren",
  ],
  "3": [
    "Ik geniet van mijn leven",
    "Ik ben gelukkig",
    "Ik zit lekker in mijn vel",
    "Ik ervaar evenwicht in mijn leven",
    "Ik voel mij veilig",
    "Ik ben tevreden over de intimiteit in mijn leven",
    "Ik ben tevreden over waar ik woon en met wie",
    "Ik heb genoeg geld om mijn rekeningen te betalen",
  ],
  "4": [
    "Ik heb goed contact met andere mensen",
    "Andere mensen nemen mij serieus",
    "Ik heb mensen met wie ik leuke dingen kan doen",
    "Ik heb mensen die mij steunen als dat nodig is",
    "Ik heb het gevoel dat ik erbij hoor in mijn omgeving",
    "Ik heb werk of andere bezigheden die ik zinvol vind",
    "Ik ben geïnteresseerd in wat er in de maatschappij gebeurt",
  ],
  "5": [
    "Ik kan goed voor mijzelf zorgen. Bijvoorbeeld wassen, aankleden, boodschappen doen, koken",
    "Ik weet wat ik wel kan en wat ik niet kan",
    "Ik weet hoe ik mijn gezondheid kan verzorgen",
    "Ik kan goed plannen wat ik op een dag moet doen",
    "Ik kan goed omgaan met het geld dat ik elke maand krijg",
    "Ik kan werken of vrijwilligerswerk doen",
    "Ik weet hoe ik zonodig hulp kan krijgen van officiële instanties",
  ],
} as const;

export const backupQuestionnaires: Record<
  string,
  QuestionnairesCardType & {
    questions: Questionnairetype;
  }
> = {
  volwassenen: {
    id: "",
    color: "red",
    name: "Volwassenen",
    questions: MPHQuestions_Adult,
  },
} as const;

// export const MPHTopiccolors: Record<MPHTopics, MPHcolors> = {
//   0: "red",
//   1: "blue",
//   2: "purple",
//   3: "yellow",
//   4: "orange",
//   5: "green",
// };
