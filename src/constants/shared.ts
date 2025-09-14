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
    default: "Erreur lors de l'ouverture de l'application"
}
