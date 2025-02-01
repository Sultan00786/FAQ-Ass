import { prisma } from "../index.js";
import { translateText } from "../util/translateTexts.js";

export const getFAQs = async (req, res) => {
   try {
      const { lang } = req.query;
      const targetLang = lang === "hi" ? "hi" : lang === "fr" ? "fr" : "en";
      const faqs = await prisma.fAQ.findMany({
         select: {
            id: true,
            [`question_${targetLang}`]: true,
            [`answer_${targetLang}`]: true,
         },
         orderBy: {
            createdAt: "desc",
         },
      });

      if (!faqs || faqs?.length === 0) {
         return res.status(404).json({
            success: false,
            message: "No FAQs found",
         });
      }

      return res.status(200).json({
         success: true,
         message: "FAQs fetched successfully",
         lang,
         faqs,
      });
   } catch (error) {
      console.log(error);
      return res.status(500).json({
         success: false,
         message: "Internal server error",
         error: error.message,
      });
   }
};
