import cat from "./cat";
import partner from "./partner";
import article from "./article";
import siteSettings from "./siteSettings";
import siteChrome from "./siteChrome";
import navItem from "./navItem";
import formSubmission from "./formSubmission";
import instagramPost from "./instagramPost";

// Page singletons — one document per page, editable from Studio
import homePage from "./pages/homePage";
import aboutPage from "./pages/aboutPage";
import projectPage from "./pages/projectPage";
import supportPage from "./pages/supportPage";
import consultationPage from "./pages/consultationPage";
import contactPage from "./pages/contactPage";
import landingPage from "./pages/landingPage";

export const schemaTypes = [
  // Content
  cat,
  partner,
  article,
  instagramPost,

  // Forms
  formSubmission,

  // Reusable objects
  navItem,

  // Settings
  siteSettings,
  siteChrome,

  // Pages
  homePage,
  aboutPage,
  projectPage,
  supportPage,
  consultationPage,
  contactPage,
  landingPage,
];
