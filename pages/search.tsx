import NewsArticlesGrid from '@/components/NewsArticlesGrid';
import { NewsArticle } from '@/models/NewsArticles';
import Head from 'next/head';
import { FormEvent, useState} from 'react';
import { Button, Form, Spinner } from 'react-bootstrap';

const SearchPage = () => {
  const [ searchResults, setSearchResults] = useState<NewsArticle[] | null>( null);
  const [ searchResultLoading, setSearchResultLoading] = useState(false);
  const [ searchResultLoadingIsError, setSearchResultLoadingIsError] = useState(false);

  async function handleSubmit(e:FormEvent<HTMLFormElement>){
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("searchQuery")?.toString().trim();

    if(searchQuery){
      try {
        setSearchResults(null);
        setSearchResultLoadingIsError(false);
        setSearchResultLoading(true);
        const response = await fetch("/api/search-news?q="+searchQuery);
        const articles: NewsArticle[] = await response.json();
        setSearchResults(articles);
      } catch (error) {
        console.error(error);
        setSearchResultLoadingIsError(true);
      } finally {
        setSearchResultLoading(false); 
      }
    }
    
  }
  return (
    <>
    <Head>
      <title key="title">Search News - NextJS</title>
    </Head>
    <main>
      <h1>Welcome to search page</h1>
      <Form onSubmit={handleSubmit}>
         <Form.Group className='mb-3' controlId='search-input'>
            <Form.Label>Search Query:</Form.Label>
            <Form.Control name="searchQuery" placeholder="E.g. Politics, Sport, ..." />
         </Form.Group>
         <Button type="submit" className='mb-3' disabled={searchResultLoading}>
           Search
         </Button>
      </Form>
      <div className='d-flex flex-column align-items-center'>
        {searchResultLoading && <Spinner animation='border'/>}
        {searchResultLoadingIsError && <p>Someting went wrong, please try again!</p>}
        {searchResults?.length === 0 && <p>Noting fountd, try a different query.</p>}
        {searchResults && <NewsArticlesGrid articles={searchResults} />}
      </div>
    </main>
    </>
  );
};

export default SearchPage;
