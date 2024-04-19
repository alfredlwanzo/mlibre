import { EditArticleForm } from "@/components/ws/articles/edit-form";
import prisma from "@/lib/prisma";

const getArticle = async (articleId: string) => {
  const article = await prisma.article
    .findUnique({
      where: { id: Number(articleId) },
      include: { author: {} },
    })
    .catch((e) => {
      throw new Error(e.message);
    });

  return article;
};

export default async function WSArticlePage({
  params,
}: {
  params: { articleId: string };
}) {
  const article = await getArticle(params.articleId);
  return (
    <>
      <EditArticleForm article={article} />
    </>
  );
}
