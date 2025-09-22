const socials = {
  facebook: {
    id: "facebook",
    url: "https://www.facebook.com/Cerrhud",
  },
  whatsapp: {
    id: "whatsapp",
    url: "https://wa.me/2290199886001",
    size: 22,
  },
  linkedin: {
    id: "linkedin",
    url: "https://www.linkedin.com/company/cerrhud-centre-de-recherche-en-reproduction-humaine-et-en-d%C3%A9mographie/?lipi=urn%3Ali%3Apage%3Acompanies_company_index%3B9ad49f33-9b47-4b09-a11c-2f3347570e17",
  },
  x: {
    id: "x",
    url: "https://x.com/cerrhud",
    size: 20,
  },
  youtube: {
    id: "youtube",
    url: "https://www.youtube.com/@cerrhud6785",
  },
};

interface SocialItem {
  id: string;
  url: string;
  size?: number;
}

export const CerrhudLabData = {
  logo: require("@/assets/images/cerrhud-logo-cropped.png"),
  teamImg: require("@/assets/images/cerrhud-team.jpg"),
  phoneNumber: "2290199886001",
  coordinates: {
    latitude: 6.359887,
    longitude: 2.407297,
    // latitude: 6.360366826115449,
    // longitude: 2.4072755423278482,
  },
  socials: Object.values(socials) as SocialItem[],
};
