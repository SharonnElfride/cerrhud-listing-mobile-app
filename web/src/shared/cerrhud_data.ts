export interface CerrhudLink {
  title: string;
  description: string;
  url: string;
  canCopy?: boolean;
}

export const LabLinks: CerrhudLink[] = [
  {
    title: "Cerrhud Lab Mobile",
    description:
      "Application mobile du CERRHUD pour consulter les analyses, tarifs et prendre rendez-vous.",
    url: "https://play.google.com/store/apps/details?id=com.zase.cerrhudlab",
    canCopy: true,
  },
  {
    title: "CERRHUD",
    description: "Centre de recherche en reproduction humaine et démographie.",
    url: "https://cerrhud.net/",
  },
];
