import { v2 } from "@google-cloud/translate";

const translate = new v2.Translate();

export async function translateText(text, targetLang) {
   try {
      let [translations] = await translate.translate(text, targetLang);
      return {
         success: true,
         translatedText: translations,
      };
   } catch (error) {
      console.error("Error:", error);
      return {
         success: false,
         error: error.message || error,
      };
   }

   return response;
}