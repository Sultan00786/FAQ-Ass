import { prisma } from "../index.js";
import { translateText } from "../util/translateTexts.js";

export const createFAQs = async (req, res) => {
   try {
      const { question, answer } = req.body;

      if (!question || !answer) {
         return res.status(400).json({
            success: false,
            message: "Question and answer fields are required",
         });
      }

      const [question_hi, answer_hi, question_fr, answer_fr] =
         await Promise.all([
            translateText(question, "hi"),
            translateText(answer, "hi"),
            translateText(question, "fr"),
            translateText(answer, "fr"),
         ]);

      if (
         !question_hi.success ||
         !answer_hi.success ||
         !question_fr.success ||
         !answer_fr.success
      )
         return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: "Translation failed",
            translateRes: [question_hi, answer_hi, question_fr, answer_fr],
         });

      const faq = await prisma.fAQ.create({
         data: {
            question_en: question,
            answer_en: answer,
            question_hi: question_hi.translatedText,
            answer_hi: answer_hi.translatedText,
            question_fr: question_fr.translatedText,
            answer_fr: answer_fr.translatedText,
            updatedAt: new Date(),
         },
      });

      if (!faq.id)
         return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: "FAQ creation failed",
         });

      return res.status(200).json({
         success: true,
         message: "FAQ created successfully",
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
