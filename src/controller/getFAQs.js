import { prisma, redis } from "../index.js";

export const getFAQs = async (req, res) => {
   try {
      const { lang } = req.query;
      const targetLang = lang === "hi" ? "hi" : lang === "fr" ? "fr" : "en";
      const redisKey = `faqs_${targetLang}`;

      const cachedFAQs = await redis.get(redisKey);
      if (cachedFAQs) {
         return res.status(200).json({
            success: true,
            message: "FAQs fetched from cache",
            lang,
            faqs: JSON.parse(cachedFAQs),
         });
      }

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

      await redis.set(redisKey, JSON.stringify(faqs), "EX", 3600);

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
