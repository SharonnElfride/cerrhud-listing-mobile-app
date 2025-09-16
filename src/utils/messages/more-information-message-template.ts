export const AppointmentInfoMessage = `👋 Bonjour,
J'aimerais avoir des informations supplémentaires concernant vos examens médicaux et la prise de rendez-vous.`;

export function medicalTestsInfoMessage(medicalTests: string[]) {
  return `👋 Bonjour,
J'aimerais avoir des informations supplémentaires concernant vos examens médicaux suivants: ${medicalTests}.`;
}
