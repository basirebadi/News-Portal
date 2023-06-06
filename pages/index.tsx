import Head from "next/head";
import NewsArticlesGrid from "@/components/NewsArticlesGrid";
import { GetServerSideProps } from "next";
import { NewsArticle, NewsResponse } from "@/models/NewsArticles";

interface BreakingNewsProps {
  newsArticles: NewsArticle[],
}

export const getServerSideProps: GetServerSideProps<BreakingNewsProps> = async () => {
  await new Promise(r => setTimeout(r,3000));
  const response = await fetch("https://newsapi.org/v2/top-headlines?country=us&apiKey=" + process.env.NEWS_API_KEY);
  const newsResponse: NewsResponse = await response.json();
  return {
    props:{ newsArticles:newsResponse.articles }
  }
}

export default function BreakingNews({newsArticles} : BreakingNewsProps) {
  return (
    <>
     <Head>
       <title key="title">Breaking News - NextJS</title>
     </Head>
      <main>
        <h1>Breaking News</h1>
        <NewsArticlesGrid articles={newsArticles} />
      </main>
    </>
  )
}
