import Ionicons from "@expo/vector-icons/Ionicons";

// Extracting the type of valid names for the icons
export type IoniconName = React.ComponentProps<typeof Ionicons>["name"];

export const IconSize = 18;
export const IconButtonSize = 24;

export const Blurhash = "LEPPr{fi.ktR%MofkCWV%}ofD%V@";
export const PhoneErrorMessages = {
  call: "Le numéro de téléphone n'est pas disponible.",
  whatsapp: "WhatsApp n'est pas installé sur cet appareil.",
  sms: "Les SMS ne sont pas disponibles sur cet appareil.",
  default: "Erreur lors de l'ouverture de l'application",
};

export const PickerDateFormat = "dd/MM/yyyy";
export const MessageDateFormat = "dd MMMM yyyy";

export const FormErrorMessages = {
  required: (suffix: string = "") => {
    return `⚠️ Ce champ est obligatoire. ${suffix}`;
  },
  invalid: (prefix?: string) => {
    return `${prefix ?? "🚫 Champ"} invalide. Merci de vérifier.`;
  },
};

export const FormatPrice = (price: number) =>
  new Intl.NumberFormat("fr-FR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
