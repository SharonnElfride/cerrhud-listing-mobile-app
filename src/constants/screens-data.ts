import { CerrhudLabData } from "./cerrhud-lab-data";

interface ScreenData {
  title: string;
  subTitle: string;
  image?: string;
}

const MedicalTestCatalogScreenData: ScreenData = {
  title: "Examens",
  subTitle:
    "Parcourez notre catalogue d'analyses biomédicales et leurs tarifs.",
};

const BookAppointmentScreenData: ScreenData = {
  title: "Prendre un rendez-vous",
  subTitle: "Planifiez facilement votre visite via WhatsApp ou appel.",
};

const CerrhudLabScreenData: ScreenData = {
  title: "Notre laboratoire",
  subTitle:
    "Situé à Gbégamey, au cœur de Cotonou, le laboratoire du CERRHUD vous accueille dans un espace chaleureux et confidentiel dédié à un diagnostic précis et bienveillant.",
  image: CerrhudLabData.logo,
};

export {
  BookAppointmentScreenData,
  CerrhudLabScreenData,
  MedicalTestCatalogScreenData,
  type ScreenData,
};
